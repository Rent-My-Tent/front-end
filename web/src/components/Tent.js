import {useState, useEffect} from 'react'
import { Grid, Cell } from 'baseui/layout-grid'
import sanityClient from '../../sanityClient'
import Carousel from 'nuka-carousel';
import { Button } from 'baseui/button'
import {useUser} from '../utils/hooks'
import Router from 'next/router'
import {newReservation} from '../utils'
import Modal from 'react-modal'
import LoginForm from '../components/login-form'
Modal.setAppElement('#__next')

const customStyles = {
    content : {
      width: "300px",
      height: '400px',
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


export default ({name, showAsModal}) => {

    const user = useUser();
    const [state, setState] = useState(null)
    const [modal, setModal] = useState(false)

    useEffect(() => {
        const query = `*[ _type == 'tent' && published == true ]`
        sanityClient.fetch(query).then(result => {
            setState(result[0])
        })

    }, [])

    const onClickHandler = () => {
        if(!user) setModal(true)
        else {
            newReservation(state._id, user.email)
                .then(response => {
                    // 
                    Router.push('/reservations')
                })
                .catch(error => console.log(error) )
        }
    }

    return (
        <div>
            { !showAsModal && <pre>{JSON.stringify(state, null, 2)}</pre>}
            { state && showAsModal&&
                <Grid>
                    <Cell span={6}>
                    <Carousel>
                        {state.images.map(item => {
                            return (
                                    <img key={item.url} src={item.url}/>
                            )
                        })}
                    </Carousel>
                    </Cell>
                    <Cell span={6}>
                        <h1>Name: {state.name}</h1>
                        <h2>Identifier: {state.identifire}</h2>
                        <p>Description:{state.description}</p>
                        <span>Rate: 4/5</span>
                        <br/>
                        <br/>
                        <Button onClick={onClickHandler} >Reserve it right now</Button>
                    </Cell>
                    <Modal
                        isOpen={modal}
                        style={customStyles}
                    >
                    <LoginForm onLoginSucess={() => {
                        setModal(false)
                    }} />
                    </Modal>
                </Grid>
            }
        </div>
    )
}
