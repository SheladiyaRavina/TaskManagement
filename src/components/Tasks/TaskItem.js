import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const { user, isAdmin } = useContext(AuthContext);

  const canEditDelete = isAdmin() || task.userId === user.id;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdateTask(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = () => {
    onUpdateTask({ ...task, status: task.status === 'pending' ? 'completed' : 'pending' });
  };

  if (isEditing) {
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <input
          type="text"
          name="title"
          value={editedTask.title}
          onChange={handleChange}
          className="mb-2 w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={editedTask.description}
          onChange={handleChange}
          className="mb-2 w-full p-2 border rounded"
        />
        <input
          type="date"
          name="dueDate"
          value={editedTask.dueDate}
          onChange={handleChange}
          className="mb-2 w-full p-2 border rounded"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
          <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
      <p className="text-sm text-gray-500">Status: {task.status}</p>
      {isAdmin() && <p className="text-sm text-gray-500">User ID: {task.userId}</p>}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handleStatusChange}
          className={`px-4 py-2 rounded ${
            task.status === 'completed' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
          }`}
        >
          {task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
        </button>
        {canEditDelete && (
          <div>
            <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>
            <button onClick={() => onDeleteTask(task.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;