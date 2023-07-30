import React, { useContext, useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { StyledAppContainer, setDarkMode } from './styles';
import appConfig from './config/appConfig';
import { AuthContext } from './components/AuthProvider';
import LoginGoogle from './components/LoginGoogle';

const App: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [darkMode, setDarkModeState] = useState<boolean>(true);

  useEffect(() => {
    setDarkMode(darkMode);
    return () => setDarkMode(false);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkModeState(newDarkMode);
    setDarkMode(newDarkMode);
  };

  return (
    <StyledAppContainer className={`App`}>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <h1>Task Manager</h1>
      {isLoggedIn ? (
        <>
          <TaskForm config={appConfig} />
          <h2>Tasks:</h2>
          <TaskList config={appConfig} />
        </>
      ) : (
        <LoginGoogle config={appConfig} />
      )}
    </StyledAppContainer>
  );
};

export default App;
