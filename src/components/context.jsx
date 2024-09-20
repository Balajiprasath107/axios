import { createContext, useState } from "react";
import { useEffect } from 'react'
import axios from "axios";

export const DataContext = createContext(null);
const URL = "https://jsonplaceholder.typicode.com/users"
function DataState({ children }) {
    useEffect(() => {
        axios.get(URL).then((response) =>
            setdata(response.data)
        ).catch((error) => console.log(error))
    }
        , [])


    const [data, setdata] = useState([])


    return (
        <DataContext.Provider value={{ data, setdata, URL }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataState