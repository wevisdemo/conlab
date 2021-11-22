import { FunctionComponent, useEffect, useState } from 'react';
import firebase from 'firebase';

import Button from '../components/button';
import Card from '../components/card';

const AdminPage: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);

  const auth = firebase.auth();

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  const isSubmitDisabled = isLoading || !email.length || !password.length;

  const LogIn = () => {
    setIsLoading(true);

    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => setUser(user))
      .catch(({ code, message }) => alert(`Error ${code}: ${message}`))
      .finally(() => setIsLoading(false));
  };

  return !user ? (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="space-y-4 w-96">
        <h1 className="text-headline-1">Admin</h1>
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
          onClick={() => !isSubmitDisabled && LogIn()}
        >
          {isLoading ? 'Loading...' : 'Log in'}
        </Button>
      </Card>
    </div>
  ) : (
    <div>Logged in</div>
  );
};

export default AdminPage;
