import React, { useContext } from 'react';
import { StyledAppContainer } from './styles';
import { AuthContext } from './components/AuthProvider';
import AppMenu from './components/AppMenu';
import UIToggle from './components/UIToggle';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import appConfig from './config/appConfig';

const App: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <StyledAppContainer className={`App`}>
      <AppMenu />
      {isLoggedIn ? (
        <>
          <UIToggle
            projectUIs={
              <>
                <p>Project Placeholder</p>
              </>
            }
            taskUIs={
              <>
                <TaskForm config={appConfig} />
                <TaskList config={appConfig} />
              </>
            }
          ></UIToggle>
        </>
      ) : null}
    </StyledAppContainer>
  );
};

export default App;
