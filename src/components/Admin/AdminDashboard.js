import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalUsers: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    // Fetch stats and users from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    setStats({
      totalTasks: tasks.length,
      completedTasks: tasks.filter(task => task.status === 'completed').length,
      pendingTasks: tasks.filter(task => task.status === 'pending').length,
      totalUsers: users.length
    });

    // Get the 5 most recent users
    const sortedUsers = users.sort((a, b) => b.id - a.id);
    setRecentUsers(sortedUsers.slice(0, 5));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Tasks</h2>
          <p className="text-3xl">{stats.totalTasks}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Completed Tasks</h2>
          <p className="text-3xl">{stats.completedTasks}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Pending Tasks</h2>
          <p className="text-3xl">{stats.pendingTasks}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl">{stats.totalUsers}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Recent Users</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/admin/users" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
          View All Users
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;