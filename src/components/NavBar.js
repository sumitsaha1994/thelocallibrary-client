import React from "react";
import { Link } from "react-router-dom";

import { Navbar, Nav } from "react-bootstrap";

const NavBar = (props) => {
    const styles = {
        linkStyle: {},
    };

    return (
        <div>
            <Navbar bg="info" variant="dark" expand="lg" fixed="top">
                <Link style={styles.linkStyle} to="/">
                    <Navbar.Brand>The Local Library</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto ml-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/catalog/books">
                            Books
                        </Nav.Link>
                        <Nav.Link as={Link} to="/catalog/authors">
                            Authors
                        </Nav.Link>
                        <Nav.Link as={Link} to="/catalog/genres">
                            Genres
                        </Nav.Link>
                        <Nav.Link as={Link} to="/catalog/bookinstances">
                            Book Instances
                        </Nav.Link>
                        <Nav.Link as={Link} to="/catalog/genre/create">
                            Create Genre
                        </Nav.Link>
                        <Nav.Link as={Link} to="/catalog/book/create">
                            Create Book
                        </Nav.Link>
                        <Nav.Link as={Link} to="/catalog/author/create">
                            Create Author
                        </Nav.Link>
                        <Nav.Link as={Link} to="/catalog/bookinstance/create">
                            Create Book Instance(new copy)
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default NavBar;
