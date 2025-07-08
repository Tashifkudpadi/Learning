// components/BatchesPage.tsx
"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchBatches,
  addBatch,
  updateBatch,
  deleteBatch,
  clearBatchError,
} from "@/store/batches";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function BatchesPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { batches, loading, error } = useAppSelector((state) => state.batches);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    start_date: "",
    end_date: "",
    num_learners: 0,
  });

  useEffect(() => {
    dispatch(fetchBatches());
  }, [dispatch]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "num_learners" ? +value : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(clearBatchError());
    if (editId) {
      await dispatch(updateBatch({ batchId: editId, batchData: formData }));
    } else {
      await dispatch(addBatch(formData));
    }
    setFormData({ name: "", start_date: "", end_date: "", num_learners: 0 });
    setEditId(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (batch: any) => {
    setFormData(batch);
    setEditId(batch.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete this batch?")) {
      await dispatch(deleteBatch(id));
    }
  };

  const handleBatchClick = (id: number) => {
    router.push(`/batches/${id}`); // route to student list page
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Batches</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Batch</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editId ? "Edit" : "Add"} Batch</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div>
                <Label htmlFor="name">Batch Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex gap-4">
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    name="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    name="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="num_learners">Number of Learners</Label>
                <Input
                  id="num_learners"
                  name="num_learners"
                  type="number"
                  value={formData.num_learners}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editId ? "Update" : "Add"} Batch
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Learners</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {batches.map((batch, index) => (
              <TableRow key={batch.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleBatchClick(batch.id)}
                  >
                    {batch.name}
                  </button>
                </TableCell>
                <TableCell>{batch.start_date}</TableCell>
                <TableCell>{batch.end_date}</TableCell>
                <TableCell>{batch.num_learners}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(batch)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(batch.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
