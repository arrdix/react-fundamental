import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getNote } from '../utils/api'
import { useAPI } from '../hooks/useAPI'

import NoteForm from '../components/NoteForm'
import FloatingIsland from '../components/FloatingIsland'
import LoadingBar from '../components/LoadingBar'

function DetailPage() {
    const { id } = useParams()
    const [isLoading, consumeAPI] = useAPI()
    const [requestedNote, setRequestedNote] = useState({})

    useEffect(() => {
        async function fetchNote() {
            const { data } = await consumeAPI(() => getNote(id))
            setRequestedNote(data)
        }

        fetchNote()
    }, [id])

    if (isLoading) {
        return <LoadingBar />
    }

    return (
        <div className="detail-page">
            <NoteForm note={requestedNote} readOnly={true} />
            <FloatingIsland />
        </div>
    )
}

export default DetailPage
