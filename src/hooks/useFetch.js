import { useState, useEffect } from "react";
import API_URL from "../api";

const useFetch = (url, options) => {
    const [state, setState] = useState({ data: {}, isLoading: true });
    useEffect(() => {
        setState({ data: {}, isLoading: true });
        fetch(API_URL + url, options)
            .then((res) => {
                if (!res.ok) {
                    throw Error("Error fetching data");
                }
                return res;
            })
            .then((res) => res.json())
            .then((data) => {
                setState({ data: data, isLoading: false });
            })
            .catch((err) => {
                setState({ data: { error: err }, isLoading: false });
            });
    }, [url, options]);

    return state;
};

export default useFetch;
