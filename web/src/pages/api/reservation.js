import sanityClient from "../../../sanityClient";

sanityClient.config({
  token: process.env.SANITY_WRITE_TOKEN
})

export default (req, res) => {
  const { tentId, email, startDate, endDate } = req.body;
  sanityClient
    .create({
      _type: "reservation",
      tentId,
      email,
      startDate,
      endDate
    })
    .then((responsse) => {
      res.status = 200;
      res.json(responsse);
    });
};
