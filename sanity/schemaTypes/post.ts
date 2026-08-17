export default {
  name: 'post',
  title: 'Article',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' } },
    { name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }] },
    { name: 'artist', title: 'Artist', type: 'reference', to: [{ type: 'author' }], description: 'Optional: Select if an artist created the graphics for this post.' },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['News', 'Editorial', 'Column', 'Feature', 'Sci-Tech', 'Sports', 'Literary', 'Graphics', 'Updates'] } },
    { name: 'mainImage', title: 'Cover Image', type: 'image' },
    { name: 'excerpt', title: 'Excerpt / Summary', type: 'text', rows: 3, description: 'A short 1-2 sentence summary to hook the reader on the homepage.' },
    { name: 'publishedAt', title: 'Published Date', type: 'datetime' },
    { name: 'body', title: 'Article Body', type: 'array', of: [{ type: 'block' }] }
  ]
}