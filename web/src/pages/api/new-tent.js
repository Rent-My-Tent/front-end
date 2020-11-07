import sanityClient from '../../../sanityClient'

sanityClient.config({
    token: process.env.SANITY_WRITE_TOKEN,
})

export default async (req, res) => {
    const { owner } = JSON.parse(req.body)

    const data = await sanityClient.create({
        _type: 'tent',
        owner,
        published: false,
        images: [],
        reservations: []
    })

    console.log(data)

    res.statusCode = 200
    res.json({ _id: data._id })
}
