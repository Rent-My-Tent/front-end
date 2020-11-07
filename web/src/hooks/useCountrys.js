import { useState, useEffect } from 'react'
import axios from 'axios'

const useCountries = () => {
    const [state, setState] = useState([])
    const [error, setError] = useState(null)
    useEffect(() => {
        axios
            .get('https://api.first.org/data/v1/countries?limit=251')
            .then(({ data }) => {
                const result = data.data
                const arr = []
                for (let key in result) {
                    arr.push({ label: result[key].country })
                }
                setState(arr)
            })
            .catch((error) => console.log(error))
    }, [])

    return [state, error]
}

export default useCountries
