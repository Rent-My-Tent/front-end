import { useState } from 'react'
import Router from 'next/router'
import { Magic } from 'magic-sdk'
import { useForm } from 'react-hook-form'
import { Input } from 'baseui/input'
import { Button } from 'baseui/button'
import { authUser } from '../utils'
const LoginForm = (props) => {
    const [errorMessage, setErrorMessage] = useState('')

    const { handleSubmit, register, errors } = useForm()

    const onSubmit = handleSubmit(async (formData) => {
        if (errorMessage) setErrorMessage('')
        authUser(formData.email, props.onLoginSucess)
    })

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Email</label>
                <Input
                    type="email"
                    name="email"
                    placeholder="hello@example.com"
                    inputRef={register({ required: 'Email is required' })}
                />
                {errors.email && (
                    <div role="alert" className="error">
                        {errors.email.message}
                    </div>
                )}
                {errorMessage && (
                    <div role="alert" className="error">
                        {errorMessage}
                    </div>
                )}
            </div>

            <div className="submit">
                <Button type="submit">Sign up / Log in</Button>
            </div>
        </form>
    )
}

export default LoginForm
