import React, { useContext } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { StyledAppContainer } from './styles';
import appConfig from './config/appConfig';
import { AuthContext } from './components/AuthProvider';
import LoginGoogle from './components/LoginGoogle';
import DarkModeToggle from './components/DarkModeToggle';

const App: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <StyledAppContainer className={`App`}>
      <DarkModeToggle />
      <h1>Task App</h1>
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
