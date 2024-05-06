import { ProjectCreateForm } from "../ui-components";

import React from "react";
import { useState } from "react";

export default function ProjectForm({ user }) {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      {
        <button onClick={toggleForm}>
          {showForm ? "hide project form" : "create new project"}
        </button>
      }
      {showForm ? (
        <ProjectCreateForm
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
