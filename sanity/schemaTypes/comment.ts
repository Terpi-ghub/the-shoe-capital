export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'User Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'text',
    },
    {
      name: 'post',
      title: 'Associated Post',
      type: 'reference',
      to: [{ type: 'post' }],
    },
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: 'Comments must be approved before showing on the live site.',
      initialValue: false,
    },
  ],
};