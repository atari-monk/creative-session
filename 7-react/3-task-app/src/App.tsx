import React, { useContext } from 'react';
import { StyledAppContainer } from './styles';
import { AuthContext } from './components/AuthProvider';
import AppMenu from './components/AppMenu';
import UIToggle from './components/UIToggle';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import appConfig from './config/appConfig';
import ProjectForm from './components/ProjectForm';

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
                <ProjectForm config={appConfig} />
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
