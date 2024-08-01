"use client";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetClose,
} from "@/components/ui/sheet";
import Cookies from "js-cookie";
import { BASE_URL } from "@/utils/url";

const CreateTask: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("not-started");
  const [isFavorite, setIsFavorite] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Assuming the token is stored in a cookie named 'authToken'
    const token = Cookies.get("authToken");
    if (token) {
      // Fetch user ID using the token
      fetchUserId(token);
    }
  }, []);

  const fetchUserId = async (token: string) => {
    const response = await fetch(`${BASE_URL}/users/user-by-id/${userId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setUserId(data.userId);
    } else {
      console.error("Failed to fetch user ID");
    }
  };

  const handleSubmit = async () => {
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    const response = await fetch(`/api/users/${userId}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("authToken")}`,
      },
      body: JSON.stringify({
        title,
        description,
        priority,
        deadline,
        status,
        isFavorite,
      }),
    });
    if (response.ok) {
      console.log("Task created successfully");
    } else {
      console.log("Failed to create task");
    }
  };

  return (
    <Sheet>
      <SheetTrigger className="fixed bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full">
        Open Form
      </SheetTrigger>
      <SheetContent side="right" className="p-6 w-96 bg-white shadow-lg">
        <SheetHeader>
          <h2 className="text-2xl font-bold mb-4">Create Task</h2>
        </SheetHeader>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            placeholder="Deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isFavorite}
              onChange={(e) => setIsFavorite(e.target.checked)}
              className="mr-2"
            />
            Favorite
          </label>
        </div>
        <div className="flex justify-end mt-4">
          <SheetClose
            className="bg-red-500 text-white p-2 rounded mr-2"
            onClick={handleSubmit}
          >
            Submit
          </SheetClose>
          <SheetClose className="bg-gray-500 text-white p-2 rounded">
            Close
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateTask;
