import React, { useContext, useState } from 'react';
import { auth, GoogleAuthProvider, signInWithPopup } from '../firebase';
import { AuthContext } from './AuthProvider';

const LoginGoogle: React.FC = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      setIsLoggedIn(true);
      setMessage(`User logged in with Google: ${userCredential.user?.email}`);
    } catch (error) {
      setMessage(`Error logging in with Google: ${(error as Error).message}`);
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
