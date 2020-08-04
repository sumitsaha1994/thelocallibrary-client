import React from "react";
import { Button } from "react-bootstrap";
import Loader from "./Loader";

const SubmitButton = ({ isLoading, buttonText }) => {
    return (
        <Button
            variant={isLoading ? "secondary" : "primary"}
            type="submit"
            disabled={isLoading}
        >
            {isLoading ? (
                <Loader size="sm" variant="dark" />
            ) : (
                <>{buttonText}</>
            )}
        </Button>
    );
};

export default SubmitButton;
