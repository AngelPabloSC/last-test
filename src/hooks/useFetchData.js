import { useEffect, useState } from "react"
import { useFetchDataPromise } from "./useFetchDataPromise"


export const useFetchData = ({ endPoint, method = "POST", additionalData }) => {

    const [fetchData, setFeachData] = useState({ data: {}, message: "", code: "", loading: true })

    const { getFechData } = useFetchDataPromise()
    useEffect(() => {
        const getData = async () => {
            setFeachData({ data: {}, message: "", code: "", loading: true })
            const response = await getFechData({ endPoint, method, additionalData })
            const { code, data, message } = response
            setFeachData({ code, data, message, loading: false })

        }
        getData()
        return () => setFeachData({ data: {}, message: "", code: "", loading: true })
    }, [])


    return {
        fetchData

    }


}
