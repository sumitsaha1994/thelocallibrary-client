import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";

import { Jumbotron } from "react-bootstrap";
import Loader from "../components/Loader";

const Home = (props) => {
    const styles = {
        welcomeMessage: {
            textAlign: "center",
        },
    };

    const { data: itemCounts, isLoading } = useFetch("/catalog");

    useEffect(() => {
        document.title = props.pageTitle;
    }, [props.pageTitle]);

    return (
        <>
            <div className="container">
                <Jumbotron>
                    <h1 style={styles.welcomeMessage} className="display-4">
                        Welcome to The Local Library
                    </h1>
                    <p>Our Library has following items available</p>
                    {!isLoading ? (
                        <ul>
                            <li>
                                <strong>Books: </strong>
                                {itemCounts.bookCount}
                            </li>
                            <li>
                                <strong>Copies: </strong>
                                {itemCounts.bookInstanceCount}
                            </li>
                            <li>
                                <strong>Copies Available: </strong>
                                {itemCounts.bookInstanceAvailableCount}
                            </li>
                            <li>
                                <strong>Authors: </strong>
                                {itemCounts.authorCount}
                            </li>
                            <li>
                                <strong>Genres: </strong>
                                {itemCounts.genreCount}
                            </li>
                        </ul>
                    ) : (
                        <Loader />
                    )}
                </Jumbotron>
            </div>
        </>
    );
};

export default Home;
