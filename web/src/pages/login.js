import Layout from '../components/layout'
import LoginForm from '../components/login-form'
import { useUser } from '../utils/hooks'

const Login = () => {
    useUser({ redirectTo: '/', redirectIfFound: true })

    return (
        <Layout>
            <div className="login">
                <LoginForm />
            </div>
        </Layout>
    )
}

export default Login
