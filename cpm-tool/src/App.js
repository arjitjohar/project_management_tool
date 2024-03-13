import { Amplify } from "aws-amplify";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import config from "./amplifyconfiguration.json";
import { ProjectCreateForm } from "./ui-components";
import ListProjects from "./components/ListProjects";

Amplify.configure(config);

function App({ signOut, user }) {
  return (
    <>
      <h1>Hello {user.username}</h1>

      <ProjectCreateForm
        onSubmit={(fields) => {
          // Example function to trim all string inputs
          const updatedFields = {};
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

      <ListProjects username={user.username} />

      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);
