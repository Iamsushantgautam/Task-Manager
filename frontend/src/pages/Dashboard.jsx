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

    // Edit state
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDesc, setEditDesc] = useState('');

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

    const startEdit = (task) => {
        setEditingId(task._id);
        setEditTitle(task.title);
        setEditDesc(task.description || '');
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditTitle('');
        setEditDesc('');
    };

    const saveEdit = (task) => {
        if (!editTitle.trim()) return;
        updateTask(task._id, { title: editTitle, description: editDesc });
        cancelEdit();
    };

    const pendingCount = tasks.filter(t => t.status === 'Pending').length;
    const completedCount = tasks.filter(t => t.status === 'Completed').length;

    return (
        <div>
            {/* Stats Bar */}
            {tasks.length > 0 && (
                <div className="stats-bar mb-4">
                    <div className="stat-item">
                        <span className="stat-number">{tasks.length}</span>
                        <span className="stat-label">Total</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number" style={{ color: 'var(--warning-color)' }}>{pendingCount}</span>
                        <span className="stat-label">Pending</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number" style={{ color: 'var(--success-color)' }}>{completedCount}</span>
                        <span className="stat-label">Completed</span>
                    </div>
                </div>
            )}

            {/* Add Task Form */}
            <section className="glass-panel mb-4">
                <h2 className="mb-2">Add New Task</h2>
                <form onSubmit={onSubmit} className="task-form">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Task title (required)"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Description (optional)"
                        value={taskDesc}
                        onChange={(e) => setTaskDesc(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary" disabled={!taskTitle}>
                        + Add Task
                    </button>
                </form>
            </section>

            {/* Task List */}
            <section>
                <h2 className="mb-4">Your Tasks</h2>
                {loading ? (
                    <div className="spinner"></div>
                ) : tasks.length > 0 ? (
                    <div className="tasks-grid">
                        {tasks.map((task) => (
                            <div key={task._id} className={`task-card ${task.status.toLowerCase()}`}>

                                {editingId === task._id ? (
                                    /* ---- Edit Mode ---- */
                                    <div className="task-edit-form">
                                        <div className="task-card-badge">
                                            <span className={`badge ${task.status.toLowerCase()}`}>
                                                ✏️ Editing
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            placeholder="Task title"
                                            autoFocus
                                        />
                                        <input
                                            className="form-control"
                                            value={editDesc}
                                            onChange={(e) => setEditDesc(e.target.value)}
                                            placeholder="Description (optional)"
                                        />
                                        <div className="task-card-footer">
                                            <button
                                                className="btn-action complete"
                                                onClick={() => saveEdit(task)}
                                                disabled={!editTitle.trim()}
                                            >
                                                ✓ Save
                                            </button>
                                            <button className="btn-action undo" onClick={cancelEdit}>
                                                ✕ Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    /* ---- View Mode ---- */
                                    <>
                                        {/* Status Badge + Date */}
                                        <div className="task-card-badge">
                                            <span className={`badge ${task.status.toLowerCase()}`}>
                                                {task.status === 'Pending' ? '🕐 Pending' : '✅ Completed'}
                                            </span>
                                            <span className="task-date">
                                                {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className={`task-title ${task.status === 'Completed' ? 'done' : ''}`}>
                                            {task.title}
                                        </h3>

                                        {/* Description */}
                                        {task.description && (
                                            <p className={`task-desc ${task.status === 'Completed' ? 'done' : ''}`}>
                                                {task.description}
                                            </p>
                                        )}

                                        {/* Actions */}
                                        <div className="task-card-footer">
                                            <button
                                                className={`btn-action ${task.status === 'Pending' ? 'complete' : 'undo'}`}
                                                onClick={() => toggleStatus(task)}
                                            >
                                                {task.status === 'Pending' ? '✓ Complete' : '↩ Undo'}
                                            </button>
                                            <button className="btn-action edit" onClick={() => startEdit(task)}>
                                                ✏ Edit
                                            </button>
                                            <button className="btn-action delete" onClick={() => deleteTask(task._id)}>
                                                🗑 Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state glass-panel text-center">
                        <div className="empty-icon">📋</div>
                        <h3>No tasks yet</h3>
                        <p className="text-secondary">Create your first task above to get started.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Dashboard;
