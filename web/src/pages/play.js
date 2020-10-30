import {useState, useEffect} from 'react'
// import sanityClient from '../../sanityClient' 

export default ({name}) => {

    const {state, setState} = useState()

    useEffect(() => {
        setState('ajibe')
    })

    return (
        <div>
            {state}
        </div>
    )
}