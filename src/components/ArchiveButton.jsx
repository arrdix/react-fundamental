import React from 'react'
import { FaArchive } from 'react-icons/fa'
import PropTypes from 'prop-types'

import '../styles/archive-button.css'

function ArchiveButton(props) {
    const { onArchive, id } = props

    return (
        <button className="archive-button" onClick={() => onArchive(id)}>
            <FaArchive className="archive-button__icon"></FaArchive>
        </button>
    )
}

ArchiveButton.propTypes = {
    onArchive: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
}

export default ArchiveButton
