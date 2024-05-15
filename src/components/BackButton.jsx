import React from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import '../styles/back-button.css'

function BackButton(props) {
    const { submitAbility } = props

    if (submitAbility) {
        return (
            <button className="back-button" type="submit">
                <FaAngleLeft />
            </button>
        )
    }

    return (
        <Link to="/">
            <button className="back-button" type="button">
                <FaAngleLeft />
            </button>
        </Link>
    )
}

BackButton.propTypes = {
    submitAbility: PropTypes.bool,
}

export default BackButton
