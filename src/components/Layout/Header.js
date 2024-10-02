import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <header className="bg-dark text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Task Management</Link>
        <nav>
          {user ? (
            <>
              <Link to="/tasks" className="mr-4">Tasks</Link>
              <button onClick={logoutUser} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register" className="bg-white text-black hover:bg-green-600 px-4 py-2 rounded">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;