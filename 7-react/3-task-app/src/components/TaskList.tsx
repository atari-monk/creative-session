import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyledTaskList } from '../styles';
import { ITask } from './ITask';

const API_BASE_URL = 'https://atari-monk-task-api.azurewebsites.net';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <StyledTaskList>
      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.description}</h3>
          <p>Created At: {task.localTimestamp}</p>
          {task.summary && <p>Summary: {task.summary}</p>}
          {task.finishedAt && <p>Finished At: {task.finishLocalTimestamp}</p>}
          <hr />
        </div>
      ))}
    </StyledTaskList>
  );
};

export default TaskList;
