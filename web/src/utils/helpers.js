import _ from "lodash";

const helpers = {};
export default helpers;

helpers.getSampleName = async () => {
  const response = await fetch(
    "https://frightanic.com/goodies_content/docker-names.php"
  );
  return _.startCase(await response.text());
};
