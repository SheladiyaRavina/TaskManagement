import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    dueDate: 'all',
    category: 'all',
    priority: 'all'
  });
  const { user, isAdmin } = useContext(AuthContext);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    let filtered = isAdmin() ? tasks : tasks.filter(task => task.userId === user.id);

    if (filters.status !== 'all') {
      filtered = filtered.filter(task => task.status === filters.status);
    }
    if (filters.dueDate !== 'all') {
      const today = new Date();
      const oneWeekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(task => {
        const dueDate = new Date(task.dueDate);
        if (filters.dueDate === 'today') return dueDate.toDateString() === today.toDateString();
        if (filters.dueDate === 'week') return dueDate <= oneWeekLater;
        return true;
      });
    }
    if (filters.category !== 'all') {
      filtered = filtered.filter(task => task.category === filters.category);
    }
    if (filters.priority !== 'all') {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    setFilteredTasks(filtered);
  }, [tasks, filters, isAdmin, user.id]);

  const handleCreateTask = (newTask) => {
    const updatedTasks = [...tasks, { ...newTask, id: Date.now(), userId: user.id, status: 'pending' }];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const categories = ['all', ...new Set(tasks.map(task => task.category))];
  const priorities = ['all', 'low', 'medium', 'high'];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {isAdmin() ? 'All Tasks' : 'My Tasks'}
      </h1>
      <TaskForm onCreateTask={handleCreateTask} />
      
      <div className="mb-4 flex flex-wrap gap-4">
        <div>
          <label htmlFor="status" className="mr-2">Status:</label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border rounded p-2"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="dueDate" className="mr-2">Due Date:</label>
          <select
            id="dueDate"
            name="dueDate"
            value={filters.dueDate}
            onChange={handleFilterChange}
            className="border rounded p-2"
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
          </select>
        </div>
        <div>
          <label htmlFor="category" className="mr-2">Category:</label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="border rounded p-2"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="priority" className="mr-2">Priority:</label>
          <select
            id="priority"
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
            className="border rounded p-2"
          >
            {priorities.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;