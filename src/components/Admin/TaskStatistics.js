import React, { useState, useEffect } from 'react';

const TaskStatistics = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    highPriorityTasks: 0
  });

  useEffect(() => {
    // Fetch tasks from localStorage or your API
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    setStats({
      totalTasks: tasks.length,
      completedTasks: tasks.filter(task => task.status === 'completed').length,
      pendingTasks: tasks.filter(task => task.status === 'pending').length,
      highPriorityTasks: tasks.filter(task => task.priority === 'high').length
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Task Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Total Tasks</h3>
          <p className="text-3xl">{stats.totalTasks}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Completed Tasks</h3>
          <p className="text-3xl">{stats.completedTasks}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Pending Tasks</h3>
          <p className="text-3xl">{stats.pendingTasks}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">High Priority Tasks</h3>
          <p className="text-3xl">{stats.highPriorityTasks}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskStatistics;