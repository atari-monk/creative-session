import React, { useContext, useState } from 'react';
import axios from 'axios';
import { StyledTaskForm } from '../styles';
import { AuthContext } from './AuthProvider';
import ITaskFormProps from './ITaskFormProps';

const TaskForm: React.FC<ITaskFormProps> = ({ config }) => {
  const [description, setDescription] = useState('');
  const { userId } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${config.apiUrl}/tasks`, { description, userId });
      setDescription('');
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
