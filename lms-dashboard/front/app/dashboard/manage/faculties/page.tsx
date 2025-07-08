"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  fetchFaculty,
  addFaculty,
  updateFaculty,
  deleteFaculty,
} from "@/store/faculties";
import { fetchSubjects } from "@/store/subjects";

interface Faculty {
  id: number;
  user: { id: number; first_name: string; last_name: string; email: string };
  subjects: { id: number; name: string; code: string }[];
}

const FacultiesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { faculty, error } = useSelector((state: RootState) => state.faculty);
  const { subjects } = useSelector((state: RootState) => state.subjects);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subjectIds, setSubjectIds] = useState<number[]>([]);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);

  useEffect(() => {
    dispatch(fetchFaculty());
    dispatch(fetchSubjects());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const facultyData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      subject_ids: subjectIds,
    };
    try {
      if (editingFaculty) {
        await dispatch(
          updateFaculty({
            facultyId: editingFaculty.id,
            facultyData: {
              first_name: firstName,
              last_name: lastName,
              email,
              subject_ids: subjectIds,
            },
          })
        ).unwrap();
        setEditingFaculty(null);
      } else {
        await dispatch(addFaculty(facultyData)).unwrap();
      }
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setSubjectIds([]);
    } catch (err) {
      console.error("Failed to save faculty:", err);
    }
  };

  const handleEdit = (faculty: Faculty) => {
    setEditingFaculty(faculty);
    setFirstName(faculty.user.first_name);
    setLastName(faculty.user.last_name);
    setEmail(faculty.user.email);
    setPassword("");
    setSubjectIds(faculty.subjects.map((s) => s.id));
  };

  const handleDelete = async (facultyId: number) => {
    if (window.confirm("Are you sure you want to delete this faculty?")) {
      try {
        await dispatch(deleteFaculty(facultyId)).unwrap();
      } catch (err) {
        console.error("Failed to delete faculty:", err);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {editingFaculty ? "Edit Faculty" : "Manage Faculty"}
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
          {!editingFaculty && (
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
              Subjects
            </label>
            <select
              multiple
              value={subjectIds.map(String)}
              onChange={(e) =>
                setSubjectIds(
                  Array.from(e.target.selectedOptions, (option) =>
                    Number(option.value)
                  )
                )
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {subjects.map((subject) => (
                <option
                  key={subject.id}
                  value={subject.id}
                >{`${subject.name} (${subject.code})`}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {editingFaculty ? "Update Faculty" : "Add Faculty"}
          </button>
          {editingFaculty && (
            <button
              type="button"
              onClick={() => {
                setEditingFaculty(null);
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setSubjectIds([]);
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
                Subjects
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {faculty.map((f) => (
              <tr key={f.id}>
                <td className="px-6 py-4 whitespace-nowrap">{`${f.user.first_name} ${f.user.last_name}`}</td>
                <td className="px-6 py-4 whitespace-nowrap">{f.user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {f.subjects.map((s) => s.name).join(", ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(f)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(f.id)}
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

export default FacultiesPage;
