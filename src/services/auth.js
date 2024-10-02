// Simulated delay to mimic API call
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const login = async (email, password) => {
  await delay(500); // Simulate API delay
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    return { user: { name: user.name, email: user.email } };
  } else {
    throw new Error('Invalid credentials');
  }
};

export const register = async (name, email, password) => {
  await delay(500); // Simulate API delay
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.some(u => u.email === email)) {
    throw new Error('Email already exists');
  }
  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  return { user: { name, email } };
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};