import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

    const getHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/tasks', getHeaders());
            setTasks(res.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const createTask = async (taskData) => {
        try {
            const res = await axios.post('http://localhost:5000/api/tasks', taskData, getHeaders());
            setTasks([res.data, ...tasks]);
        } catch (error) {
            console.error(error);
        }
    };

    const updateTask = async (id, taskData) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, taskData, getHeaders());
            setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`, getHeaders());
            setTasks(tasks.filter((t) => t._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, fetchTasks, createTask, updateTask, deleteTask, loading }}>
            {children}
        </TaskContext.Provider>
    );
};
