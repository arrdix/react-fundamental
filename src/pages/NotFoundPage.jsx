import React from 'react'
import { FaRegSadTear } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import '../styles/not-found.css'

function NotFoundPage() {
    return (
        <div className="not-found">
            <h1>404 Not Found</h1>
            <FaRegSadTear className="not-found__icon" />
            <Link to="/" className="not-found__link">
                <p>Go Back</p>
            </Link>
        </div>
    )
}

export default NotFoundPage
