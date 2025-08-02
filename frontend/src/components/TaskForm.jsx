import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const TaskForm = ({ onTaskSubmit, taskToEdit, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  // If taskToEdit is provided, populate the form
  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        dueDate: taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : ''
      });
    } else {
      // Reset form when not editing
      setFormData({
        title: '',
        description: '',
        dueDate: ''
      });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please provide both title and description');
      return;
    }
    
    // Call the parent handler with form data
    onTaskSubmit(formData);
    
    // Reset form if not editing
    if (!taskToEdit) {
      setFormData({
        title: '',
        description: '',
        dueDate: ''
      });
    }
  };

  return (
    <div className="task-form">
      <h3 className="mb-3">{taskToEdit ? 'Edit Task' : 'Create New Task'}</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="title" className="form-label">Task Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter task title"
            maxLength="100"
          />
        </div>
        
        <div className="form-group mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter task description"
            rows="3"
            maxLength="500"
          ></textarea>
        </div>
        
        <div className="form-group mb-3">
          <label htmlFor="dueDate" className="form-label">Due Date (Optional)</label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
        
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            {taskToEdit ? 'Update Task' : 'Add Task'}
          </button>
          
          {taskToEdit && (
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;