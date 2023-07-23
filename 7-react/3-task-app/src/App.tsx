import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { StyledAppContainer, setDarkMode } from './styles';

//deploy app
const App: React.FC = () => {
  const [darkMode, setDarkModeState] = useState<boolean>(true);

  useEffect(() => {
    // Call setDarkMode on initial mount to apply the default dark mode styles
    setDarkMode(darkMode);

    // Cleanup to reset styles when unmounting the component
    return () => setDarkMode(false);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkModeState(newDarkMode);
    setDarkMode(newDarkMode);
  };

  return (
    <StyledAppContainer className={`App`}>
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
