"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  fetchSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
} from "@/store/subjects";
import { fetchFaculty } from "@/store/faculties";

interface Subject {
  id: number;
  name: string;
  code: string;
  faculty: {
    id: number;
    user: { first_name: string; last_name: string };
  } | null;
}

const SubjectsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { subjects, error } = useSelector((state: RootState) => state.subjects);
  const { faculty } = useSelector((state: RootState) => state.faculty);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [facultyId, setFacultyId] = useState<number | null>(null);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  useEffect(() => {
    dispatch(fetchSubjects());
    dispatch(fetchFaculty());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const subjectData = { name, code, faculty_id: facultyId };
    try {
      if (editingSubject) {
        await dispatch(
          updateSubject({
            subjectId: editingSubject.id,
            subjectData: { name, code, faculty_id: facultyId },
          })
        ).unwrap();
        setEditingSubject(null);
      } else {
        await dispatch(addSubject(subjectData)).unwrap();
      }
      setName("");
      setCode("");
      setFacultyId(null);
    } catch (err) {
      console.error("Failed to save subject:", err);
    }
  };

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject);
    setName(subject.name);
    setCode(subject.code);
    setFacultyId(subject.faculty ? subject.faculty.id : null);
  };

  const handleDelete = async (subjectId: number) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      try {
        await dispatch(deleteSubject(subjectId)).unwrap();
      } catch (err) {
        console.error("Failed to delete subject:", err);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {editingSubject ? "Edit Subject" : "Manage Subjects"}
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
              Subject Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Faculty
            </label>
            <select
              value={facultyId || ""}
              onChange={(e) => setFacultyId(Number(e.target.value) || null)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">No Faculty</option>
              {faculty.map((f) => (
                <option
                  key={f.id}
                  value={f.id}
                >{`${f.user.first_name} ${f.user.last_name}`}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {editingSubject ? "Update Subject" : "Add Subject"}
          </button>
          {editingSubject && (
            <button
              type="button"
              onClick={() => {
                setEditingSubject(null);
                setName("");
                setCode("");
                setFacultyId(null);
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
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Faculty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subjects.map((subject) => (
              <tr key={subject.id}>
                <td className="px-6 py-4 whitespace-nowrap">{subject.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{subject.code}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {subject.faculty
                    ? `${subject.faculty.user.first_name} ${subject.faculty.user.last_name}`
                    : "None"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(subject)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(subject.id)}
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

export default SubjectsPage;
