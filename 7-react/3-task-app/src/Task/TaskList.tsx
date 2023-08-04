import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StyledTaskList } from '../styles';
import ITask from './ITask';
import ITaskListProps from './ITaskListProps';
import { AuthContext } from '../Auth/AuthProvider';
import ProjectSelection from '../Project/ProjectSelection';
import IProject from '../Project/IProject';

const TaskList: React.FC<ITaskListProps> = ({ config }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { userId } = useContext(AuthContext);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/tasks/user/${userId}/${selectedProjectId}`
        );
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    async function fetchProjects() {
      try {
        const response = await axios.get<IProject[]>(
          `${config.apiUrl}/projects/user?userId=${userId}`
        );
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    }

    fetchProjects();
    fetchTasks();
  }, [config.apiUrl, userId, selectedProjectId]);

  return (
    <>
      <ProjectSelection
        projects={projects}
        selectedProjectId={selectedProjectId}
        onChange={setSelectedProjectId}
      />
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
    </>
  );
};

export default TaskList;
