import React from 'react'
import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { archiveNote, deleteNote, getActiveNotes } from '../utils/api'
import { LocaleContext } from '../contexts/LocaleContext'
import { useAPI } from '../hooks/useAPI'

import NoteList from '../components/NoteList'
import Navigation from '../components/Navigation'
import SearchBar from '../components/SearchBar'
import FloatingIsland from '../components/FloatingIsland'
import LoadingBar from '../components/LoadingBar'

function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [isLoading, consumeAPI] = useAPI()
    const [notes, setNotes] = useState([])
    const [keyword, setKeyword] = useState(() => {
        return searchParams.get('keyword') || ''
    })

    const { locale } = useContext(LocaleContext)

    async function onDelete(id) {
        await deleteNote(id)

        const { data } = await consumeAPI(getActiveNotes)
        setNotes(data)
    }

    async function onArchive(id) {
        await archiveNote(id)

        const { data } = await consumeAPI(getActiveNotes)
        setNotes(data)
    }

    function onSearch(event) {
        const keyword = event.target.value

        setKeyword(keyword)
        setSearchParams({ keyword: keyword })
    }

    const renderableNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(keyword.toLowerCase())
    })

    useEffect(() => {
        async function fetchNotes() {
            const { data } = await consumeAPI(getActiveNotes)
            setNotes(data)
        }

        fetchNotes()
    }, [])

    if (isLoading) {
        return <LoadingBar />
    }

    return (
        <div className="home-page">
            <Navigation
                title={locale === 'id' ? 'Catatan' : 'Notes'}
                page="HOME"
            />
            <SearchBar
                onSearch={onSearch}
                searchedKeyword={keyword}
                placeholder={
                    locale === 'id'
                        ? 'Cari catatan aktif...'
                        : 'Search active notes...'
                }
            />
            <NoteList
                notes={renderableNotes}
                onDelete={onDelete}
                onArchive={onArchive}
            />
            <FloatingIsland />
        </div>
    )
}

export default HomePage
