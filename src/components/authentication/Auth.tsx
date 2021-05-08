import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../firebase-context/FirebaseContext';

export const Auth = () => {
  const { login } = useContext(AuthContext)

  return (
    <div className="login-container">
      <Button onClick={() => login()}>Sign In with Google</Button>
    </div>
  )
}