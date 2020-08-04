import React, { useEffect } from "react";
import useForm from "../hooks/useForm";
import { Form } from "react-bootstrap";
import SubmitButton from "../components/SubmitButton";
import FormSubmitModal from "../components/FormSubmitModal";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";

const BookinstanceForm = (props) => {
    const {
        pageTitle,
        location: { bookInstance },
    } = props;

    const { data: books, isLoading: isBooksLoading } = useFetch(
        "/catalog/books"
    );

    const [
        formData,
        handleFormInputChnage,
        handleSubmit,
        { data, isLoading, displayModal },
    ] = useForm(
        {
            book: !!bookInstance ? bookInstance.book.id : "",
            imprint: !!bookInstance ? bookInstance.imprint : "",
            due_back: !!bookInstance ? bookInstance.due_back : "",
            status: !!bookInstance ? bookInstance.status : "",
        },
        !!bookInstance
            ? `/catalog/bookinstance/${bookInstance.id}/update`
            : "/catalog/bookinstance/create",
        !!bookInstance ? "update" : "create"
    );

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);

    return (
        <div className="container bg-light">
            {!isBooksLoading ? (
                <>
                    <h1>Book copy {!!bookInstance ? "update" : "create"}</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="book">
                            <Form.Label>Book: </Form.Label>
                            <Form.Control
                                as="select"
                                name="book"
                                onChange={handleFormInputChnage}
                                value={formData.book}
                            >
                                <option hidden>Select book</option>
                                {books.map((book) => (
                                    <option key={book.id} value={book.id}>
                                        {book.title}
                                    </option>
                                ))}
                            </Form.Control>
                            {!!data.error && (
                                <Form.Text className="text-danger">
                                    {data.error.book}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group controlId="imprint">
                            <Form.Label>Imprint: </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Imprint"
                                name="imprint"
                                onChange={handleFormInputChnage}
                                value={formData.imprint}
                            />
                            {!!data.error && (
                                <Form.Text className="text-danger">
                                    {data.error.imprint}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group controlId="due_back">
                            <Form.Label>Date of availability: </Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Date of availability"
                                name="due_back"
                                onChange={handleFormInputChnage}
                                value={formData.due_back}
                            />
                            {!!data.error && (
                                <Form.Text className="text-danger">
                                    {data.error.due_back}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group controlId="status">
                            <Form.Label>Status: </Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                onChange={handleFormInputChnage}
                                value={formData.status}
                            >
                                <option hidden>Select status</option>
                                {[
                                    "Available",
                                    "Maintenance",
                                    "Loaned",
                                    "Reserved",
                                ].map((status, index) => (
                                    <option key={index} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </Form.Control>
                            {!!data.error && (
                                <Form.Text className="text-danger">
                                    {data.error.status}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <SubmitButton
                            isLoading={isLoading}
                            buttonText={!!bookInstance ? "Update" : "Create"}
                        />
                    </Form>
                    <FormSubmitModal
                        title={"Book " + (!!bookInstance ? "update" : "create")}
                        isShow={displayModal}
                        modalBody={() => (
                            <p>
                                {!!data.bookInstance && (
                                    <>
                                        Book copy{" "}
                                        <Link
                                            to={`/catalog/bookinstance/${data.bookInstance.id}`}
                                        >
                                            {data.bookInstance.id}
                                        </Link>{" "}
                                        has been{" "}
                                        {!!bookInstance
                                            ? " updated"
                                            : " created"}
                                    </>
                                )}
                            </p>
                        )}
                    />
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default BookinstanceForm;
