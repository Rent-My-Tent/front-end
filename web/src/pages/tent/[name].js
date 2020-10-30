import {useRouter} from 'next/router'
import Tent from '../../components/Tent'

export default () => {
    const router = useRouter()
    const {name} = router.query 
    return (
        <div>
            <Tent name={name} />
        </div>
    )
}