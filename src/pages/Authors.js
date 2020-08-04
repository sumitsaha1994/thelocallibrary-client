import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Authors = (props) => {
    const { data: authors, isLoading } = useFetch("/catalog/authors");

    useEffect(() => {
        document.title = props.pageTitle;
    }, [props.pageTitle]);

    return (
        <div className="container bg-light">
            <h1>Authors</h1>
            {!isLoading ? (
                !authors.error ? (
                    <ul>
                        {authors
                            .sort((a, b) => (a.name > b.name ? 1 : -1))
                            .map((author) => (
                                <li key={author.id}>
                                    <Link to={`/catalog/author/${author.id}`}>
                                        {author.name}
                                    </Link>
                                    {" (" + author.lifespan + ")"}
                                </li>
                            ))}
                    </ul>
                ) : (
                    <p>Error Fetching data, Please contact support.</p>
                )
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default Authors;
