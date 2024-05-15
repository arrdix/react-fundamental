import React from 'react'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { LocaleContext } from '../contexts/LocaleContext'
import { useState, useEffect } from 'react'
import { useInput } from '../hooks/useInput'

import '../styles/auth-form.css'
import LoadingBar from './LoadingBar'

function AuthForm(props) {
    const { authType, registerHandler, loginHandler, isLoading } = props
    const { locale } = useContext(LocaleContext)

    const [isSubmitDisabled, setSubmit] = useState(true)
    const [name, onNameChange] = useInput('')
    const [email, onEmailChange] = useInput('')
    const [password, onPasswordChange] = useInput('')

    useEffect(() => {
        inputValidation()
    }, [name, email, password])

    function inputValidation() {
        if (name && !name.length) {
            return setSubmit(true)
        }

        if (!email.length || password.length < 6) {
            return setSubmit(true)
        }

        setSubmit(false)
    }

    function onSubmit(event) {
        event.preventDefault()

        if (authType === 'Register') {
            return registerHandler({
                name,
                email,
                password,
            })
        }

        return loginHandler({
            email,
            password,
        })
    }

    return (
        <form className="auth-form" onSubmit={onSubmit}>
            {authType === 'Register' ? (
                <input
                    type="text"
                    placeholder={locale === 'id' ? 'Nama' : 'Name'}
                    value={name}
                    onChange={onNameChange}
                />
            ) : null}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={onEmailChange}
            />
            <input
                type="password"
                placeholder={locale === 'id' ? 'Kata sandi' : 'Password'}
                value={password}
                onChange={onPasswordChange}
            />
            <button disabled={isSubmitDisabled}>
                {isLoading ? <LoadingBar small={true} /> : authType}
            </button>
        </form>
    )
}

AuthForm.propTypes = {
    authType: PropTypes.string.isRequired,
    registerHandler: PropTypes.func,
    loginHandler: PropTypes.func,
    isLoading: PropTypes.bool,
}

export default AuthForm
