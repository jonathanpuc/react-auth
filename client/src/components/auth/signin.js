import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {

    handleFormSubmit = ({ email, password }) => {
        this.props.signinUser({ email, password })
    }

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
                    {renderError()}
                    <button action="submit" className="btn btn-primary">Sign in</button>
                </form>
            </div>
        )
    }
}

const reduxFormSignin = reduxForm({
    form: 'signin',
    fields: ['email', 'password']
})(Signin);

const mapStateToProps = (state) => ({
    errorMessage: state.auth.error
})

// Export wrapped Signin container with connect helper
export default connect(mapStateToProps, actions)(reduxFormSignin);
