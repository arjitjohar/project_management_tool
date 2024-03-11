import React from "react";
import { generateClient } from "aws-amplify/api";
import { createProject } from "./graphql/mutations";

const client = generateClient();

const newProject = await client.graphql({
  query: createProject,
  variables: {
    input: {
      title: "Lorem ipsum dolor sit amet",
      description: "Lorem ipsum dolor sit amet",
    },
  },
});

function ShowBlogs() {
  return <div> {newProject} </div>;
}

export default ShowBlogs;
