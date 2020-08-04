import { useState } from "react";
import API_URL from "../api";

const useForm = (initialFormData, submitUrl, actionType) => {
    const [formData, setFormData] = useState(initialFormData);
    const [state, setState] = useState({
        data: {},
        isLoading: false,
        displayModal: false,
    });
    //const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const handleFormInputChnage = (e) => {
        if (e.target.type === "checkbox") {
            let checkedValues = formData[e.target.name];
            if (!checkedValues.includes(e.target.value)) {
                checkedValues.push(e.target.value);
            } else if (checkedValues.includes(e.target.value)) {
                checkedValues = checkedValues.filter(
                    (value) => value !== e.target.value
                );
            }
            setFormData({
                ...formData,
                [e.target.name]: checkedValues,
            });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
        console.log(formData);
        setState({ data: {}, isLoading: true });
        fetch(API_URL + submitUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setState({
                    ...state,
                    data,
                    isLoading: false,
                    displayModal: !!data.error ? false : true,
                });
                if (actionType === "create" && !data.error) {
                    setFormData(initialFormData);
                }
            })
            .catch((err) => {
                console.error(err);
                setState({ ...state, data: { error: err }, isLoading: false });
            });
    };

    return [formData, handleFormInputChnage, handleSubmit, state];
};

export default useForm;
