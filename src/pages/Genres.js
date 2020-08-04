import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";

const Genres = (props) => {
    const { data: genres, isLoading } = useFetch("/catalog/genres");

    useEffect(() => {
        console.log("Genres rendered");
        document.title = props.pageTitle;
    }, [props.pageTitle]);

    return (
        <div className="container bg-light">
            <h1>Genres</h1>
            <ul>
                {!isLoading ? (
                    genres.map((genre) => (
                        <li key={genre.id}>
                            <Link to={`/catalog/genre/${genre.id}`}>
                                {genre.name}
                            </Link>
                        </li>
                    ))
                ) : (
                    <Loader />
                )}
            </ul>
        </div>
    );
};

export default Genres;
