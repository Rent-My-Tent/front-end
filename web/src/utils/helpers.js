import _ from 'lodash'

const helpers = {}
export default helpers

helpers.getSampleName = async (callback) => {
    const response = await fetch(
        'https://frightanic.com/goodies_content/docker-names.php'
    )
    callback(_.startCase(await response.text()))
}
