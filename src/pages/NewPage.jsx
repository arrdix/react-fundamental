import React from 'react'
import { useContext, useEffect } from 'react'
import { addNote } from '../utils/api'
import { useNavigate } from 'react-router-dom'
import { useInput } from '../hooks/useInput'
import { LocaleContext } from '../contexts/LocaleContext'
import { useAPI } from '../hooks/useAPI'

import NoteForm from '../components/NoteForm'
import Toast from '../components/Toast'
import FloatingIsland from '../components/FloatingIsland'
import LoadingBar from '../components/LoadingBar'

function NewPages() {
    const [isLoading, consumeAPI, setLoading] = useAPI()
    const [title, onTitleChange] = useInput('')
    const [body, onBodyChange] = useInput('')

    const { locale } = useContext(LocaleContext)

    const navigate = useNavigate()

    async function onSubmit(event) {
        event.preventDefault()

        if (title || body) {
            const { error } = await consumeAPI(() => addNote({ title, body }))

            if (!error) {
                navigate('/')
            }
        }

        navigate('/')
    }

    useEffect(() => {
        setLoading(false)
    }, [])

    if (isLoading) {
        return <LoadingBar />
    }

    return (
        <div className="new-page">
            <Toast
                title={locale === 'id' ? 'Informasi' : 'Information'}
                content={
                    locale === 'id'
                        ? 'Catatan akan otomatis tersimpan ketika anda kembali ke beranda.'
                        : 'The note will be automatically saved whenever you click back button.'
                }
            />
            <NoteForm
                onTitleChange={onTitleChange}
                onBodyChange={onBodyChange}
                onSubmit={onSubmit}
            />
            <FloatingIsland />
        </div>
    )
}

export default NewPages
