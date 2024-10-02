import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TaskList from './components/Tasks/TaskList';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserManagement from './components/Admin/UserManagement';
import TaskStatistics from './components/Admin/TaskStatistics';
import EditUser from './components/Admin/EditUser';
import PrivateRoute from './components/Common/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/tasks" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/tasks" 
                element={
                  <PrivateRoute>
                    <TaskList />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <PrivateRoute adminOnly>
                    <AdminDashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/admin/users" 
                element={
                  <PrivateRoute adminOnly>
                    <UserManagement />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/admin/statistics" 
                element={
                  <PrivateRoute adminOnly>
                    <TaskStatistics />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/admin/user/:userId" 
                element={
                  <PrivateRoute adminOnly>
                    <EditUser />
                  </PrivateRoute>
                } 
              />
              
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthProvider>
    </Router>
  );
}

export default App;