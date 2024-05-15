import { useState } from 'react'

function useAPI() {
    const [isLoading, setLoading] = useState(true)

    async function consumeAPI(handler) {
        try {
            setLoading(true)
            const { error, data } = await handler()

            return { error, data }
        } catch (err) {
            throw new Error(err)
        } finally {
            setLoading(false)
        }
    }

    return [isLoading, consumeAPI, setLoading]
}

export { useAPI }
