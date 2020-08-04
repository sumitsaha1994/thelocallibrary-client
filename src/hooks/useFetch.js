import { useState, useEffect } from "react";

const useFetch = (url, options) => {
    const [state, setState] = useState({ data: {}, isLoading: true });
    useEffect(() => {
        setState({ data: {}, isLoading: true });
        fetch(url, options)
            .then((res) => {
                if (!res.ok) {
                    throw Error("Error fetching data");
                }
                return res;
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("form fetch");
                console.log(data);
                setState({ data: data, isLoading: false });
            })
            .catch((err) => {
                setState({ data: { error: err }, isLoading: false });
            });
    }, [url, options]);

    return state;
};

export default useFetch;
