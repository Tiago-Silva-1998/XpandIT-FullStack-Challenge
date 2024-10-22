import {
    useState,
    useEffect,
} from 'react'

export function useFetch({ uri, options }) {
    const [content, setContent] = useState(undefined)

    useEffect(() =>{
        let canceled = false

        async function doFetch(){
            const response = await fetch(uri, options)
            if(canceled) return
            const body = await response.json()
            if (!body.status) setContent(body)
        }
        doFetch()
        return ()=> { canceled=true }
    }, [uri])
    return content
}