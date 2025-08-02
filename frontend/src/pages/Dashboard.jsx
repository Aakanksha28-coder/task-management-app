import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortByDueDate, setSortByDueDate] = useState(false);

  // Set up axios auth header
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // Fetch tasks
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      // Build query params for filtering
      let url = '/api/tasks';
      if (statusFilter !== 'All') {
        url += `?status=${statusFilter}`;
      }
      
      const response = await axios.get(url);
      
      let fetchedTasks = response.data.data;
      
      // Sort by due date if enabled
      if (sortByDueDate) {
        fetchedTasks = fetchedTasks.sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });
      }
      
      setTasks(fetchedTasks);
    } catch (error) {
      toast.error('Failed to fetch tasks');
      console.error('Fetch tasks error:', error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Load tasks on component mount and when filters change
  useEffect(() => {
    fetchTasks();
  }, [statusFilter, sortByDueDate]);

  // Handle task creation and update
  const handleTaskSubmit = async (formData) => {
    try {
      if (taskToEdit) {
        // Update existing task
        const response = await axios.put(`/api/tasks/${taskToEdit._id}`, formData);
        
        if (response.data.success) {
          toast.success('Task updated successfully');
          setTaskToEdit(null);
          fetchTasks();
        }
      } else {
        // Create new task
        const response = await axios.post('/api/tasks', formData);
        
        if (response.data.success) {
          toast.success('Task created successfully');
          fetchTasks();
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to save task. Please try again.'
      );
      console.error('Task save error:', error.response?.data || error.message);
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await axios.delete(`/api/tasks/${taskId}`);
        
        if (response.data.success) {
          toast.success('Task deleted successfully');
          fetchTasks();
          
          // If the deleted task was being edited, clear the edit form
          if (taskToEdit && taskToEdit._id === taskId) {
            setTaskToEdit(null);
          }
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || 'Failed to delete task. Please try again.'
        );
        console.error('Task delete error:', error.response?.data || error.message);
      }
    }
  };

  // Handle task status change
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const response = await axios.put(`/api/tasks/${taskId}`, { status: newStatus });
      
      if (response.data.success) {
        toast.success(`Task marked as ${newStatus}`);
        fetchTasks();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to update task status. Please try again.'
      );
      console.error('Status update error:', error.response?.data || error.message);
    }
  };

  // Set task for editing
  const handleEditTask = async (taskId) => {
    try {
      const response = await axios.get(`/api/tasks/${taskId}`);
      setTaskToEdit(response.data.data);
      
      // Scroll to the form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      toast.error('Failed to load task for editing');
      console.error('Edit task error:', error.response?.data || error.message);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setTaskToEdit(null);
  };

  return (
    <div className="dashboard">
      <h1 className="mb-4">Task Dashboard</h1>
      
      {/* Task Form */}
      <TaskForm 
        onTaskSubmit={handleTaskSubmit} 
        taskToEdit={taskToEdit} 
        onCancelEdit={handleCancelEdit} 
      />
      
      {/* Filter Controls */}
      <div className="filter-controls mt-4">
        <div>
          <label className="me-2">Filter by Status:</label>
          <select 
            className="form-select form-select-sm d-inline-block w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Tasks</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        
        <div className="form-check">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="sortByDueDate" 
            checked={sortByDueDate}
            onChange={() => setSortByDueDate(!sortByDueDate)}
          />
          <label className="form-check-label" htmlFor="sortByDueDate">
            Sort by Due Date
          </label>
        </div>
      </div>
      
      {/* Task List */}
      <div className="task-list mt-4">
        <h2 className="mb-3">
          {statusFilter === 'All' ? 'All Tasks' : `${statusFilter} Tasks`}
          {sortByDueDate && ' (Sorted by Due Date)'}
        </h2>
        
        {isLoading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="alert alert-info">
            No tasks found. Create a new task to get started!
          </div>
        ) : (
          <div className="row">
            {tasks.map((task) => (
              <div className="col-md-6 col-lg-4 mb-4" key={task._id}>
                <TaskItem 
                  task={task} 
                  onEdit={handleEditTask} 
                  onDelete={handleDeleteTask} 
                  onStatusChange={handleStatusChange} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;