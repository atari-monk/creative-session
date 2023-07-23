import React, { useState } from 'react';
import axios from 'axios';
import { StyledTaskForm } from '../styles';

const API_BASE_URL = 'https://atari-monk-task-api.azurewebsites.net';

const TaskForm: React.FC = () => {
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/tasks`, { description });
      setDescription('');
      window.location.reload(); // Refresh the list after adding a new task (not recommended in production)
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <StyledTaskForm onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        placeholder="Enter task description"
      />
      <button type="submit">Add Task</button>
    </StyledTaskForm>
  );
};

export default TaskForm;
