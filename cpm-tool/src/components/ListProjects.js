import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listProjects } from "./graphql/queries";

const ListProjects = ({ username }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await API.graphql(
          graphqlOperation(listProjects, {
            filter: {
              owner: {
                eq: { username }, // replace 'username' with the actual username
              },
            },
          })
        );
        setProjects(projectData.data.listProjects.items);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ListProjects;
