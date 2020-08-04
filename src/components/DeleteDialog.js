import React, { useState, useEffect } from "react";

import { Button, Modal } from "react-bootstrap";

const DeleteDialog = ({ isShow, title }) => {
    //const { isShow, title } = props;
    const [show, setShow] = useState(false);
    const [isDeleteOk, setIsDeleteOk] = useState(false);

    const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);

    useEffect(() => {
        setShow(isShow);
    }, [isShow]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <props.modalBody />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteDialog;
