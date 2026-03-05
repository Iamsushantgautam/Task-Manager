import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
            const res = await axios.get(`${API_URL}/api/tasks`, getHeaders());
            setTasks(res.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const createTask = async (taskData) => {
        try {
            const res = await axios.post(`${API_URL}/api/tasks`, taskData, getHeaders());
            setTasks([res.data, ...tasks]);
        } catch (error) {
            console.error(error);
        }
    };

    const updateTask = async (id, taskData) => {
        try {
            const res = await axios.put(`${API_URL}/api/tasks/${id}`, taskData, getHeaders());
            setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/tasks/${id}`, getHeaders());
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
