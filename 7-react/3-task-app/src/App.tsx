import React, { useContext } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { StyledAppContainer } from './styles';
import appConfig from './config/appConfig';
import { AuthContext } from './components/AuthProvider';
import AppMenu from './components/AppMenu';

const App: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <StyledAppContainer className={`App`}>
      <AppMenu />
      {isLoggedIn ? (
        <>
          <TaskForm config={appConfig} />
          <h2>Tasks:</h2>
          <TaskList config={appConfig} />
        </>
      ) : null}
    </StyledAppContainer>
  );
};

export default App;
