import sanityClient from '../../../sanityClient'

sanityClient.config({
    token: process.env.SANITY_WRITE_TOKEN,
})

export default async (req, res) => {
    const { _id, data } = JSON.parse(req.body)

    sanityClient
        .patch(_id)
        .set({ ...data })
        .commit()
        .then((updatedTent) => {
            console.log('the tent is updated!')
            res.json(updatedTent)
        })
        .catch((error) => {
            console.log('Oh no, the update failed: ', error.message)
        })
    res.statusCode = 200
}
