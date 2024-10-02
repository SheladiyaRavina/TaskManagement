import React, { useState } from 'react';
import { toast } from 'react-toastify';

const TaskDetailsModal = ({ task, onClose, onUpdate, onDelete, isAdmin, currentUserId }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(editedTask);
    setEditMode(false);
    toast.success('Task updated successfully');
  };

  const handleDelete = () => {
    onDelete(task.id);
    onClose();
    toast.success('Task deleted successfully');
  };

  const canManageTask = isAdmin || task.userId === currentUserId;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}>
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{editMode ? 'Edit Task' : 'Task Details'}</h3>
          <div className="mt-2 px-7 py-3">
            {editMode ? (
              <form>
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
                <select
                  name="priority"
                  value={editedTask.priority}
                  onChange={handleChange}
                  className="mb-2 w-full p-2 border rounded"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <input
                  type="text"
                  name="category"
                  value={editedTask.category}
                  onChange={handleChange}
                  className="mb-2 w-full p-2 border rounded"
                />
              </form>
            ) : (
              <div className="text-left">
                <p><strong>Title:</strong> {task.title}</p>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Due Date:</strong> {task.dueDate}</p>
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Category:</strong> {task.category}</p>
                <p><strong>Status:</strong> {task.completed ? 'Completed' : 'In Progress'}</p>
              </div>
            )}
          </div>
          <div className="items-center px-4 py-3">
            {canManageTask && (
              <>
                {editMode ? (
                  <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 mr-2">
                    Save
                  </button>
                ) : (
                  <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mr-2">
                    Edit
                  </button>
                )}
                <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 mr-2">
                  Delete
                </button>
              </>
            )}
            <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;