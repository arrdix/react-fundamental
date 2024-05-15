import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { FaSun, FaMoon, FaLanguage } from 'react-icons/fa'
import { UserContext } from '../contexts/UserContext'
import { ThemeContext } from '../contexts/ThemeContext'
import { LocaleContext } from '../contexts/LocaleContext'

import LogoutButton from './LogoutButton'
import '../styles/floating-island.css'

function FloatingIsland() {
    const { loggedUser } = useContext(UserContext)
    const { setLocale } = useContext(LocaleContext)
    const { theme, setTheme } = useContext(ThemeContext)

    function themeHandler() {
        setTheme((oldTheme) => {
            const selectedTheme = oldTheme === 'dark' ? 'light' : 'dark'
            localStorage.setItem('theme', selectedTheme)

            return selectedTheme
        })
    }

    function localeHandler() {
        setLocale((oldLocale) => {
            const selectedLang = oldLocale === 'en' ? 'id' : 'en'
            localStorage.setItem('lang', selectedLang)

            return selectedLang
        })
    }

    return (
        <div className="floating-island">
            <div className="island">
                <button className="island__button" onClick={themeHandler}>
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </button>
                <button className="island__button" onClick={localeHandler}>
                    <FaLanguage />
                </button>
                {loggedUser && <LogoutButton />}
            </div>
        </div>
    )
}

export default FloatingIsland
