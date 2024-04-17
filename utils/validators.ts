// Regular expression for email validation
const emailRegex: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Validates an email address using a regular expression.
 * 
 * @param email - The email address to validate.
 * @returns true if the email address is valid, otherwise false.
 */
function validateEmail(email: string): boolean {
    return emailRegex.test(email);
}

// Regular expression for username validation (5 letters)
const usernameRegex: RegExp = /^[a-zA-Z]{5}$/;

/**
 * Validates a username consisting of exactly 5 letters.
 * 
 * @param username - The username to validate.
 * @returns true if the username is valid, otherwise false.
 */
function validateUsername(username: string): boolean {
    return usernameRegex.test(username);
}

export { validateEmail, validateUsername };
