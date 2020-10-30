import { useState, useEffect } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import sanityClient from '../../sanityClient'
import {Grid, Cell} from 'baseui/layout-grid'
import Modal from 'react-modal'
import { Button } from 'baseui/button'
import Tent from '../components/Tent'
Modal.setAppElement('#__next')


const customStyles = {
    content : {
      width: "1200px",
      height: '600px',
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

export default () => {
    const [tents, setTents] = useState([])

    const router = useRouter()

    


    useEffect(() => {
        const query = `*[ _type == 'tent' && published == true ]` 
        sanityClient.fetch(query)
        .then(response => {
            console.log(response)
            setTents(response)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])  

    return (
        <>
            <Grid>
                {tents.map( item => {
                    return (
                        <div span={3} key={item.name} className='tent-card'>
                            <Link href={`/?name=${item.name}`} 
                            as={`/tent/${item.name}`}>
                                <a>
                                    <img src={item.images[0].url + '?h=300'}/>
                                    <h3>{item.name}</h3>
                                    <Button>View</Button>
                                </a>
                            </Link>
                        </div>
                    )
                })}
            </Grid>
            <Modal isOpen={!!router.query.name}
                onRequestClose={() => router.push('/')}
                style={customStyles}
            >
                <Tent name={router.query.name} modal/>
            </Modal>
        </>
    )
}