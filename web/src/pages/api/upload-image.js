import sanityClient from "../../../sanityClient";
import formidable from "formidable";
import { createReadStream } from "fs";
import { basename } from "path";
import { reverse } from "lodash";
sanityClient.config({
  token: process.env.SANITY_WRITE_TOKEN,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const callback = async (err, { filename, tentId }, { file }) => {


    const filePath = createReadStream(file.path);
    sanityClient.assets
      .upload("image", filePath, {
        filename: filename,
      })
      .then((imageAsset) => {
        return sanityClient
          .patch(tentId)
          .setIfMissing({ images: [] })
          .append("images", [
            {
              _type: "image",
              url: imageAsset.url,
              asset: {
                _type: "reference",
                _ref: imageAsset._id
              },
            },
          ])
          .commit();
      })
      .then((result) => {
        console.log('result');
        console.log('success')
        res.json(result);
      })
      .catch((err) => {
        console.log('fail')
        console.log(err)
        res.json({result: err})
      });
  };

  const form = new formidable.IncomingForm();
  form.parse(req, callback);

  res.statusCode = 200;
};
