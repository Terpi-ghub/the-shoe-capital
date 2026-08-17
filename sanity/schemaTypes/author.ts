export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'name' } },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'bio', title: 'Bio', type: 'array', of: [{ type: 'block' }] },
    { name: 'position', title: 'Position', type: 'string', description: 'e.g. Editor-in-Chief. Leave blank if standard writer.' },
    { name: 'categories', title: 'Assigned Categories', type: 'array', of: [{ type: 'string' }], options: { list: ['News', 'Editorial', 'Column', 'Feature', 'Sci-Tech', 'Sports', 'Literary', 'Graphics', 'Updates'] } }
  ]
}