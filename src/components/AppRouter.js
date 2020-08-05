import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";

import Home from "../pages/Home";
import Books from "../pages/Books";
import BookDetail from "../pages/BookDetail";
import Authors from "../pages/Authors";
import AuthorDetail from "../pages/AuthorDetail";
import Genres from "../pages/Genres";
import GenreDetail from "../pages/GenreDetail";
import GenreForm from "../pages/GenreForm";
import BookInstances from "../pages/BookInstances";
import BookInstanceDetail from "../pages/BookInstanceDetail";
import BookForm from "../pages/BookForm";
import AuthorForm from "../pages/AuthorForm";
import BookinstanceForm from "../pages/BookinstanceForm";
import Page404 from "../pages/404";

const AppRouter = (props) => {
    const { setToastState } = props;

    const styles = {
        containerDiv: {
            marginTop: "100px",
            marginBottom: "50px",
        },
    };

    return (
        <Router>
            <NavBar />
            <div style={styles.containerDiv}>
                <Switch>
                    <Route
                        path="/"
                        exact
                        component={(props) => (
                            <Home pageTitle="The Local Library" {...props} />
                        )}
                    />
                    <Route
                        path="/catalog/books"
                        exact
                        component={(props) => (
                            <Books pageTitle="Books" {...props} />
                        )}
                    />
                    <Route
                        path="/catalog/book/create"
                        exact
                        component={(props) => (
                            <BookForm pageTitle="Create Book" {...props} />
                        )}
                    />
                    <Route
                        path="/catalog/book/update"
                        exact
                        component={(props) => (
                            <BookForm pageTitle="Update Book" {...props} />
                        )}
                    />
                    <Route
                        path="/catalog/book/:id"
                        component={(props) => (
                            <BookDetail
                                pageTitle="Book Details"
                                setToastState={setToastState}
                                {...props}
                            />
                        )}
                    />
                    <Route
                        path="/catalog/authors"
                        exact
                        component={(props) => (
                            <Authors pageTitle="Authors" {...props} />
                        )}
                    />
                    <Route
                        path="/catalog/author/create"
                        exact
                        component={(props) => (
                            <AuthorForm pageTitle="Create Author" {...props} />
                        )}
                    />
                    <Route
                        path="/catalog/author/update"
                        exact
                        component={(props) => (
                            <AuthorForm pageTitle="Update Author" {...props} />
                        )}
                    />
                    <Route
                        path="/catalog/author/:id"
                        component={(props) => (
                            <AuthorDetail
                                pageTitle="Author Detail"
                                setToastState={setToastState}
                                {...props}
                            />
                        )}
                    />
                    <Route
                        path="/catalog/genres"
                        exact
                        component={(props) => (
                            <Genres pageTitle="Genres" {...props} />
                        )}
                    />
                    <Route
                        path="/catalog/genre/create"
                        exact
                        component={(props) => (
                            <GenreForm pageTitle="Create Genre" {...props} />
                        )}
                    />
                    <Route
                        path="/catalog/genre/update"
                        exact
                        component={(props) => (
                            <GenreForm pageTitle="Update Genre" {...props} />
                        )}
                    />
                    <Route
                        path="/catalog/genre/:id"
                        component={(props) => (
                            <GenreDetail
                                pageTitle="Genre Detail"
                                setToastState={setToastState}
                                {...props}
                            />
                        )}
                    />
                    <Route
                        path="/catalog/bookinstances"
                        exact
                        component={(props) => (
                            <BookInstances
                                pageTitle="Book Instances"
                                {...props}
                            />
                        )}
                    />
                    <Route
                        path="/catalog/bookinstance/create"
                        exact
                        component={(props) => (
                            <BookinstanceForm
                                pageTitle="Create copy"
                                {...props}
                            />
                        )}
                    />
                    <Route
                        path="/catalog/bookinstance/update"
                        exact
                        component={(props) => (
                            <BookinstanceForm
                                pageTitle="Update Book Copy"
                                {...props}
                            />
                        )}
                    />
                    <Route
                        path="/catalog/bookinstance/:id"
                        component={(props) => (
                            <BookInstanceDetail
                                pageTitle="Book Instance Detail"
                                setToastState={setToastState}
                                {...props}
                            />
                        )}
                    />
                    <Route
                        component={(props) => (
                            <Page404 pageTitle="Page Not Found" {...props} />
                        )}
                    />
                </Switch>
            </div>
        </Router>
    );
};

export default React.memo(AppRouter);
