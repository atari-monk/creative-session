import React, { useContext, useState } from 'react';
import { auth, GoogleAuthProvider, signInWithPopup } from '../firebase';
import { AuthContext } from './AuthProvider';
import ISharedProps from './ISharedProps';
import axios from 'axios';

const LoginGoogle: React.FC<ISharedProps> = ({ config }) => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      setIsLoggedIn(true);

      const { email, displayName } = userCredential.user;
      if (email) {
        createUser(email, displayName || '');
        setMessage(`User logged in with Google: ${email}`);
      } else {
        setMessage(
          'User email not available. Please ensure you allow access to your email during the login process.'
        );
      }
    } catch (error) {
      setMessage(`Error logging in with Google: ${(error as Error).message}`);
    }
  };

  const createUser = async (email: string, displayName: string) => {
    try {
      await axios.post(`${config.apiUrl}/users`, {
        email: email,
        displayName: displayName,
      });
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginGoogle;
