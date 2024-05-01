/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask($filter: ModelSubscriptionTaskFilterInput) {
    onCreateTask(filter: $filter) {
      id
      projectID
      relatedTasks
      ES
      EF
      LS
      LF
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask($filter: ModelSubscriptionTaskFilterInput) {
    onUpdateTask(filter: $filter) {
      id
      projectID
      relatedTasks
      ES
      EF
      LS
      LF
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask($filter: ModelSubscriptionTaskFilterInput) {
    onDeleteTask(filter: $filter) {
      id
      projectID
      relatedTasks
      ES
      EF
      LS
      LF
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject(
    $filter: ModelSubscriptionProjectFilterInput
    $owner: String
  ) {
    onCreateProject(filter: $filter, owner: $owner) {
      id
      userId
      description
      title
      Tasks {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject(
    $filter: ModelSubscriptionProjectFilterInput
    $owner: String
  ) {
    onUpdateProject(filter: $filter, owner: $owner) {
      id
      userId
      description
      title
      Tasks {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject(
    $filter: ModelSubscriptionProjectFilterInput
    $owner: String
  ) {
    onDeleteProject(filter: $filter, owner: $owner) {
      id
      userId
      description
      title
      Tasks {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
