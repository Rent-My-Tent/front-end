import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: '6ckoff5s',
    dataset: 'production',
    useCdn: false
})