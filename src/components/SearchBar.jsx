import React from 'react'
import PropTypes from 'prop-types'

import '../styles/search-bar.css'

function SearchBar(props) {
    const { onSearch, searchedKeyword, placeholder } = props

    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-bar__input"
                name="search"
                placeholder={placeholder}
                value={searchedKeyword}
                onChange={onSearch}
            />
        </div>
    )
}

SearchBar.propTypes = {
    onSearch: PropTypes.func,
    searchedKeyword: PropTypes.string,
    placeholder: PropTypes.string,
}

export default SearchBar
