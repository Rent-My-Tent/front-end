import { useState, useEffect, useRef } from 'react'
import Router from 'next/router'
import { Grid, Cell } from 'baseui/layout-grid'
import { toaster, ToasterContainer } from 'baseui/toast'
import sanityClient from '../../sanityClient'
import Carousel from 'nuka-carousel'
import { Button } from 'baseui/button'
import { useUser } from '../utils/hooks'
import { newReservation } from '../utils'
import Modal from 'react-modal'
import LoginForm from '../components/login-form'
import DatePicker from 'react-datepicker'
import { addDays, isWithinInterval } from 'date-fns'
import { fetchReservationsData, fetchTentData } from '../utils'
import config from '../ui-config'

Modal.setAppElement('#__next')

export default ({ name, showAsModal }) => {
    const user = useUser()
    const [state, setState] = useState(null)
    const [modal, setModal] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [showDatePicker, setDatePicker] = useState(false)
    const [toastKey, setToastKey] = React.useState(null)
    const [reservations, setReservations] = useState([])

    useEffect(() => {
        fetchTentData(name, (data) => {
            setState(data)
        })
    }, [])

    useEffect(() => {
        if (state) {
            fetchReservationsData(state._id, (data) => {
                setReservations(data)
            })
        }
    }, [state])

    const showToast = () => setToastKey(toaster.positive('reservation was succesfull'))

    const onDatePickerChangeHandler = (date) => {
        setStartDate(date)
        newReservation(
            state._id,
            user.email,
            date.toDateString(),
            addDays(date, 14).toDateString()
        )
            .then((result) => {
                showToast()
            })
            .catch((error) => 'reservation failed')
            .finally(() => {
                toggleDatePicker()
            })
    }

    const toggleDatePicker = () => {
        setDatePicker(!showDatePicker)
    }

    const onReservClickHandler = () => {
        if (!user) setModal(true)
        else {
            toggleDatePicker()
        }
    }

    const filterDate = (date) => {
        let bool = true
        reservations.map((item) => {
            const startDate = new Date(item.startDate)
            const endDate = new Date(item.endDate)
            const value = isWithinInterval(date, {
                start: startDate,
                end: endDate,
            })
            if (value) {
                bool = false
            }
        })

        return bool
    }
  
    return (
        <div>
            {!showAsModal && <pre>{JSON.stringify(state, null, 2)}</pre>}
            {state && showAsModal && (
                <Grid>
                    <Cell span={6}>
                        <Carousel>
                            {state.images.map((item) => {
                                return <img key={item.url} src={item.url} />
                            })}
                        </Carousel>
                    </Cell>
                    <Cell span={6}>
                        <h1> {state.name}</h1>
                        <h2>{state.identifire}</h2>
                        <p>{state.description}</p>
                        <span>4/5</span>
                        <br />
                        <br />
                        <Button onClick={onReservClickHandler}>
                            Reserve it right now
                        </Button>
                        <br />
                        {showDatePicker && (
                            <DatePicker
                                selected={startDate}
                                onChange={onDatePickerChangeHandler}
                                monthsShown={2}
                                filterDate={filterDate}
                                minDate={new Date()}
                                maxDate={addDays(new Date(), 70)}
                                open
                            />
                        )}
                    </Cell>
                    <Modal isOpen={modal} style={config.customModalStyles}>
                        <LoginForm
                            onLoginSucess={() => {
                                setModal(false)
                            }}
                        />
                    </Modal>
                </Grid>
            )}
             <ToasterContainer autoHideDuration={2000}/>
        </div>
    )
}
