import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';

const API_BASE_URL = 'https://atari-monk-task-api.azurewebsites.net';

interface ITask {
  _id: string;
  description: string;
  createdAt: Date;
  localTimestamp: string;
  finishedAt?: Date;
  finishLocalTimestamp?: string;
  summary?: string;
}

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
    <div>
      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.description}</h3>
          <p>Created At: {task.localTimestamp}</p>
          {task.summary && <p>Summary: {task.summary}</p>}
          {task.finishedAt && <p>Finished At: {task.finishLocalTimestamp}</p>}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
