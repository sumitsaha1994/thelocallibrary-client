import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyButton = () => {
    return (
        <Button
            as={Link}
            to={{ pathname: "/catalog/genre/update", genre: genre }}
            variant="primary"
        >
            Update
        </Button>
    );
};
