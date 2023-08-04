import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StyledTaskList } from '../styles';
import ITask from './ITask';
import ITaskListProps from './ITaskListProps';
import { AuthContext } from '../Auth/AuthProvider';
import ProjectSelection from '../Project/ProjectSelection';
import IProject from '../Project/IProject';
import TaskPopup from './TaskPopup';
import Modal from '../components/ModalOverlay';

const TaskList: React.FC<ITaskListProps> = ({ config }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { userId } = useContext(AuthContext);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [taskId, setTaskId] = useState('');

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

  const finishTask = async (taskId: string) => {
    try {
      setTaskId(taskId);
      setShowPopup(true);
      //   const updateData = {
      //     finishedAt: finishedAt,
      //     summary: summary,
      //   };
      //   await axios.patch(`${config.apiUrl}/tasks/finish/${taskId}`, updateData);

      //   const response = await axios.get(
      //     `${config.apiUrl}/tasks/user/${userId}/${selectedProjectId}`
      //   );
      //   setTasks(response.data);
    } catch (error) {
      console.error('Failed to finish task:', error);
    }
  };

  const handlePopupFinish = () => {
    setShowPopup(false);
  };

  return (
    <>
      <ProjectSelection
        projects={projects}
        selectedProjectId={selectedProjectId}
        onChange={setSelectedProjectId}
      />
      {showPopup && (
        <Modal onClose={() => setShowPopup(false)}>
          <TaskPopup
            config={config}
            taskId={taskId}
            onFinish={handlePopupFinish}
          />
        </Modal>
      )}
      <StyledTaskList>
        {tasks.map((task) => (
          <div key={task._id}>
            <h3>{task.description}</h3>
            <p>Created At: {task.localTimestamp}</p>
            {task.summary && <p>Summary: {task.summary}</p>}
            {task.finishedAt && <p>Finished At: {task.finishLocalTimestamp}</p>}
            {!task.finishedAt && (
              <>
                <button
                  onClick={
                    () => finishTask(task._id) //, getCurrentDateTime(), 'Task finished.')
                  }
                >
                  Finish Task
                </button>
              </>
            )}
            <hr />
          </div>
        ))}
      </StyledTaskList>
    </>
  );
};

export default TaskList;
