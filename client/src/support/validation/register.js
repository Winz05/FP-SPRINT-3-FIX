import React, { Component } from 'react'


export class RegisterVal extends Component {
	state = {
		field: {
			name: "",
			email: "",
			password: "",
			phone_number: "",
		},
		errors: {
			name: "",
			email: "",
			password: "",
			phone_number: "",
		},
	};

	handleFormOnValidate = (name, value) => {
		if (!value) {
			return "Input name must be filled";
		}
		if (name === "name" && value.length < 3) {
			return "Name must have 3 character or more";
		}
		if (name === "email" && !value.includes("@")) {
			return "Format email not valid";
		}

		if (name === "password" && value.length < 8) {
			return "Password must have 8 character or more";
		}

		if (
			name === "password" &&
			!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(
				value
			)
		) {
			return "Password must contain number and capital";
		}

		if (name === "phone_number" && value.length < 11) {
			return "Phone number must have 11 character or more";
		}

		if (name === "phone_number" && isNaN(value)) {
			return "Phone number must be number";
		}

        return false
	};

    handleFormOnChange = (event) => {
        const { field, errors } = this.state
        const { value, name } = event.target
        const error = this.handleFormOnValidate(name, value)
        this.setState({
            field: {
                ...field,
                [name]: value
            },
            errors: {
                ...errors,
                [name]: error
            }
        })
    }

    handleFormOnSubmitValidation = () => {
        const { field } = this.state
        const names = Object.keys(field)
        const errors = {}
        names.forEach((name) => {
            const value = field[name]
            const error = this.handleFormOnValidate(name, value)
            errors[name] = error
        })
        return errors
    }

    handleFormOnSubmit = (event) => {
        event.preventDefault()
        const validation = this.handleFormOnSubmitValidation()
        const hasError = Object.values(validation).some((item) => item !== false)
        if(hasError) {
            this.setState({ errors: validation})
            return
        }

        const {field} = this.state
        console.log(validation, field)
    }
}
export default RegisterVal;
