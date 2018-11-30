import { useState, useEffect, useCallback } from 'react'

const printQuery = window.matchMedia('print')
let lastQueryValue = printQuery.matches
printQuery.addListener(() => {
    lastQueryValue = printQuery.matches
})

function usePrintMediaQuery() {
    const [queryValue, setQueryValue] = useState(lastQueryValue)
    const cb = useCallback(() => {
        setQueryValue(printQuery.matches)
    }, [])

    useEffect(() => {
        printQuery.addListener(cb)

        return () => printQuery.removeListener(cb)
    })

    return queryValue
}

export default usePrintMediaQuery
