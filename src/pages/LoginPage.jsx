import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, putAccessToken, getUserLogged } from '../utils/api'
import { UserContext } from '../contexts/UserContext'
import { useAPI } from '../hooks/useAPI'
import { LocaleContext } from '../contexts/LocaleContext'

import '../styles/auth-page.css'
import FloatingIsland from '../components/FloatingIsland'
import AuthForm from '../components/AuthForm'

function LoginPage() {
    const [isLoading, consumeAPI, setLoading] = useAPI()
    const navigate = useNavigate()

    const { setLoggedUser } = useContext(UserContext)
    const { locale } = useContext(LocaleContext)

    async function loginHandler(credential) {
        const { data } = await consumeAPI(() => login(credential))
        putAccessToken(data.accessToken)

        const { data: user } = await consumeAPI(getUserLogged)
        setLoggedUser(user)

        navigate('/')
    }

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <div className="auth-page">
            <div className="auth-form__head">
                {locale === 'id' ? <h1>Halo Lagi!</h1> : <h1>Hello Again!</h1>}
                {locale === 'id' ? (
                    <p>Kami senang melihatmu kembali.</p>
                ) : (
                    <p>We are happy to see you back here.</p>
                )}
            </div>
            <AuthForm
                isLoading={isLoading}
                authType="Login"
                loginHandler={loginHandler}
            />
            <p className="auth-form__foot">
                {locale === 'id'
                    ? 'Belum punya akun?'
                    : "Don't have an account?"}

                <Link className="auth-form__link" to="/register">
                    {locale === 'id' ? 'Daftar sekarang' : 'Register now'}
                </Link>
            </p>
            <FloatingIsland />
        </div>
    )
}

export default LoginPage
