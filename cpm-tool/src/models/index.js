// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Task, Project } = initSchema(schema);

export {
  Task,
  Project
};