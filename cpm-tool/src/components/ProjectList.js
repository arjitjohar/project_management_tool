import React, { useState } from "react";
import { generateClient } from "aws-amplify/api";
import { Amplify } from "aws-amplify";
import config from "../amplifyconfiguration.json";
import { listProjects } from "../graphql/queries";
import { deleteProject } from "../graphql/mutations";
import CreateNewTask from "./CreateNewTask";
Amplify.configure(config);

export default function ProjectList({ user }) {
  const [projects, setProjects] = useState([]);
  const [showProjectList, setShowProjectList] = useState(false);

  const toggleProjectList = () => {
    setShowProjectList(!showProjectList);
  };

  const fetchProjects = async () => {
    toggleProjectList();

    if (!showProjectList) {
      try {
        const api = generateClient(user);
        const response = await api.graphql({ query: listProjects });
        const projectList = response.data.listProjects.items;

        // Filter projects by user ID
        const userProjects = projectList.filter(
          (project) => project.user_id === user.id
        );

        setProjects(userProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
  };

  const handleDeleteProject = async (projectId) => {
    //delete project
    try {
      const api = generateClient(user);
      await api.graphql({
        query: deleteProject,
        variables: { input: { id: projectId } },
      });
    } catch (error) {
      console.error("Error deleting project:", error);
    }

    //refresh list
    try {
      const api = generateClient(user);
      const response = await api.graphql({ query: listProjects });
      const projectList = response.data.listProjects.items;

      // Filter projects by user ID
      const userProjects = projectList.filter(
        (project) => project.user_id === user.id
      );

      setProjects(userProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchProjects}>
        {showProjectList ? "Hide current projects" : "Show current Projects"}
      </button>
      <ul>
        {showProjectList &&
          projects.map((project) => (
            <li key={project.id}>
              <button onClick={() => handleDeleteProject(project.id)}>
                Delete
              </button>{" "}
              <strong>{project.title}</strong>: {project.description}
            </li>
          ))}
      </ul>

      <CreateNewTask user={user} />
    </div>
  );
}
