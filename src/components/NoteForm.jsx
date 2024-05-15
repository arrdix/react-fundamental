import React from 'react'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import { LocaleContext } from '../contexts/LocaleContext'

import BackButton from './BackButton'
import '../styles/note-form.css'

function NoteForm(props) {
    const { note, readOnly, onTitleChange, onBodyChange, onSubmit } = props
    const { locale } = useContext(LocaleContext)

    return (
        <form className="note-form" onSubmit={onSubmit}>
            <div className="note-form__head">
                <BackButton submitAbility={onSubmit && true} />
                <input
                    className="note-form__title"
                    type="text"
                    name="title"
                    placeholder={locale === 'id' ? 'Pengingat!' : 'Reminder!'}
                    value={readOnly && note.title}
                    disabled={readOnly && true}
                    onChange={onTitleChange}
                    autoFocus
                />
            </div>
            <textarea
                className="note-form__content"
                name="content"
                id=""
                placeholder={
                    locale === 'id'
                        ? 'Meeting bersama Raden Supono Mangku Wanito Limo Tanpo Busono Sedoyo di Gunung Semeru pada jam 4 pagi.'
                        : 'Meeting with Mr. Supono Mangku Wanito Limo Tanpo Busono Sedoyo on Semeru Mountain at 4 in the morning.'
                }
                defaultValue={readOnly && note.body}
                disabled={readOnly && true}
                onChange={onBodyChange}
            ></textarea>
        </form>
    )
}

NoteForm.propTypes = {
    note: PropTypes.object,
    readOnly: PropTypes.bool,
    onTitleChange: PropTypes.func,
    onBodyChange: PropTypes.func,
    onSubmit: PropTypes.func,
}

export default NoteForm
