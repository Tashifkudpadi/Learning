"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "@/store/students";
import { fetchBatches } from "@/store/batches";

interface Student {
  id: number;
  user: { id: number; first_name: string; last_name: string; email: string };
  primary_batch: { id: number; name: string } | null;
  batches: { id: number; name: string }[];
}

const LearnersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { students, error } = useSelector((state: RootState) => state.students);
  const { batches } = useSelector((state: RootState) => state.batches);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [batchId, setBatchId] = useState<number | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchBatches());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const studentData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      batch_id: batchId,
    };
    try {
      if (editingStudent) {
        await dispatch(
          updateStudent({
            studentId: editingStudent.id,
            studentData: {
              first_name: firstName,
              last_name: lastName,
              email,
              batch_id: batchId,
            },
          })
        ).unwrap();
        setEditingStudent(null);
      } else {
        await dispatch(addStudent(studentData)).unwrap();
      }
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setBatchId(null);
    } catch (err) {
      console.error("Failed to save student:", err);
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFirstName(student.user.first_name);
    setLastName(student.user.last_name);
    setEmail(student.user.email);
    setPassword("");
    setBatchId(student.primary_batch ? student.primary_batch.id : null);
  };

  const handleDelete = async (studentId: number) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await dispatch(deleteStudent(studentId)).unwrap();
      } catch (err) {
        console.error("Failed to delete student:", err);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {editingStudent ? "Edit Student" : "Manage Students"}
      </h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white p-6 rounded shadow"
      >
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          {!editingStudent && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Primary Batch
            </label>
            <select
              value={batchId || ""}
              onChange={(e) => setBatchId(Number(e.target.value) || null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select a batch (optional)</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {editingStudent ? "Update Student" : "Add Student"}
          </button>
          {editingStudent && (
            <button
              type="button"
              onClick={() => {
                setEditingStudent(null);
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setBatchId(null);
              }}
              className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Batches
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">{`${student.user.first_name} ${student.user.last_name}`}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.batches.map((b) => b.name).join(", ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(student)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LearnersPage;
