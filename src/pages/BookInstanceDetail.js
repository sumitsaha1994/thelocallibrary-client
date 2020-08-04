import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import { Modal, Button } from "react-bootstrap";
import API_URL from "../api";

const BookInstanceDetail = (props) => {
    const { id } = props.match.params;

    const {
        data: { bookInstance, error },
        isLoading,
    } = useFetch(`/catalog/bookinstance/${id}`);

    const history = useHistory();

    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        let pageTitle = props.pageTitle;
        pageTitle = bookInstance
            ? "Copy: " + bookInstance.book.title
            : pageTitle;
        document.title = pageTitle;
    }, [bookInstance, props.pageTitle]);

    const handleDialogClose = () => {
        setShowDialog(false);
    };

    const handleDeleteBookinstance = () => {
        setShowDialog(false);
        fetch(`${API_URL}/catalog/bookinstance/delete`, {
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
                    title: "Book Copy Delete",
                    msg: "Book copy has been deleted successfully",
                    show: true,
                }));
                history.push("/catalog/bookinstances");
            })
            .catch((error) => {
                console.log(error);
                props.setToastState((state) => ({
                    ...state,
                    title: "Author Delete",
                    msg: JSON.parse(error.message).bookInstance,
                    show: true,
                }));
            });
    };

    return (
        <div className="container bg-light">
            {!isLoading ? (
                !error ? (
                    <>
                        <h1>ID: {bookInstance.id}</h1>
                        <p>
                            <strong>Title: </strong>
                            <Link to={bookInstance.book.id}>
                                {bookInstance.book.title}
                            </Link>
                        </p>
                        <p>
                            <strong>Imprint: </strong>
                            {bookInstance.imprint}
                        </p>
                        <p>
                            <strong>Status: </strong>
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
                        </p>
                        {bookInstance.status.toLowerCase() !== "available" && (
                            <p>
                                <strong>Due back: </strong>
                                {bookInstance.due_back}
                            </p>
                        )}
                        <hr />
                        <Button
                            as={Link}
                            to={{
                                pathname: "/catalog/bookinstance/update",
                                bookInstance: bookInstance,
                            }}
                            variant="primary"
                        >
                            Update
                        </Button>{" "}
                        <Button
                            variant="danger"
                            onClick={() => setShowDialog(true)}
                            title="Delete Book copy"
                        >
                            Delete
                        </Button>
                        <Modal show={showDialog} onHide={handleDialogClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Delete Copy : {bookInstance.id}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    Are you sure you want to delete this copy?
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="primary"
                                    onClick={handleDeleteBookinstance}
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

export default BookInstanceDetail;
