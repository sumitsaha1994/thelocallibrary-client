import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";

import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Books = (props) => {
    const { data: books, isLoading } = useFetch("/catalog/books");

    useEffect(() => {
        document.title = props.pageTitle;
    }, [props.pageTitle]);

    return (
        <div className="container bg-light">
            <h1>Books</h1>
            {!isLoading ? (
                books
                    .sort((a, b) => (a.title > b.title ? 1 : -1))
                    .map((book, index) => (
                        <p key={index}>
                            <Link to={`/catalog/book/${book.id}`}>
                                <strong>{book.title}</strong>
                            </Link>
                            <br />
                            <i>-{book.author.name}</i>
                        </p>
                    ))
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default Books;
