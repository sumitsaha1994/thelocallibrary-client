import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import AppToast from "./components/AppToast";
import AppRouter from "./components/AppRouter";

function App() {
    const [toastState, setToastState] = useState({
        title: "",
        msg: "",
        show: false,
    });

    return (
        <>
            <AppRouter setToastState={setToastState} />
            <AppToast toast={{ toastState, setToastState }} />
        </>
    );
}

export default App;
