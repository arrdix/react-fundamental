import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { FaSignOutAlt } from 'react-icons/fa'
import { logout } from '../utils/api'

function LogoutButton() {
    const navigate = useNavigate()
    const { setLoggedUser } = useContext(UserContext)

    function onLogout() {
        logout()
        setLoggedUser(null)

        navigate('/login')
    }

    return (
        <button className="island__button logout" onClick={onLogout}>
            <FaSignOutAlt />
        </button>
    )
}

export default LogoutButton
