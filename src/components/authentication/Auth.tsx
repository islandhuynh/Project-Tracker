import { useContext } from 'react';
import GoogleButton from 'react-google-button'
import { AuthContext } from '../firebase-context/FirebaseContext';

export const Auth = () => {
  const { login } = useContext(AuthContext)

  return (
    <div className="login-screen">
      <h1>Welcome to Project Tracker</h1>
      <h2>Sign in to see your progress!</h2>
      <div className="login-container">
        <GoogleButton onClick={() => login()} />
      </div>
    </div>
  )
}