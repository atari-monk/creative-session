import React, { useState } from 'react';
import { auth, GoogleAuthProvider, signInWithPopup } from '../firebase';

const Login: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const msg = `User logged in with Google: ${userCredential.user?.email}`;
      console.log(msg);
      setMessage(msg);
    } catch (error) {
      const errMsg = `Error logging in with Google: ${error}`;
      console.error(errMsg);
      setMessage(errMsg);
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

export default Login;
