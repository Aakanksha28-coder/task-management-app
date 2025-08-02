import { formatDistanceToNow } from 'date-fns';

const TaskItem = ({ task, onEdit, onDelete, onStatusChange }) => {
  const { _id, title, description, status, createdAt, updatedAt, dueDate } = task;

  // Format dates for display
  const formatDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Format due date if exists
  const formattedDueDate = dueDate ? new Date(dueDate).toLocaleDateString() : null;

  return (
    <div className="task-card">
      <div className="task-header">
        <h3 className="task-title">{title}</h3>
        <div className="task-actions">
          <button 
            className="btn btn-sm btn-outline-primary" 
            onClick={() => onEdit(_id)}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button 
            className="btn btn-sm btn-outline-danger" 
            onClick={() => onDelete(_id)}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
      
      <span className={`task-status status-${status.toLowerCase()}`}>
        {status}
      </span>
      
      <p className="task-description">{description}</p>
      
      {formattedDueDate && (
        <p className="task-due-date">
          <i className="far fa-calendar-alt me-1"></i>
          Due: {formattedDueDate}
        </p>
      )}
      
      <div className="task-meta">
        <span>Created: {formatDate(createdAt)}</span>
        <span>Updated: {formatDate(updatedAt)}</span>
      </div>
      
      <div className="mt-3">
        <button 
          className={`btn btn-sm ${status === 'Completed' ? 'btn-outline-warning' : 'btn-outline-success'}`}
          onClick={() => onStatusChange(_id, status === 'Completed' ? 'Pending' : 'Completed')}
        >
          {status === 'Completed' ? (
            <><i className="fas fa-undo me-1"></i> Mark as Pending</>
          ) : (
            <><i className="fas fa-check me-1"></i> Mark as Completed</>
          )}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;