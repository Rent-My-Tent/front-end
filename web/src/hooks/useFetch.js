// useFetch.js 
import { useState, useEffect } from 'react'
import client from '../../sanityClient'
/**
 * This function will take a query string 
 * And returns the result of that query as a state  
 */

const useFetch = (query) => {
    const [state, setState] = useState(null)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        client.fetch(query)
            .then( response => setState(response) )
            .catch( error => setError(error))
    }, [])

    return [state, error]
}

export default useFetch 