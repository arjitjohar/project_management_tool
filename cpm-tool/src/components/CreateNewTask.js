import React from "react";
import { useState } from "react";
import { TaskCreateForm } from "../ui-components";

export default function CreateNewTask({ user, project }) {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      {
        <button onClick={toggleForm}>
          {showForm ? "hide task form" : "create new task"}
        </button>
      }
      {showForm ? (
        <TaskCreateForm
          onSubmit={(fields) => {
            // Example function to trim all string inputs
            const updatedFields = { ...fields, userId: user.username };

            Object.keys(fields).forEach((key) => {
              if (typeof fields[key] === "string") {
                updatedFields[key] = fields[key].trim();
              } else {
                updatedFields[key] = fields[key];
              }
            });
            return updatedFields;
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
}
