import axios from 'axios'
import { Magic } from 'magic-sdk'
import sanityClient from '../../sanityClient'

export const createTent = async (owner) => {
    const result = await fetch('api/new-tent', {
        method: 'POST',
        body: JSON.stringify({ owner }),
    })
    const response = await result.json()
    return response._id
}

export const updateTent = async (tentId, data) => {
    const result = await fetch('api/update-tent', {
        method: 'POST',
        body: JSON.stringify({
            _id: tentId,
            data,
        }),
    })
    return await result.json()
    
}

export const uploadImage = async (tentId, filename, file) => {
    const bodyFormData = new FormData()

    bodyFormData.append('filename', filename)
    bodyFormData.append('tentId', tentId)
    bodyFormData.append('file', file)

    const url = '/api/upload-image'
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
    }
    return await axios.post(url, bodyFormData, config)
}

export const removeArrayItem = (arr, index) => {
    arr.splice(index, 1)
    return arr
}

export const authUser = async (email, onConfirm) => {
    try {
        const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)
        const didToken = await magic.auth.loginWithMagicLink({
            email,
            showUI: false 
        })
        console.log('send')
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + didToken,
            },
            body: JSON.stringify(email),
        })
        if (res.status === 200) {
            console.log('success')
            onConfirm()
        } else {
            console.log('fail')
        }
    } catch (error) {
        console.log('error')
        console.log(error)
    }
}

export const newReservation = async (tentId, email, startDate, endDate) => {
    const body = {
        tentId,
        email,
        startDate,
        endDate,
    }
    const url = '/api/reservation'

    return await axios.post(url, body)
}

export async function fetchTentData(name, callback) {
    const query = `*[ _type == 'tent' && published == true]`
    const result = await sanityClient.fetch(query)
    console.log('fetchTentDate()')
    console.log(result)
    callback(result[0])
}

export async function fetchReservationsData(id, callback) {
    const query = `*[ _type == 'tent' && _id == '${id}']{reservations}`
    const result = await sanityClient.fetch(query)
    callback(result[0].reservations)
}
