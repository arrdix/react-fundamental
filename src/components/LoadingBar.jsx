import React from 'react'
import PropTypes from 'prop-types'
import { FaCircle } from 'react-icons/fa'

import '../styles/loading-bar.css'

function LoadingBar(props) {
    const { small } = props

    if (small) {
        return (
            <div className="loading-bar">
                <FaCircle className="loading-bar__ball small" />
                <FaCircle className="loading-bar__ball small" />
                <FaCircle className="loading-bar__ball small" />
            </div>
        )
    }

    return (
        <div className="loading-bar">
            <div className="loading-bar__ball">.</div>
            <div className="loading-bar__ball">.</div>
            <div className="loading-bar__ball">.</div>
        </div>
    )
}

LoadingBar.propTypes = {
    small: PropTypes.bool,
}

export default LoadingBar
