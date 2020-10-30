import useSWR from 'swr'


const fetchTent = (identifire) => {
    
}

export default ({identifire}) => {
    const {data, error} = useSWR(identifire, fetchTent)
}