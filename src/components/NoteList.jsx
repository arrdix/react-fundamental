import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import NoteItem from './NoteItem'
import '../styles/note-list.css'
import { LocaleContext } from '../contexts/LocaleContext'

function NoteList(props) {
    const { notes, onDelete, onArchive, onUnarchive } = props
    const { locale } = useContext(LocaleContext)

    if (!notes.length) {
        return (
            <div className="note-list">
                <div className="note-list__empty">
                    {locale === 'id' ? (
                        <p>Tidak ada apapun di sini.</p>
                    ) : (
                        <p>Nothing in here.</p>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="note-list">
            {notes.map((note) => (
                <NoteItem
                    note={note}
                    key={note.id}
                    onDelete={onDelete}
                    onArchive={onArchive}
                    onUnarchive={onUnarchive}
                />
            ))}
        </div>
    )
}

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object),
    onDelete: PropTypes.func,
    onArchive: PropTypes.func,
    onUnarchive: PropTypes.func,
}

export default NoteList
