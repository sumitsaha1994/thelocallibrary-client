import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const BookInstances = (props) => {
    const { data: bookInstances, isLoading } = useFetch(
        "/catalog/bookinstances"
    );

    useEffect(() => {
        document.title = props.pageTitle;
    }, [props.pageTitle]);

    return (
        <div className="container bg-light">
            {!isLoading ? (
                <div>
                    <h1>Book Insatnces</h1>
                    <ul>
                        {bookInstances
                            .sort((a, b) =>
                                a.book.title > b.book.title ? 1 : -1
                            )
                            .map((bookInstance) => (
                                <li key={bookInstance.id}>
                                    <Link
                                        to={`/catalog/bookinstance/${bookInstance.id}`}
                                    >
                                        {bookInstance.book.title}
                                    </Link>
                                    &nbsp;-&nbsp;
                                    {bookInstance.status.toLowerCase() ===
                                    "available" ? (
                                        <span className="text-success">
                                            {bookInstance.status}
                                        </span>
                                    ) : bookInstance.status.toLowerCase() ===
                                      "maintenance" ? (
                                        <span className="text-danger">
                                            {bookInstance.status}
                                        </span>
                                    ) : (
                                        <span className="text-warning">
                                            {bookInstance.status}
                                        </span>
                                    )}
                                    &nbsp;
                                    {bookInstance.status.toLowerCase() !==
                                        "available" && (
                                        <span>
                                            (Due {bookInstance.due_back})
                                        </span>
                                    )}
                                </li>
                            ))}
                    </ul>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default BookInstances;
