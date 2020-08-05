import React, { useEffect, Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import API_URL from "../api";

import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import { Button, Modal } from "react-bootstrap";

const AuthorDetail = (props) => {
    const styles = {
        booksDiv: {
            marginLeft: "20px",
            marginTop: "20px",
        },
    };

    const history = useHistory();

    const { id } = props.match.params;

    const [showDialog, setShowDialog] = useState(false);

    const {
        data: { author, author_books: authorBooks, error },
        isLoading,
    } = useFetch(`/catalog/author/${id}`);

    useEffect(() => {
        let pageTitle = props.pageTitle;
        pageTitle = author ? author.name : pageTitle;
        document.title = pageTitle;
    }, [author, props.pageTitle]);

    const handleDialogClose = () => {
        setShowDialog(false);
    };

    const handleDeleteAuthor = () => {
        setShowDialog(false);
        fetch(`${API_URL}/catalog/author/delete`, {
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
                    title: "Author Delete",
                    msg: "Author has been deleted successfully",
                    show: true,
                }));
                history.push("/catalog/authors");
            })
            .catch((error) => {
                console.log(error);
                props.setToastState((state) => ({
                    ...state,
                    title: "Author Delete",
                    msg: JSON.parse(error.message).author,
                    show: true,
                }));
            });
    };

    return (
        <div className="container bg-light">
            {!isLoading ? (
                !error ? (
                    <>
                        <h1>Author: {author.name}</h1>
                        <p>{author.lifespan}</p>
                        <div style={styles.booksDiv}>
                            <h4>books</h4>
                            {authorBooks.length ? (
                                <dl>
                                    {authorBooks.map((book) => (
                                        <Fragment key={book.id}>
                                            <dt>
                                                <Link
                                                    to={`/catalog/book/${book.id}`}
                                                >
                                                    {book.title}
                                                </Link>
                                            </dt>
                                            <dd>{book.summary}</dd>
                                        </Fragment>
                                    ))}
                                </dl>
                            ) : (
                                <p>No books available</p>
                            )}
                        </div>
                        <hr />
                        <Button
                            as={Link}
                            to={{
                                pathname: "/catalog/author/update",
                                author: author,
                            }}
                            variant="primary"
                        >
                            Update
                        </Button>{" "}
                        <Button
                            variant="danger"
                            onClick={() => setShowDialog(true)}
                            disabled={!!authorBooks.length}
                            title={
                                authorBooks.length
                                    ? "This author can't be deleted. Frist delete all the books written by this author"
                                    : "Delete Book"
                            }
                        >
                            Delete
                        </Button>
                        <Modal show={showDialog} onHide={handleDialogClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Delete Author : {author.first_name}{" "}
                                    {author.last_name}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    Are you sure you want to delete this author?
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="primary"
                                    onClick={handleDeleteAuthor}
                                >
                                    Ok
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                ) : (
                    <p>Error fetching data, please contact support</p>
                )
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default AuthorDetail;
