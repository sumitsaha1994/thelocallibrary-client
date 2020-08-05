import React, { useEffect, useState, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import API_URL from "../api";

import { Button, Modal } from "react-bootstrap";

import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";

const GenreDetail = (props) => {
    const styles = {
        booksDiv: {
            marginLeft: "20px",
            marginTop: "20px",
        },
    };
    const history = useHistory();
    // get genre id from route params
    const { id } = props.match.params;

    const [showDialog, setShowDialog] = useState(false);

    // fetch genre detail
    const {
        data: { genre, genreBooks, error: fetchError },
        isLoading,
    } = useFetch(`/catalog/genre/${id}`);

    // set page title
    useEffect(() => {
        let pageTitle = props.pageTitle;
        pageTitle = !isLoading && genre ? "Genre: " + genre.name : pageTitle;
        document.title = pageTitle;
    }, [genre, isLoading, props.pageTitle]);

    const handleDialogClose = () => {
        setShowDialog(false);
    };

    const handleDeleteGenre = () => {
        setShowDialog(false);
        fetch(`${API_URL}/catalog/genre/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (!!data.error) {
                    console.log(data.error);
                    throw Error(JSON.stringify(data.error));
                }
                props.setToastState((state) => ({
                    ...state,
                    title: "Genre Delete",
                    msg: "Genre deleted successfully",
                    show: true,
                }));
                history.push("/catalog/genres");
            })
            .catch((error) => {
                console.log(error);
                props.setToastState((state) => ({
                    ...state,
                    title: "Genre Delete",
                    msg: JSON.parse(error.message).genre,
                    show: true,
                }));
            });
    };

    return (
        <div className="container bg-light">
            {!isLoading ? (
                fetchError !== undefined ? (
                    <p>Error fetching data</p>
                ) : (
                    <>
                        <h1>Genre: {genre.name}</h1>
                        <div style={styles.booksDiv}>
                            <h4>Books</h4>
                            {genreBooks.length ? (
                                <dl>
                                    {genreBooks.map((genreBook) => (
                                        <Fragment key={genreBook.id}>
                                            <dt>
                                                <Link
                                                    to={`/catalog/book/${genreBook.id}`}
                                                >
                                                    {genreBook.title}
                                                </Link>
                                            </dt>
                                            <dd>{genreBook.summary}</dd>
                                        </Fragment>
                                    ))}
                                </dl>
                            ) : (
                                <p>No books available for this genre</p>
                            )}
                        </div>
                        <hr />
                        <Button
                            as={Link}
                            to={{
                                pathname: "/catalog/genre/update",
                                genre: genre,
                            }}
                            variant="primary"
                        >
                            Update
                        </Button>{" "}
                        <Button
                            variant="danger"
                            onClick={() => setShowDialog(true)}
                            disabled={!!genreBooks.length}
                            title={
                                genreBooks.length
                                    ? "This genre can't be deleted. Frist delete all the associated books"
                                    : "Delete Genre"
                            }
                        >
                            Delete
                        </Button>
                        <Modal show={showDialog} onHide={handleDialogClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Delete Genre : {genre.name}{" "}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    Are you sure you want to delete this genre?
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="primary"
                                    onClick={handleDeleteGenre}
                                >
                                    Ok
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                )
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default GenreDetail;
