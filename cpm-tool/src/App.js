import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import config from "./amplifyconfiguration.json";
import { ProjectCreateForm } from "./ui-components";
import { useState } from "react";

Amplify.configure(config);

function App({ signOut, user }) {
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [projects, setProjects] = useState([]); // Add this line

  const handleSubmit = (fields) => {
    const updatedFields = {};
    Object.keys(fields).forEach((key) => {
      if (typeof fields[key] === "string") {
        updatedFields[key] = fields[key].trim();
      } else {
        updatedFields[key] = fields[key];
      }
    });
    setProjects([...projects, updatedFields]); // Add this line
    setShowForm(false);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000); // Hide confirmation after 3 seconds
    return updatedFields;
  };

  return (
    <>
      <h1>Hello {user.username}</h1>

      {showConfirmation && <p>You have successfully added a project!</p>}
      {showForm ? (
        <div
          style={{ border: "1px solid black", padding: "10px", margin: "10px" }}
        >
          <ProjectCreateForm onSubmit={handleSubmit} />
        </div>
      ) : (
        <button onClick={() => setShowForm(true)}>Create a new project</button>
      )}

      {/* Add this block */}
      <div>
        <h2>Your Projects:</h2>
        <ul>
          {projects.map((project, index) => (
            <li key={index}>{project.title}</li>
          ))}
        </ul>
      </div>

      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);
