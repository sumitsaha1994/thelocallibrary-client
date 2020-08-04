import React, { useEffect, Fragment, useState } from "react";
import useFetch from "../hooks/useFetch";
import API_URL from "../api";

import { Link, useHistory } from "react-router-dom";
import Loader from "../components/Loader";
import { Button, Modal } from "react-bootstrap";

const Bookdetail = (props) => {
    const styles = {
        copiesDiv: {
            marginLeft: "20px",
            marginTop: "20px",
        },
    };

    const history = useHistory();

    const [showDialog, setShowDialog] = useState(false);

    const { id } = props.match.params;

    const {
        data: { book, bookInstances, error },
        isLoading,
    } = useFetch(`/catalog/book/${id}`);

    useEffect(() => {
        let pageTitle = props.pageTitle;
        pageTitle = book ? book.title : pageTitle;
        document.title = pageTitle;
    }, [book, props.pageTitle]);

    const handleDialogClose = () => {
        setShowDialog(false);
    };

    const handleDeleteBook = () => {
        setShowDialog(false);
        fetch(`${API_URL}/catalog/book/delete`, {
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
                    title: "Book Delete",
                    msg: "Book has been deleted successfully",
                    show: true,
                }));
                history.push("/catalog/books");
            })
            .catch((error) => {
                console.log(error);
                props.setToastState((state) => ({
                    ...state,
                    title: "Book Delete",
                    msg: JSON.parse(error.message).book,
                    show: true,
                }));
            });
    };

    return (
        <div className="container bg-light">
            {!isLoading ? (
                !error ? (
                    <>
                        <h1>{book.title}</h1>
                        <p>
                            <strong>Author: </strong>
                            <Link to={`/catalog/author/${book.author.id}`}>
                                {book.author.name}
                            </Link>
                        </p>
                        <p>
                            <strong>Summary: </strong>
                            {book.summary}
                        </p>
                        <p>
                            <strong>ISBN: </strong>
                            {book.isbn}
                        </p>
                        <p>
                            <strong>Genre: </strong>
                            {book.genre
                                .map((g) => (
                                    <Link
                                        key={g.id}
                                        to={`/catalog/genre/${g.id}`}
                                    >
                                        {g.name}
                                    </Link>
                                ))
                                .reduce((accum, curr) => (
                                    <>
                                        {accum}, {curr}
                                    </>
                                ))}
                        </p>
                        <div style={styles.copiesDiv}>
                            <h4>Copies</h4>
                            {bookInstances.length ? (
                                bookInstances.map((bookInstance) => {
                                    return (
                                        <Fragment key={bookInstance.id}>
                                            <hr />
                                            {bookInstance.status.toLowerCase() ===
                                            "available" ? (
                                                <p className="text-success">
                                                    {bookInstance.status}
                                                </p>
                                            ) : bookInstance.status.toLowerCase() ===
                                              "maintenance" ? (
                                                <p className="text-danger">
                                                    {bookInstance.status}
                                                </p>
                                            ) : (
                                                <p className="text-warning">
                                                    {bookInstance.status}
                                                </p>
                                            )}
                                            <p>
                                                <strong>Imprint: </strong>
                                                {bookInstance.imprint}
                                            </p>
                                            <p>
                                                <strong>Id: </strong>
                                                <Link
                                                    to={`/catalog/bookinstance/${bookInstance.id}`}
                                                >
                                                    {bookInstance.id}
                                                </Link>
                                            </p>
                                        </Fragment>
                                    );
                                })
                            ) : (
                                <p>No copies available yet</p>
                            )}
                        </div>
                        <hr />
                        <Button
                            as={Link}
                            to={{
                                pathname: "/catalog/book/update",
                                book: book,
                            }}
                            variant="primary"
                        >
                            Update
                        </Button>{" "}
                        <Button
                            variant="danger"
                            onClick={() => setShowDialog(true)}
                            disabled={!!bookInstances.length}
                            title={
                                bookInstances.length
                                    ? "This Book can't be deleted. Frist delete all the copies of this book"
                                    : "Delete Book"
                            }
                        >
                            Delete
                        </Button>
                        <Modal show={showDialog} onHide={handleDialogClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Delete Book : {book.title}{" "}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    Are you sure you want to delete this book?
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="primary"
                                    onClick={handleDeleteBook}
                                >
                                    Ok
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                ) : (
                    <p>Error fetching dtaa, please contact support</p>
                )
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default Bookdetail;
