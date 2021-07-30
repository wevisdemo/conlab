import firebase from 'firebase/app';
import 'firebase/database';
import { ResultOption } from '../data/topics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();
const environment = process.env.NEXT_PUBLIC_IS_PRODUCTION
  ? 'production'
  : 'staging';

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
