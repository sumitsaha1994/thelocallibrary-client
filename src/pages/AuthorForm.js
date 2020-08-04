import React, { useEffect } from "react";
import useForm from "../hooks/useForm";
import { Form } from "react-bootstrap";
import SubmitButton from "../components/SubmitButton";
import FormSubmitModal from "../components/FormSubmitModal";
import { Link } from "react-router-dom";

const AuthorForm = (props) => {
    const {
        pageTitle,
        location: { author },
    } = props;

    const [
        formData,
        handleFormInputChnage,
        handleSubmit,
        { data, isLoading, displayModal },
    ] = useForm(
        {
            first_name: !!author ? author.first_name : "",
            last_name: !!author ? author.last_name : "",
            date_of_birth: !!author ? author.date_of_birth : "",
            date_of_death: !!author ? author.date_of_death : "",
        },
        !!author
            ? `/catalog/author/${author.id}/update`
            : "/catalog/author/create",
        !!author ? "update" : "create"
    );

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);

    return (
        <div className="container bg-light">
            <h1>Author {!!author ? "update" : "create"}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="first_name">
                    <Form.Label>First Name: </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="First name"
                        name="first_name"
                        onChange={handleFormInputChnage}
                        value={formData.first_name}
                    />
                    {!!data.error && (
                        <Form.Text className="text-danger">
                            {data.error.first_name}
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group controlId="last_name">
                    <Form.Label>Last Name: </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Last name"
                        name="last_name"
                        onChange={handleFormInputChnage}
                        value={formData.last_name}
                    />
                    {!!data.error && (
                        <Form.Text className="text-danger">
                            {data.error.last_name}
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group controlId="date_of_birth">
                    <Form.Label>Date of birth: </Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Date of birth"
                        name="date_of_birth"
                        onChange={handleFormInputChnage}
                        value={formData.date_of_birth}
                    />
                    {!!data.error && (
                        <Form.Text className="text-danger">
                            {data.error.date_of_birth}
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group controlId="date_of_death">
                    <Form.Label>Date of death: </Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Date of death"
                        name="date_of_death"
                        onChange={handleFormInputChnage}
                        value={formData.date_of_death}
                    />
                    {!!data.error && (
                        <Form.Text className="text-danger">
                            {data.error.date_of_death}
                        </Form.Text>
                    )}
                </Form.Group>
                <SubmitButton
                    isLoading={isLoading}
                    buttonText={!!author ? "Update" : "Create"}
                />
            </Form>
            <FormSubmitModal
                title={"Book " + (!!author ? "update" : "create")}
                isShow={displayModal}
                modalBody={() => (
                    <p>
                        {!!data.author && (
                            <>
                                Author{" "}
                                <Link to={`/catalog/author/${data.author.id}`}>
                                    {data.author.first_name}{" "}
                                    {data.author.last_name}
                                </Link>{" "}
                                has been {!!author ? " updated" : " created"}
                            </>
                        )}
                    </p>
                )}
            />
        </div>
    );
};

export default AuthorForm;
