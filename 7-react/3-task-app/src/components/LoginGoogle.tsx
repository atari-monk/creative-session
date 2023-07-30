import React, { useContext, useState } from 'react';
import { auth, GoogleAuthProvider, signInWithPopup } from '../firebase';
import { AuthContext } from './AuthProvider';
import ISharedProps from './ISharedProps';
import axios, { AxiosError } from 'axios';

const LoginGoogle: React.FC<ISharedProps> = ({ config }) => {
  const { setIsLoggedIn, setUserId } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const { email, displayName } = userCredential.user;
      if (email) {
        await createUser(email, displayName || '');
        const userId = await getUserIdByEmail(email);
        setUserId(userId);
        setIsLoggedIn(true);
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
      console.log('Response:', (error as AxiosError).response?.data);
      //console.error('Failed to create user:', error);
    }
  };

  const getUserIdByEmail = async (email: string) => {
    try {
      const response = await axios.get(`${config.apiUrl}/users/email/${email}`);
      return response.data.userId;
    } catch (error) {
      console.error('Failed to get userId:', error);
      return null;
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
