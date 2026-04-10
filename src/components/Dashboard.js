import { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";
import Chat from "./Chat";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("All");
  const [chatOpen, setChatOpen] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "Work",
    due_date: ""
  });

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // CREATE TASK
  const createTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", newTask, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setNewTask({
        title: "",
        description: "",
        category: "Work",
        due_date: ""
      });

      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to create task");
    }
  };

  // TOGGLE COMPLETE
  const toggleComplete = async (taskId, completed) => {
    try {
      await API.put(
        `/tasks/${taskId}`,
        { completed: !completed },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE TASK
  const deleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // START EDIT
  const startEdit = (task) => {
  let formattedDate = "";

  if (task.due_date) {
    const date = new Date(task.due_date);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    formattedDate = localDate.toISOString().slice(0, 16);
  }

  setEditingTask({
    ...task,
    due_date: formattedDate
  });
};

  return (
    <>
      <div className="container mt-5">
        <h2>Your Tasks</h2>

        {/* CREATE FORM */}
        <form onSubmit={createTask} className="mb-4">
          <input
            className="form-control mb-2"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({ ...newTask, title: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />

          <select
            className="form-control mb-2"
            value={newTask.category}
            onChange={(e) =>
              setNewTask({ ...newTask, category: e.target.value })
            }
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Study">Study</option>
          </select>

          <input
            type="datetime-local"
            className="form-control mb-2"
            value={newTask.due_date}
            onChange={(e) =>
              setNewTask({ ...newTask, due_date: e.target.value })
            }
          />

          <button className="btn btn-primary w-100">Add Task</button>
        </form>

        {/* FILTER */}
        <div className="filter-buttons">
          {["All", "Work", "Personal", "Study"].map((cat) => (
            <button
              key={cat}
              className={filter === cat ? "active-filter" : ""}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <p>{tasks.length} tasks total</p>

        {/* TASK LIST */}
        <div className="tasks-container">
          {tasks
            .filter((task) => filter === "All" || task.category === filter)
            .map((task) => (
              <div
                key={task.id}
                className={`task-card ${
                  task.completed ? "completed" : ""
                }`}
              >
                {editingTask?.id === task.id ? (
  <>
    <input
      className="form-control mb-2"
      value={editingTask.title}
      onChange={(e) =>
        setEditingTask(prev => ({ ...prev, title: e.target.value }))
      }
    />

    <input
      className="form-control mb-2"
      value={editingTask.description}
      onChange={(e) =>
        setEditingTask(prev => ({ ...prev, description: e.target.value }))
      }
    />

    <select
      className="form-control mb-2"
      value={editingTask.category}
      onChange={(e) =>
        setEditingTask(prev => ({ ...prev, category: e.target.value }))
      }
    >
      <option>Work</option>
      <option>Personal</option>
      <option>Study</option>
    </select>

    <input
      type="datetime-local"
      className="form-control mb-2"
      value={editingTask.due_date || ""}
      onChange={(e) =>
        setEditingTask(prev => ({ ...prev, due_date: e.target.value }))
      }
    />

    <button
      className="btn btn-success btn-sm"
      onClick={async () => {
        await API.put(
          `/tasks/${task.id}`,
          {
            ...editingTask,
            due_date: editingTask.due_date
              ? new Date(editingTask.due_date).toISOString()
              : null,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setEditingTask(null);
        fetchTasks();
      }}
    >
      Save
    </button>

    <button
      className="btn btn-secondary btn-sm"
      onClick={() => setEditingTask(null)}
    >
      Cancel
    </button>
  </>
) : (
                  <>
                    {/* VIEW MODE */}
                    <h5>{task.title}</h5>
                    <span className={`badge ${task.category}`}>
                      {task.category}
                    </span>

                    <p>{task.description}</p>

                    <small>
                      {task.due_date
                        ? new Date(task.due_date).toLocaleString("en-IN")
                        : "No date"}
                    </small>

                    <div className="task-actions">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() =>
                          toggleComplete(task.id, task.completed)
                        }
                      >
                        {task.completed ? "Undo" : "Complete"}
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>

                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => startEdit(task)}
                      >
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* CHAT BUTTON */}
      {!chatOpen && (
        <button
          className="chat-toggle"
          onClick={() => setChatOpen(true)}
        >
          💬
        </button>
      )}

      {/* CHAT */}
      {chatOpen && <Chat onClose={() => setChatOpen(false)} />}
    </>
  );
}

export default Dashboard;