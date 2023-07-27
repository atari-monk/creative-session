import { css } from '@emotion/react';
import styled from '@emotion/styled';

// Define CSS variables for light mode
const lightModeVariables = {
  '--background-color': '#f9f9f9',
  '--text-color': '#000',
};

// Define CSS variables for dark mode
const darkModeVariables = {
  '--background-color': '#333',
  '--text-color': '#fff',
};

export const appContainer = css`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--background-color);
  color: var(--text-color);
`;

export const taskForm = css`
  display: flex;
  align-items: center;

  input {
    flex: 1;
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ccc;
    background-color: var(--background-color);
    color: var(--text-color);
  }

  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }
`;

export const taskList = css`
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 10px;

  div {
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: var(--background-color);
    color: var(--text-color);
  }

  h3 {
    margin-top: 0;
  }
`;

// Create styled components using the css function
export const StyledAppContainer = styled.div`
  ${appContainer}
`;

export const StyledTaskForm = styled.form`
  ${taskForm}
`;

export const StyledTaskList = styled.div`
  ${taskList}
  max-height: 450px; /* Adjust this value as needed to fit 2-3 elements */
  overflow-y: auto; /* This will enable a vertical scrollbar when the content exceeds max-height */
`;

export const setDarkMode = (darkMode: boolean) => {
  const root = document.documentElement;

  if (darkMode) {
    for (const [key, value] of Object.entries(darkModeVariables)) {
      root.style.setProperty(key, value);
    }
  } else {
    for (const [key, value] of Object.entries(lightModeVariables)) {
      root.style.setProperty(key, value);
    }
  }
};
