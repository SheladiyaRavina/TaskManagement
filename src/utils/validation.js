export const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };
  
  export const validatePassword = (password) => {
    return password.length >= 6;
  };
  
  export const validateName = (name) => {
    return name.trim().length > 0;
  };
  
  export const validateTaskInput = (task) => {
    const errors = {};
  
    if (!task.title || task.title.trim().length === 0) {
      errors.title = 'Title is required';
    }
  
    if (!task.description || task.description.trim().length === 0) {
      errors.description = 'Description is required';
    }
  
    if (!task.dueDate) {
      errors.dueDate = 'Due date is required';
    }
  
    if (!task.priority) {
      errors.priority = 'Priority is required';
    }
  
    if (!task.category || task.category.trim().length === 0) {
      errors.category = 'Category is required';
    }
  
    return errors;
  };