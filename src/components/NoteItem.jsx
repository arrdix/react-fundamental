import React from 'react'
import { showFormattedDate } from '../utils'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import DeleteButton from './DeleteButton'
import ArchiveButton from './ArchiveButton'
import UnarchiveButton from './UnarchiveButton'
import '../styles/note-item.css'

function NoteItem(props) {
    const { note, onDelete, onArchive, onUnarchive } = props

    return (
        <div className="note-item">
            <Link to={`/notes/${note.id}`} className="note-item__link">
                <h4 className="note-item__title">{note.title}</h4>
            </Link>
            <p className="note-item__content">{note.body}</p>
            <div className="button-group">
                <p className="note-item__date">
                    {showFormattedDate(note.createdAt)}
                </p>
                {note.archived ? (
                    <UnarchiveButton onUnarchive={onUnarchive} id={note.id} />
                ) : (
                    <ArchiveButton onArchive={onArchive} id={note.id} />
                )}
                <DeleteButton onDelete={onDelete} id={note.id} />
            </div>
        </div>
    )
}

NoteItem.propTypes = {
    note: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchive: PropTypes.func,
    onUnarchive: PropTypes.func,
}

export default NoteItem
