import sanityClient from "../../../sanityClient";

sanityClient.config({
  token: process.env.SANITY_WRITE_TOKEN
})

export default (req, res) => {
  const { tentId, email } = req.body;
  sanityClient
    .create({
      _type: "reservation",
      tentId,
      email,
    })
    .then((responsse) => {
      res.status = 200;
      res.json(responsse);
    });
};
