import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '937f2f109dc66935e7f80766fd96b3341f841c7e', queries,  });
export default client;
  