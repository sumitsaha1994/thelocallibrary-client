import React, { useEffect } from "react";
import useForm from "../hooks/useForm";
import { Form } from "react-bootstrap";
import SubmitButton from "../components/SubmitButton";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import FormSubmitModal from "../components/FormSubmitModal";
import { Link } from "react-router-dom";

const BookForm = (props) => {
    const {
        pageTitle,
        location: { book },
    } = props;

    const { data: authors, isLoading: isAuthorsLoading } = useFetch(
        "/catalog/authors"
    );
    const { data: genres, isLoading: isGenresLoading } = useFetch(
        "/catalog/genres"
    );
    const [
        formData,
        handleFormInputChnage,
        handleSubmit,
        { data, isLoading, displayModal },
    ] = useForm(
        {
            title: !!book ? book.title : "",
            author: !!book ? book.author.id : "",
            summary: !!book ? book.summary : "",
            isbn: !!book ? book.isbn : "",
            genre: !!book ? book.genre.map((g) => g.id) : [],
        },
        !!book ? `/catalog/book/${book.id}/update` : "/catalog/book/create",
        !!book ? "update" : "create"
    );

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);

    return (
        <div className="container bg-light">
            {!isAuthorsLoading && !isGenresLoading ? (
                <>
                    <h1>Book {!!book ? "update" : "create"}</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Title: </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name of book"
                                name="title"
                                onChange={handleFormInputChnage}
                                value={formData.title}
                            />
                            {!!data.error && (
                                <Form.Text className="text-danger">
                                    {data.error.title}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group controlId="author">
                            <Form.Label>Author: </Form.Label>
                            <Form.Control
                                as="select"
                                name="author"
                                onChange={handleFormInputChnage}
                                value={formData.author}
                            >
                                <option hidden>Select author</option>
                                {authors.map((author) => (
                                    <option key={author.id} value={author.id}>
                                        {author.name}
                                    </option>
                                ))}
                            </Form.Control>
                            {!!data.error && (
                                <Form.Text className="text-danger">
                                    {data.error.author}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group controlId="summary">
                            <Form.Label>Summary: </Form.Label>
                            <Form.Control
                                as="textarea"
                                row="3"
                                placeholder="Summary of the book"
                                name="summary"
                                onChange={handleFormInputChnage}
                                value={formData.summary}
                            />
                            {!!data.error && (
                                <Form.Text className="text-danger">
                                    {data.error.summary}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group controlId="isbn">
                            <Form.Label>ISBN: </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="ISBN"
                                name="isbn"
                                onChange={handleFormInputChnage}
                                value={formData.isbn}
                            />
                            {!!data.error && (
                                <Form.Text className="text-danger">
                                    {data.error.isbn}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Genre: </Form.Label>
                            {genres.map((gnr) => (
                                <Form.Check
                                    id={gnr.id}
                                    key={gnr.id}
                                    type="checkbox"
                                    checked={formData.genre.includes(gnr.id)}
                                    name="genre"
                                    label={gnr.name}
                                    onChange={handleFormInputChnage}
                                    value={gnr.id}
                                />
                            ))}
                        </Form.Group>
                        <SubmitButton
                            isLoading={isLoading}
                            buttonText={!!book ? "Update" : "Create"}
                        />
                    </Form>
                    <FormSubmitModal
                        title={"Book " + (!!book ? "update" : "create")}
                        isShow={displayModal}
                        modalBody={() => (
                            <p>
                                {!!data.book && (
                                    <>
                                        Book{" "}
                                        <Link
                                            to={`/catalog/book/${data.book.id}`}
                                        >
                                            {data.book.title}
                                        </Link>{" "}
                                        has been{" "}
                                        {!!book ? " updated" : " created"}
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

export default BookForm;
