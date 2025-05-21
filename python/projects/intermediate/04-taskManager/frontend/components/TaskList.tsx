"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import TaskEditForm from "./TaskEditForm";
import API_URL from "@/config";
import Image from "next/image";

const Pen = "/pen.png";
const Trash = "/trash.png";

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  due_date?: string;
  created_at: string;
}

interface TaskListProps {
  refresh: boolean;
}

export default function TaskList({ refresh }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const fetchTasks = async () => {
    setError(null);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL.BASE_API}/tasks/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL.BASE_API}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (tasks.length === 0) return <p>No tasks available.</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2
        className="text-xl text-center font-semibold mb-4"
        style={{ color: "#1f4959" }}
      >
        Your Tasks
      </h2>
      <ul className="space-y-4">
        {tasks.map((task, index) => (
          <li key={task.id} className="border-b pb-2">
            {editingTaskId === task.id ? (
              <TaskEditForm
                task={task}
                onTaskUpdated={() => {
                  setEditingTaskId(null);
                  fetchTasks();
                }}
                onCancel={() => setEditingTaskId(null)}
              />
            ) : (
              <div>
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-black">
                      {index + 1 + ". " + task.title}
                    </h3>
                    {task.description && (
                      <p className="text-gray-600">{task.description}</p>
                    )}
                  </div>
                  <div className="px-3">
                    <p className="text-sm text-gray-500">
                      Status: {task.status}
                    </p>
                    {task.due_date && (
                      <p className="text-sm text-gray-500">
                        Due: {task.due_date}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      Created: {new Date(task.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <div
                      onClick={() => setEditingTaskId(task.id)}
                      className="px-3 py-1 text-white rounded-md hover:cursor-pointer"
                    >
                      <Image src={Pen} alt="Edit" width={30} height={30} />
                    </div>
                    <div
                      onClick={() => handleDelete(task.id)}
                      className="px-3 py-1 text-white rounded-md hover:cursor-pointer"
                    >
                      <Image src={Trash} alt="Delete" width={30} height={30} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
