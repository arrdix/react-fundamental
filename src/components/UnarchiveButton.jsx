import React from 'react'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import PropTypes from 'prop-types'

import '../styles/unarchive-button.css'

function UnarchiveButton(props) {
    const { onUnarchive, id } = props

    return (
        <button className="unarchive-button" onClick={() => onUnarchive(id)}>
            <FaArrowRotateLeft className="unarchive-button__icon" />
        </button>
    )
}

UnarchiveButton.propTypes = {
    onUnarchive: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
}

export default UnarchiveButton
