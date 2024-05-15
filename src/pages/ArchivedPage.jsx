import React from 'react'
import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { unarchiveNote, deleteNote, getArchivedNotes } from '../utils/api'
import { LocaleContext } from '../contexts/LocaleContext'
import { useAPI } from '../hooks/useAPI'

import NoteList from '../components/NoteList'
import Navigation from '../components/Navigation'
import SearchBar from '../components/SearchBar'
import FloatingIsland from '../components/FloatingIsland'
import LoadingBar from '../components/LoadingBar'

function archivedPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [isLoading, consumeAPI] = useAPI()
    const [archivedNotes, setArchivedNotes] = useState([])
    const [keyword, setKeyword] = useState(() => {
        return searchParams.get('keyword') || ''
    })

    const { locale } = useContext(LocaleContext)

    async function onDelete(id) {
        await deleteNote(id)

        const { data } = await consumeAPI(getArchivedNotes)
        setArchivedNotes(data)
    }

    async function onUnarchive(id) {
        await unarchiveNote(id)

        const { data } = await consumeAPI(getArchivedNotes)
        setArchivedNotes(data)
    }

    function onSearch(event) {
        const keyword = event.target.value

        setKeyword(keyword)
        setSearchParams(keyword)
    }

    const renderableNotes = archivedNotes.filter((note) => {
        return note.title.toLowerCase().includes(keyword.toLowerCase())
    })

    useEffect(() => {
        async function fetchArchivedNotes() {
            const { data } = await consumeAPI(getArchivedNotes)
            setArchivedNotes(data)
        }

        fetchArchivedNotes()
    }, [])

    if (isLoading) {
        return <LoadingBar />
    }

    return (
        <div className="archive-page">
            <Navigation
                title={locale === 'id' ? 'Diarsipkan' : 'Archived'}
                page="ARCHIVED"
            />
            <SearchBar
                onSearch={onSearch}
                searchedKeyword={keyword}
                placeholder={
                    locale === 'id'
                        ? 'Cari catatan yang diarsipkan...'
                        : 'Search archived notes...'
                }
            />
            <NoteList
                notes={renderableNotes}
                onDelete={onDelete}
                onUnarchive={onUnarchive}
            />
            <FloatingIsland />
        </div>
    )
}

export default archivedPage
