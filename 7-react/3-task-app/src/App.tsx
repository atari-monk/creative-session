import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { StyledAppContainer, setDarkMode } from './styles';
import LoginGoogle from './components/LoginGoogle';

//deploy
const App: React.FC = () => {
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
      <LoginGoogle />
      <h1>Task Manager</h1>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <TaskForm />
      <h2>Tasks:</h2>
      <TaskList />
    </StyledAppContainer>
  );
};

export default App;
//
