"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  CheckCircle,
  Lock,
  FileText,
  Play,
  BookOpen,
} from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "@/utils/axios";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type Lesson = {
  id: number | string;
  title: string;
  duration: string;
  type: "video" | "quiz" | "assignment" | string;
  completed: boolean;
  locked: boolean;
};

function getTypeIcon(type: string) {
  switch (type) {
    case "video":
      return <Play className="h-4 w-4" />;
    case "quiz":
      return <FileText className="h-4 w-4" />;
    case "assignment":
      return <BookOpen className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case "video":
      return "text-blue-600";
    case "quiz":
      return "text-green-600";
    case "assignment":
      return "text-purple-600";
    default:
      return "text-slate-600";
  }
}

export default function ContentsTab({
  lessons,
  courseId,
}: {
  lessons: Lesson[];
  courseId: string | number;
}) {
  const [uploading, setUploading] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [showForm, setShowForm] = React.useState(false);
  const [error, setError] = React.useState<string>("");
  const [subjects, setSubjects] = React.useState<
    Array<{ id: number; name: string }>
  >([]);
  const [topics, setTopics] = React.useState<
    Array<{ id: number; name: string }>
  >([]);
  const [subjectId, setSubjectId] = React.useState<number | "">("");
  const [topicId, setTopicId] = React.useState<number | "">("");
  const [openSubjectDialog, setOpenSubjectDialog] = React.useState(false);
  const [newSubject, setNewSubject] = React.useState<{
    name: string;
    code: string;
  }>({ name: "", code: "" });
  const [creatingSubject, setCreatingSubject] = React.useState(false);
  const [openTopicDialog, setOpenTopicDialog] = React.useState(false);
  const [newTopic, setNewTopic] = React.useState<{
    name: string;
    description?: string;
  }>({ name: "", description: "" });
  const [creatingTopic, setCreatingTopic] = React.useState(false);

  React.useEffect(() => {
    // Load subjects for dropdown
    axiosInstance
      .get("/subjects")
      .then((res) => {
        const list = (res.data || []).map((s: any) => ({
          id: s.id,
          name: s.name,
        }));
        setSubjects(list);
      })
      .catch(() => {
        // swallow for now
      });
  }, []);

  const fetchTopicsBySubject = async (sid: number) => {
    try {
      const res = await axiosInstance.get(`/topics/by-subject/${sid}`);
      const list = (res.data || []).map((t: any) => ({
        id: t.id,
        name: t.name,
      }));
      setTopics(list);
    } catch (e) {
      setTopics([]);
    }
  };

  const refreshSubjects = async () => {
    const res = await axiosInstance.get("/subjects");
    const list = (res.data || []).map((s: any) => ({ id: s.id, name: s.name }));
    setSubjects(list);
  };

  const handleCreateSubject = async () => {
    if (!newSubject.name || !newSubject.code) return;
    try {
      setCreatingSubject(true);
      const res = await axiosInstance.post("/subjects", {
        name: newSubject.name,
        code: newSubject.code,
        faculty_ids: [],
      });
      // Add to list and select
      await refreshSubjects();
      setSubjectId(res.data.id);
      setOpenSubjectDialog(false);
      setNewSubject({ name: "", code: "" });
      // Load topics for this new subject (likely empty)
      await fetchTopicsBySubject(res.data.id);
      setTopicId("");
    } catch (err) {
      setError("Failed to create subject. Please try again.");
    } finally {
      setCreatingSubject(false);
    }
  };

  const handleCreateTopic = async () => {
    if (!subjectId) {
      setError("Please select a subject before adding a topic.");
      return;
    }
    if (!newTopic.name) return;
    try {
      setCreatingTopic(true);
      const res = await axiosInstance.post("/topics", {
        name: newTopic.name,
        description: newTopic.description || "",
        subject_id: Number(subjectId),
      });
      await fetchTopicsBySubject(Number(subjectId));
      setTopicId(res.data.id);
      setOpenTopicDialog(false);
      setNewTopic({ name: "", description: "" });
    } catch (err) {
      setError("Failed to create topic. Please try again.");
    } finally {
      setCreatingTopic(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as any;
    setError("");

    const title = form.title.value;
    const description = form.description.value || "";
    const yt = (form.youtube?.value || form.youtube_link?.value || "").trim();

    if (!subjectId || !topicId) {
      setError("Please select a subject and a topic.");
      return;
    }

    // Decide endpoint: file upload vs YouTube-only
    const hasFile = !!file;
    const hasYouTube = !!yt;
    if (!hasFile && !hasYouTube) {
      setError("Please provide either a file or a YouTube link.");
      return;
    }

    try {
      setUploading(true);
      if (hasFile) {
        const formData = new FormData();
        formData.append("course_id", String(courseId));
        formData.append("title", title);
        formData.append("description", description);
        formData.append("subject_id", String(subjectId));
        formData.append("topic_id", String(topicId));
        // Even if provided, backend /upload doesn't persist youtube_link, so omit here.
        formData.append("file", file as File);
        await axiosInstance.post("/course-contents/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else if (hasYouTube) {
        await axiosInstance.post("/course-contents/youtube", {
          course_id: Number(courseId),
          title,
          description,
          youtube_link: yt,
          subject_id: Number(subjectId),
          topic_id: Number(topicId),
        });
      }
      form.reset();
      setFile(null);
      setShowForm(false);
      setSubjectId("");
      setTopicId("");
      // TODO: trigger refresh of contents list
    } catch (err) {
      setError("Failed to add content. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Add Content Toggle */}
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={() => setShowForm((s) => !s)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          {showForm ? "Close" : "Add Content"}
        </Button>
      </div>

      {/* Upload Content Form (collapsible) */}
      <div
        className={`transition-all duration-300 ease-out transform origin-top ${
          showForm
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 h-0 overflow-hidden"
        }`}
      >
        <Card className="bg-white/80 backdrop-blur-xl border border-blue-200 shadow-2xl">
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Content Title *</Label>
                  <Input id="title" name="title" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">Upload File *</Label>
                  <Input
                    id="file"
                    type="file"
                    accept="*/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <select
                    id="subject"
                    value={subjectId as any}
                    onChange={async (e) => {
                      const sid = e.target.value
                        ? Number(e.target.value)
                        : ("" as any);
                      setSubjectId(sid);
                      setTopicId("");
                      if (sid) await fetchTopicsBySubject(sid);
                      else setTopics([]);
                    }}
                    className="border rounded-md px-2 py-2 w-full"
                    required
                  >
                    <option value="">Select subject</option>
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <button
                      type="button"
                      className="underline hover:text-slate-900"
                      onClick={() => setOpenSubjectDialog(true)}
                    >
                      + New subject
                    </button>
                    <span className="text-slate-400">|</span>
                    <button
                      type="button"
                      className="underline hover:text-slate-900"
                      disabled={!subjectId}
                      onClick={() => setOpenTopicDialog(true)}
                    >
                      + New topic for subject
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic *</Label>
                  <select
                    id="topic"
                    value={topicId as any}
                    onChange={(e) =>
                      setTopicId(
                        e.target.value ? Number(e.target.value) : ("" as any)
                      )
                    }
                    className="border rounded-md px-2 py-2 w-full"
                    required
                    disabled={!subjectId}
                  >
                    <option value="">
                      {subjectId ? "Select topic" : "Select subject first"}
                    </option>
                    {topics.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                  {/* Dialogs */}
                </div>
              </div>
              {/* Subject Dialog */}
              <Dialog
                open={openSubjectDialog}
                onOpenChange={setOpenSubjectDialog}
              >
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create new subject</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="dlg-subject-name" className="text-xs">
                          Name
                        </Label>
                        <Input
                          id="dlg-subject-name"
                          value={newSubject.name}
                          onChange={(e) =>
                            setNewSubject((s) => ({
                              ...s,
                              name: e.target.value,
                            }))
                          }
                          placeholder="e.g. Mathematics"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="dlg-subject-code" className="text-xs">
                          Code
                        </Label>
                        <Input
                          id="dlg-subject-code"
                          value={newSubject.code}
                          onChange={(e) =>
                            setNewSubject((s) => ({
                              ...s,
                              code: e.target.value,
                            }))
                          }
                          placeholder="e.g. MATH101"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setOpenSubjectDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      disabled={creatingSubject}
                      onClick={handleCreateSubject}
                    >
                      {creatingSubject ? "Creating..." : "Create Subject"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Topic Dialog */}
              <Dialog open={openTopicDialog} onOpenChange={setOpenTopicDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create new topic</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="dlg-topic-name" className="text-xs">
                          Name
                        </Label>
                        <Input
                          id="dlg-topic-name"
                          value={newTopic.name}
                          onChange={(e) =>
                            setNewTopic((t) => ({ ...t, name: e.target.value }))
                          }
                          placeholder="e.g. Algebra"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="dlg-topic-desc" className="text-xs">
                          Description
                        </Label>
                        <Input
                          id="dlg-topic-desc"
                          value={newTopic.description}
                          onChange={(e) =>
                            setNewTopic((t) => ({
                              ...t,
                              description: e.target.value,
                            }))
                          }
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setOpenTopicDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      disabled={creatingTopic || !subjectId}
                      onClick={handleCreateTopic}
                    >
                      {creatingTopic ? "Creating..." : "Create Topic"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Optional short description..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube Link</Label>
                <Input id="youtube" name="youtube" placeholder="YouTube link" />
              </div>
              {error && <div className="text-sm text-red-600">{error}</div>}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={uploading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {uploading ? "Uploading..." : "Add Content"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900">Course Content</h3>
      </div>
      <div className="space-y-2">
        {lessons.map((lesson) => (
          <Card
            key={lesson.id}
            className={`bg-white/30 backdrop-blur-sm border border-white/30 hover:bg-white/40 transition-all duration-200 ${
              lesson.locked ? "opacity-60" : "hover:scale-[1.02]"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg bg-white/50 ${getTypeColor(
                      lesson.type
                    )} ${lesson.completed ? "bg-green-100" : ""}`}
                  >
                    {lesson.completed ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : lesson.locked ? (
                      <Lock className="h-4 w-4 text-slate-400" />
                    ) : (
                      getTypeIcon(lesson.type)
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {lesson.title}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="h-3 w-3" />
                      <span>{lesson.duration}</span>
                      <Badge variant="outline" className="text-xs">
                        {lesson.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  disabled={lesson.locked}
                  className={
                    lesson.completed
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  }
                >
                  {lesson.completed
                    ? "Review"
                    : lesson.locked
                    ? "Locked"
                    : "Start"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
