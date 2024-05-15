import { useState } from 'react'

function useInput(defaultValue) {
    const [value, setValue] = useState(defaultValue)

    function onChange(event) {
        return setValue(event.target.value)
    }

    return [value, onChange]
}

export { useInput }
