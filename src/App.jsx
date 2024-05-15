import React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { LocaleProvider } from './contexts/LocaleContext'
import { getAccessToken, getUserLogged } from './utils/api'

import HomePage from './pages/HomePage'
import NewPage from './pages/NewPage'
import DetailPage from './pages/DetailPage'
import ArchivedPage from './pages/ArchivedPage'
import NotFoundPage from './pages/NotFoundPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App() {
    const [initializing, setInitializing] = useState(true)
    const [loggedUser, setLoggedUser] = useState(null)
    const [theme, setTheme] = useState('dark')
    const [locale, setLocale] = useState('en')

    const localeContextValue = useMemo(() => {
        return {
            locale,
            setLocale,
        }
    }, [locale])

    const themeContextValue = useMemo(() => {
        return {
            theme,
            setTheme,
        }
    }, [theme])

    const userContextValue = useMemo(() => {
        return {
            loggedUser,
            setLoggedUser,
        }
    }, [loggedUser])

    useEffect(() => {
        setTheme(() => localStorage.getItem('theme'))
        setLocale(() => localStorage.getItem('lang'))
    }, [])

    useEffect(() => {
        document.documentElement.setAttribute('theme', theme)
    }, [theme])

    useEffect(() => {
        async function checkAuth() {
            const token = getAccessToken()

            if (token) {
                const { data: user } = await getUserLogged()
                setLoggedUser(user)
                setInitializing(false)
            }

            setInitializing(false)
        }

        checkAuth()
    }, [])

    if (initializing) {
        return null
    }

    if (loggedUser) {
        return (
            <UserProvider value={userContextValue}>
                <ThemeProvider value={themeContextValue}>
                    <LocaleProvider value={localeContextValue}>
                        <div className="app-container">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route
                                    path="/notes/new"
                                    element={<NewPage />}
                                />
                                <Route
                                    path="/notes/:id"
                                    element={<DetailPage />}
                                />
                                <Route
                                    path="/notes/archived"
                                    element={<ArchivedPage />}
                                />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </div>
                    </LocaleProvider>
                </ThemeProvider>
            </UserProvider>
        )
    }

    return (
        <UserProvider value={userContextValue}>
            <ThemeProvider value={themeContextValue}>
                <LocaleProvider value={localeContextValue}>
                    <div className="app-container">
                        <Routes>
                            <Route path="/" element={<LoginPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/register"
                                element={<RegisterPage />}
                            />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </div>
                </LocaleProvider>
            </ThemeProvider>
        </UserProvider>
    )
}

export default App
