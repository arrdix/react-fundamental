import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { LocaleContext } from '../contexts/LocaleContext'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../utils/api'
import { useAPI } from '../hooks/useAPI'

import '../styles/auth-page.css'
import FloatingIsland from '../components/FloatingIsland'
import AuthForm from '../components/AuthForm'

function RegisterPage() {
    const [isLoading, consumeAPI, setLoading] = useAPI()
    const navigate = useNavigate()

    const { locale } = useContext(LocaleContext)

    async function registerHandler(credential) {
        const { error } = await consumeAPI(() => register(credential))

        if (!error) {
            navigate('/login')
        }
    }

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <div className="auth-page">
            <div className="auth-form__head">
                {locale === 'id' ? <h1>Buat Akun</h1> : <h1>Create Account</h1>}

                {locale === 'id' ? (
                    <p>Selalu ada yang pertama untuk segalanya, kan?</p>
                ) : (
                    <p>There's a first time for everything, right?</p>
                )}
            </div>
            <AuthForm
                authType="Register"
                registerHandler={registerHandler}
                isLoading={isLoading}
            />
            <p className="auth-form__foot">
                {locale === 'id'
                    ? 'Sudah punya akun?'
                    : 'Already have an account?'}
                <Link className="auth-form__link" to="/login">
                    {locale === 'id' ? 'Masuk' : 'Log in'}
                </Link>
            </p>
            <FloatingIsland />
        </div>
    )
}

export default RegisterPage
