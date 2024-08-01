import CreateTask from "@/components/Dashboard/CreateTask";
import React from "react";

const page: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
      <CreateTask />
    </div>
  );
};

export default page;
