import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import PropTypes from 'prop-types'

import '../styles/delete-button.css'

function DeleteButton(props) {
    const { onDelete, id } = props

    return (
        <button className="delete-button" onClick={() => onDelete(id)}>
            <FaTrashAlt className="delete-button__icon" />
        </button>
    )
}

DeleteButton.propTypes = {
    onDelete: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
}

export default DeleteButton
