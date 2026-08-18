import comment from './comment'; // Adjust the path if it's inside a folder
import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import author from './author'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, comment]
}