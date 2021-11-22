import { FunctionComponent, useEffect, useState } from 'react';
import firebase from 'firebase';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import Button from '../components/button';
import Card from '../components/card';
import { getParticipantResults } from '../utils/firebase';
import { parseResultToCsv } from '../utils/result-parser';
import Spinner from '../components/spinner';
import {
  dispatchWorkflow,
  getLatestWorkflowRun,
  WorkflowId,
  WorkflowRun,
} from '../utils/github';

const PENDING_WORKFLOW_CHECK_INTERVAL = 10000;

const AdminPage: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [workflowLog, setWorkflowLog] = useState<WorkflowRun[]>([]);

  const auth = firebase.auth();

  useEffect(() => {
    setUser(auth.currentUser);
    if (auth.currentUser) {
      getLatestWorkflowRun().then(setWorkflowLog);
    }
  }, [auth.currentUser]);

  const isSubmitDisabled = !email.length || !password.length;

  const logIn = () => {
    setIsLoading(true);

    auth
      .signInWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        setUser(user);
        setWorkflowLog(await getLatestWorkflowRun());
      })
      .catch(({ code, message }) => alert(`Error ${code}: ${message}`))
      .finally(() => setIsLoading(false));
  };

  const logOut = () => {
    setIsLoading(true);

    auth
      .signOut()
      .then(() => {
        setUser(null);
        setPassword('');
      })
      .catch(({ code, message }) => alert(`Error ${code}: ${message}`))
      .finally(() => setIsLoading(false));
  };

  const downloadParticipantsResult = async () => {
    setIsLoading(true);

    try {
      const result = await getParticipantResults();

      const folderName = `CONstituionLAB_${new Date()
        .toLocaleString('th-TH', {
          dateStyle: 'short',
        })
        .split('/')
        .join('_')}`;
      const zip = new JSZip();

      parseResultToCsv(result).forEach((output, index) =>
        zip.file(`${folderName}/topic-${index + 1}.csv`, output)
      );

      const fileBlob = await zip.generateAsync({ type: 'blob' });

      saveAs(fileBlob, `${folderName}.zip`);
    } catch (e) {
      alert(e);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerWorkflow = async (id: WorkflowId) => {
    try {
      setIsLoading(true);
      dispatchWorkflow(id);

      const interval = setInterval(async () => {
        const log = await getLatestWorkflowRun();

        if (log[0]?.conclusion) {
          clearInterval(interval);
        }

        setWorkflowLog(log);
        setIsLoading(false);
      }, PENDING_WORKFLOW_CHECK_INTERVAL);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {isLoading ? (
        <Spinner />
      ) : (
        <Card className="space-y-4 w-[480px]">
          <h1 className="text-headline-1">Admin</h1>
          {!user ? (
            <>
              <input
                type="text"
                className="bg-gray-100 rounded-xl w-full p-4"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="bg-gray-100 rounded-xl w-full p-4"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                state="solid"
                className={`w-full ${isSubmitDisabled ? 'opacity-50' : ''}`}
                onClick={() => !isSubmitDisabled && logIn()}
              >
                Log in
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <h2 className="text-headline-2">Participants result</h2>
                <Button
                  state="outline"
                  className="w-full"
                  onClick={downloadParticipantsResult}
                >
                  Export CSV Zip file
                </Button>
              </div>
              <div className="space-y-4">
                <h2 className="text-headline-2">Deployment</h2>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center font-bold">
                    <a
                      href="https://dream-constitution.web.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      1. Staging
                    </a>
                  </div>
                  <Button
                    state="outline"
                    className="w-full"
                    onClick={() => triggerWorkflow('staging.yaml')}
                  >
                    Deploy
                  </Button>
                  <div className="flex items-center font-bold">
                    <a
                      href="https://dream-constitution.web.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      2. Production
                    </a>
                  </div>
                  <Button
                    state="outline"
                    className="w-full"
                    onClick={() => triggerWorkflow('production.yaml')}
                  >
                    Deploy
                  </Button>
                </div>
                <h3 className="underline">History</h3>
                <div className="grid grid-cols-3 gap-2 text-body-2">
                  {workflowLog.map(
                    ({ id, name, status, conclusion, createdAt }) => (
                      <>
                        <p key={`${id}-name`} className="font-bold">
                          {name?.toLowerCase().includes('staging')
                            ? 'Staging'
                            : 'Production'}
                        </p>
                        <p key={`${id}-con`}>
                          {(conclusion || status)?.split('_').join(' ')}
                        </p>
                        <p key={`${id}-create`}>
                          {createdAt.toLocaleString('TH-th')}
                        </p>
                      </>
                    )
                  )}
                </div>
              </div>
              <Button state="solid" className="w-full" onClick={logOut}>
                Logout
              </Button>
            </>
          )}
        </Card>
      )}
    </div>
  );
};
export default AdminPage;
