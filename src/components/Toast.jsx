import React from 'react'
import PropTypes from 'prop-types'

import '../styles/toast.css'

function Toast(props) {
    const { title, content } = props

    return (
        <div className="toast">
            <div className="toast-item">
                <h4 className="toast-item__head">{title}</h4>
                <p className="toast-item__content">{content}</p>
            </div>
        </div>
    )
}

Toast.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
}

export default Toast
