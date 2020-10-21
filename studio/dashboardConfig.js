export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-nextjs-landing-pages'
      }
    },
    {name: 'structure-menu'},
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
                  buildHookId: '5f901c44c5a3932e13a828a0',
                  title: 'Sanity Studio',
                  name: 'sanity-nextjs-landing-pages-studio-59d1kiw8',
                  apiId: 'ef7b7ee4-c9e8-47c7-b8d8-d137875b1a69'
                },
                {
                  buildHookId: '5f901c4428f353382e389a1f',
                  title: 'Landing pages Website',
                  name: 'sanity-nextjs-landing-pages-web-s65n7zx9',
                  apiId: '9e460b04-8e23-4577-a05c-937838bb7b12'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/ariannargesi/sanity-nextjs-landing-pages',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://sanity-nextjs-landing-pages-web-s65n7zx9.netlify.app', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['page']},
      layout: {width: 'medium'}
    }
  ]
}
