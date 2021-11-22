import { FunctionComponent, useState } from 'react';
import Button from '../components/button';
import Card from '../components/card';

const AdminPage: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isSubmitDisabled = !email.length || !password.length;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="space-y-4 w-96">
        <h1 className="text-headline-1">Admin</h1>
        <input
          type="string"
          className="bg-gray-100 rounded-xl w-full p-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="bg-gray-100 rounded-xl w-full p-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          state="solid"
          className={`w-full ${isSubmitDisabled ? 'opacity-50' : ''}`}
          onClick={() => !isSubmitDisabled && console.log(email, password)}
        >
          Log in
        </Button>
      </Card>
    </div>
  );
};

export default AdminPage;
