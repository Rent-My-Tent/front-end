import sanityClient from '../../../sanityClient'

sanityClient.config({
  token: process.env.SANITY_WRITE_TOKEN
})



export default async (req, res) => {
  
  const { owner } = JSON.parse(req.body)
  
  console.log(owner)

  const data = await sanityClient.create({
    _type: 'tent', 
    owner,
    published: false, 
    images: []
  })

  console.log(data)

  res.statusCode = 200 
  res.json({ _id: data._id })
  
}

