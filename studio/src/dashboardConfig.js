export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5f90674335340c0c8fa5e1ad',
                  title: 'Sanity Studio',
                  name: 'sanity-gatsby-blog-studio-693oi28h',
                  apiId: 'bd3ffd35-f3af-4c92-be19-14b3b6472f3e'
                },
                {
                  buildHookId: '5f906743d6b53901000891ab',
                  title: 'Blog Website',
                  name: 'sanity-gatsby-blog-web-2wwtie76',
                  apiId: '0d1d6071-2a8b-4cbb-9b89-c781beadcb31'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/ariannargesi/sanity-gatsby-blog',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://sanity-gatsby-blog-web-2wwtie76.netlify.app', category: 'apps' }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Recent blog posts', order: '_createdAt desc', types: ['post'] },
      layout: { width: 'medium' }
    }
  ]
}
