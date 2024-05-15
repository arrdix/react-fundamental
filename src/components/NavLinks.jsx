import React from 'react'
import PropTypes from 'prop-types'
import { FaFolderPlus, FaArchive } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import BackButton from './BackButton'
import '../styles/nav-links.css'

function NavLinks(props) {
    const { page } = props

    switch (page) {
        case 'HOME':
            return (
                <div className="nav-links">
                    <Link to="/notes/archived" className="nav-link">
                        <FaArchive className="nav-link__icon" />
                    </Link>
                    <Link to="/notes/new" className="nav-link">
                        <FaFolderPlus className="nav-link__icon" />
                    </Link>
                </div>
            )
        case 'ARCHIVED':
            return (
                <div className="nav-links">
                    <BackButton />
                </div>
            )
    }
}

NavLinks.propTypes = {
    page: PropTypes.string,
}

export default NavLinks
