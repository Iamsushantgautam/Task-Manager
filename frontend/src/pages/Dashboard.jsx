import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const { tasks, fetchTasks, createTask, updateTask, deleteTask, loading } = useContext(TaskContext);
    const navigate = useNavigate();

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDesc, setTaskDesc] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchTasks();
    }, [user, navigate]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!taskTitle) return;

        createTask({ title: taskTitle, description: taskDesc });
        setTaskTitle('');
        setTaskDesc('');
    };

    const toggleStatus = (task) => {
        const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
        updateTask(task._id, { status: newStatus });
    };

    return (
        <div>
            <section className="glass-panel mb-4">
                <h2 className="mb-2">Add New Task</h2>
                <form onSubmit={onSubmit} className="flex-col gap-1">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Task Title (required)"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group flex gap-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Task Description (optional)"
                            value={taskDesc}
                            onChange={(e) => setTaskDesc(e.target.value)}
                            style={{ flex: 1 }}
                        />
                        <button type="submit" className="btn btn-primary" disabled={!taskTitle}>
                            Add Task
                        </button>
                    </div>
                </form>
            </section>

            <section>
                <h2 className="mb-4">Your Tasks</h2>
                {loading ? (
                    <div className="spinner"></div>
                ) : tasks.length > 0 ? (
                    <div className="tasks-grid">
                        {tasks.map((task) => (
                            <div key={task._id} className={`task-item ${task.status.toLowerCase()}`}>
                                <div className="task-header">
                                    <div>
                                        <h3 style={{ marginBottom: '0.2rem', color: task.status === 'Completed' ? 'var(--text-secondary)' : 'var(--text-primary)', textDecoration: task.status === 'Completed' ? 'line-through' : 'none' }}>{task.title}</h3>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                            {new Date(task.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="task-actions">
                                        <button
                                            className={`btn ${task.status === 'Pending' ? 'btn-success' : 'btn-success'}`}
                                            onClick={() => toggleStatus(task)}
                                        >
                                            {task.status === 'Pending' ? 'Complete' : 'Undo'}
                                        </button>
                                        <button className="btn btn-danger" onClick={() => deleteTask(task._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                {task.description && (
                                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', textDecoration: task.status === 'Completed' ? 'line-through' : 'none' }}>
                                        {task.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="glass-panel text-center">
                        <h3>No tasks found</h3>
                        <p className="text-secondary">Create a task above to get started.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Dashboard;
