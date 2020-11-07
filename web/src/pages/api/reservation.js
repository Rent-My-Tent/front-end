import sanityClient from '../../../sanityClient'

sanityClient.config({
    token: process.env.SANITY_WRITE_TOKEN,
})

export default (req, res) => {
    const { tentId, email, startDate, endDate } = req.body
    sanityClient
        .patch(tentId)
        .setIfMissing({ reservations: [] })
        .append('reservations', [
            {
                _type: 'reservation',
                email,
                startDate,
                endDate,
            },
        ])
        .commit()
        .then((result) => {
            console.log('submit reservation was succeccfull')
            console.log(result)
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
            res.json({ result: err })
        })
}
