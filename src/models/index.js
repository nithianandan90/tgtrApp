// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Item, Deal, User } = initSchema(schema);

export {
  Item,
  Deal,
  User
};