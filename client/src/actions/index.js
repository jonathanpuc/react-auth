export function signinUser({ email, password }) {
    return {
        type: "SIGN_IN_REQUEST",
        payload: { email, password }
    }
}