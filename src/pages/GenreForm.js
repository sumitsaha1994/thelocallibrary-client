import React, { useEffect } from "react";

import { Form } from "react-bootstrap";
import useForm from "../hooks/useForm";
import SubmitButton from "../components/SubmitButton";
import FormSubmitModal from "../components/FormSubmitModal";
import { Link } from "react-router-dom";

const GenreForm = (props) => {
    const {
        pageTitle,
        location: { genre },
    } = props;

    const [
        formData,
        handleFormInputChnage,
        handleSubmit,
        { data, isLoading, displayModal },
    ] = useForm(
        {
            name: !!genre ? genre.name : "",
        },
        !!genre ? `/catalog/genre/${genre.id}/update` : "/catalog/genre/create",
        !!genre ? "update" : "create"
    );

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);

    return (
        <div className="container bg-light">
            <h1>Genre {!!genre ? "update" : "create"}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Genre: </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Fantasy, Poetry etc."
                        name="name"
                        onChange={handleFormInputChnage}
                        value={formData.name}
                    />
                    {!!data.error && (
                        <Form.Text className="text-danger">
                            {data.error.name}
                        </Form.Text>
                    )}
                </Form.Group>
                <SubmitButton
                    isLoading={isLoading}
                    buttonText={!!genre ? "Update" : "Create"}
                />
            </Form>
            <FormSubmitModal
                title={"Genre " + (!!genre ? "update" : "create")}
                isShow={displayModal}
                modalBody={() => (
                    <p>
                        {!!data.genre && (
                            <>
                                Genre{" "}
                                <Link to={`/catalog/genre/${data.genre.id}`}>
                                    {data.genre.name}
                                </Link>{" "}
                                has been {!!genre ? " updated" : " created"}
                            </>
                        )}
                    </p>
                )}
            />
        </div>
    );
};

export default GenreForm;
