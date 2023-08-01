import React, { useState } from 'react';
import IUIToggleProps from './IUIToggleProps';

const UIToggle: React.FC<IUIToggleProps> = ({ projectUIs, taskUIs }) => {
  const [isProjectVisible, setProjectVisible] = useState(true);
  const [isTaskVisible, setTaskVisible] = useState(false);

  const toggleProjectVisibility = () => {
    setTaskVisible(false);
    setProjectVisible(true);
  };

  const toggleTaskVisibility = () => {
    setProjectVisible(false);
    setTaskVisible(true);
  };

  return (
    <>
      <button onClick={toggleProjectVisibility}>{'Project'}</button>
      <button onClick={toggleTaskVisibility}>{'Task'}</button>
      {isProjectVisible && projectUIs}
      {isTaskVisible && taskUIs}
    </>
  );
};

export default UIToggle;
