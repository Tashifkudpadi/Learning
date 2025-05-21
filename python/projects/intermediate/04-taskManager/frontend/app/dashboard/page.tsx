"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TaskForm from "../../components/TaskForm";
import TaskList from "../../components/TaskList";
import Navbar from "../../components/Navbar";

export default function DashboardPage() {
  const router = useRouter();
  const [refreshTasks, setRefreshTasks] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);

  const handleTaskCreated = () => {
    setRefreshTasks(!refreshTasks);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (!token) {
      router.push("/login");
      return;
    }
    setUsername(storedUsername);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center bg-gray-100">
        <div className="w-full max-w-4xl py-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Welcome, {username?.toUpperCase() || "User"}!
            </h2>
          </div>
          <TaskForm onTaskCreated={handleTaskCreated} />
          <TaskList refresh={refreshTasks} />
        </div>
      </main>
    </>
  );
}
