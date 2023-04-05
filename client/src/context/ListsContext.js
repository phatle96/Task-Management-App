import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

export const ListsContext = createContext()

export const ListsProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/list/all')
                if (response.status !== 200) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                }
                setData(response.data);
                setError(null);
            } catch (err) {
                setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        }
        getData()
    }, [])

    return (
        <ListsContext.Provider value={{ data }}>
            {children}
        </ListsContext.Provider>
    );
}

export function useLists(){
    const data = useContext(ListsContext);
    console.log(data)
    if (data === undefined){
        throw new Error('Error')
    }
    return data
}