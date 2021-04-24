
import {useState, useCallback} from 'react'

export const useHttp = () => {

    const[loading, setLoding] = useState(false)

    const[error, setError] = useState(null)

    const request = useCallback( async (url, method = 'GET', body = null, headers = {}) => {

        setLoding(true)

        try {
            if(body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url, { method, body, headers })
            const data = await response.json()
            if(!response.ok) {
                throw new Error(data.message || 'Somthing is wrong...')
            }

            setLoding(false)

            return data
        } catch(e){
            setLoding(false)
            setError(e.message)
            throw e
        }

    }, [])

    const clearErrors = useCallback( () => setError(null), [])

    return { loading , request, error, clearErrors }
}