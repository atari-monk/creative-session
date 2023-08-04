import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StyledTaskList } from '../styles';
import ITask from './ITask';
import ITaskListProps from './ITaskListProps';
import { AuthContext } from '../Auth/AuthProvider';

const TaskList: React.FC<ITaskListProps> = ({ config }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/tasks/user/${userId}`
        );
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, [config.apiUrl, userId]);

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