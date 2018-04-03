import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';


class Signup extends Component {
    render() {
        const { handleSubmit, errorMessage } = this.props;

        const renderInput = field =>
            <div>
                <input {...field.input} type={field.type} className="form-control" />
            </div>
        const renderError = () => {
            if (errorMessage) {
                return (
                    <div className="alert alert-danger">
                        <strong>{errorMessage}</strong>
                    </div>
                )
            }
        }

        return (
            <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <fieldset className="form-group">
                        <label>Email:</label>
                        <Field name="email" component={renderInput} type="text" />
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Password:</label>
                        <Field name="password" component={renderInput} type="password" />
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Confirm Password:</label>
                        <Field name="passwordConfirm" component={renderInput} type="password" />
                    </fieldset>
                    {renderError()}
                    <button action="submit" className="btn btn-primary">Sign up</button>
                </form>
            </div>
        )
    }

    handleFormSubmit = ({ email, password, passwordConfirm }) => {
        this.props.signupUser({ email, password, passwordConfirm })
    }

}

const reduxFormSignup = reduxForm({
    form: 'signin',
    fields: ['email', 'password', 'passwordConfirm']
})(Signup);

const mapStateToProps = (state) => ({
    errorMessage: state.auth.error
})


export default connect(mapStateToProps, actions)(reduxFormSignup);