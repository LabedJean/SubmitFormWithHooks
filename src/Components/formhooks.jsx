import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useInput, useForm } from "./forms/hooks";
import { Input } from "./forms/inputs";


export default function FormHooks() {
    const form = useForm();
    const nameInput = useInput(
        {
            name: "name",
            label: "Name",
            validation: {
                maxLength: 20,
                required: true
            }
        },
        form
    );
    const placeInput = useInput(
        {
            name: "place",
            label: "Place",
            validation: {
                minLength: 5,
                required: true
            }
        },
        form
    );

    const numberInput = useInput(
        {
            name: "number",
            label: "Some Number",
            type: "number",
            validation: {
                customValidator: value => {
                    if (value < 10) {
                        return "This value must be more than 10";
                    }
                },
                required: true
            }
        },
        form
    );

    return (
        <div className="App">
            <h1>Form & Input hooks</h1>
            <Form
                onSubmit={e => {
                    e.preventDefault();
                    if (form.isValid()) {
                        console.log("submit", form.values);
                    }
                }}
            >
                <Input {...nameInput} />
                <Input {...placeInput} />
                <Input {...numberInput} />
                <button>Submit</button>
            </Form>
        </div>
    );
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    input,
    button {
        margin: 10px;
    }
`;

const rootElement = document.getElementById("root");
ReactDOM.render(<FormHooks />, rootElement);
