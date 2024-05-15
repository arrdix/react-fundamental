import React from 'react'
import PropTypes from 'prop-types'

import NavLinks from './NavLinks'
import '../styles/navigation.css'

function Navigation(props) {
    const { title, page } = props

    return (
        <div className="navigation">
            <div className="navigation-item__title">{title}</div>
            <NavLinks page={page} />
        </div>
    )
}

Navigation.propTypes = {
    title: PropTypes.string,
    page: PropTypes.string,
}

export default Navigation
