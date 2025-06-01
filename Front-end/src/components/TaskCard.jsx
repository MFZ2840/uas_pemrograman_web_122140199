import { useState } from "react";
import { CheckCircle, Trash2, Edit3 } from "lucide-react";

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete, categories, onSaveEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Missing":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getStatus = () => {
    const today = new Date();
    const due = new Date(task.due_date);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    if (due < today && !task.is_done) return "Missing";
    return task.is_done ? "Completed" : "Pending";
  };

  const status = getStatus();
  const statusStyle = getStatusStyle(status);

  const handleSave = () => {
    onSaveEdit(editedTask);
    setIsEditing(false);
  };

  return (
    <>
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-lg transition-transform duration-300 hover:scale-[1.01]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-bold text-gray-800 break-words">{task.title}</h3>
            <p className="text-gray-600 mt-2 whitespace-pre-wrap break-words">{task.details}</p>
            <p className="text-sm text-gray-500 mt-2">Due: {task.due_date}</p>
            <span className={`inline-block mt-3 px-3 py-1 text-xs font-bold rounded-full ${statusStyle}`}>
              {status}
            </span>
          </div>

          <div className="flex gap-4 items-start md:items-center">
            {!task.is_done && (
              <button onClick={() => onToggleComplete(task.id)} title="Mark as Done" className="text-green-600 hover:text-green-700 hover:scale-110 transition">
                <CheckCircle className="w-6 h-6" />
              </button>
            )}
            <button onClick={() => setIsEditing(true)} title="Edit" className="text-blue-600 hover:text-blue-700 hover:scale-110 transition">
              <Edit3 className="w-6 h-6" />
            </button>
            <button onClick={() => onDelete(task.id)} title="Delete" className="text-red-600 hover:text-red-700 hover:scale-110 transition">
              <Trash2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Edit */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-gray-400 bg-opacity-80 border border-gray-400 p-8 rounded-3xl max-w-lg w-full shadow-2xl transform transition-all duration-300 scale-100 my-8">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-br from-indigo-600 to-purple-700 bg-clip-text text-transparent">Edit Task</h3>
            </div>

            <div className="space-y-6">
              <input
                type="text"
                placeholder="Task Title"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-2xl p-4 bg-white/80 backdrop-blur-sm"
              />
              <textarea
                placeholder="Task Description"
                value={editedTask.details}
                onChange={(e) => setEditedTask({ ...editedTask, details: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-2xl p-4 h-24 bg-white/80 backdrop-blur-sm"
              />
              <select
                value={editedTask.category_id}
                onChange={(e) => setEditedTask({ ...editedTask, category_id: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-2xl p-4 bg-white/80 backdrop-blur-sm"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <input
                type="date"
                value={editedTask.due_date}
                onChange={(e) => setEditedTask({ ...editedTask, due_date: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-2xl p-4 bg-white/80 backdrop-blur-sm"
              />
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-2xl shadow-xl hover:scale-105 transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold py-3 rounded-2xl shadow-xl hover:scale-105 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;
