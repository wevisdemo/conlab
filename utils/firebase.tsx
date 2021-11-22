import firebase from 'firebase/app';
import 'firebase/database';
import { ResultOption } from '../data/topics';
import { Topics } from './result-parser';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const environment = process.env.NEXT_PUBLIC_ENV || 'development';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

let db: firebase.database.Database;
if (environment !== 'development') {
  db = firebase.database();
}

export const submitResult = (
  topicNumber: number,
  answers: number[],
  suggestedOptions: ResultOption[],
  selectedOptions: ResultOption[],
  feedback: string
): Promise<void> =>
  new Promise((resolve, reject) =>
    db.ref(`${environment}/topics/${topicNumber}`).push(
      {
        answers,
        suggestedOptions: suggestedOptions.map(({ id }) => id),
        finalOptions: selectedOptions.map(({ id }) => id),
        feedback,
        submitAt: {
          '.sv': 'timestamp',
        },
      },
      (error) => (error ? reject(error) : resolve())
    )
  );

export const getParticipantResults = (): Promise<Topics> =>
  new Promise((resolve, reject) =>
    db
      .ref(`production/topics/`)
      .get()
      .then((snapshot) => resolve(snapshot.val() as Topics))
      .catch(reject)
  );
