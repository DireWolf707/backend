import { body } from 'express-validator';

const usernameValidation = (field) => {
    return body(field, 'username is invalid!')
                            .isString().bail()
                            .exists({checkFalsy:true});
};

// For insert
const passwordValidation = (field, msgField = 'password') => {
    return body(field, `${msgField} is invalid!`)
                            .isString().bail()
                            .exists({checkFalsy:true}).bail()
                            .isLength({ min: 8 }).withMessage(`min length of ${msgField} is 8!`);
};

// For update
const passwordValidation2 = (field, msgField = 'password') => {
    return body(field, `${msgField} is invalid!`)
                            .isString().bail()
                            .exists({checkFalsy:true}).bail();
};

const emailValidation = (field) => {
    return body(field, 'email is invalid!')
                            .isEmail();
};

const nameValidation = (field) => {
    return body(field, 'name is invalid!')
                            .isString().bail()
                            .exists({checkFalsy:true});
};

const passwordMatchValidation = (field1, field2, setPswd = true) => {
    return body(field1)
            .custom((value, { req }) => {
                if (value !== req.body[field2]) throw new Error('Password confirmation does not match password');
                if (setPswd) req.body.password = value;
                return true;
            })
}

export const loginValidationChain = [
    usernameValidation('username'),
    passwordValidation2('password')
]

export const signupValidationChain = [
    usernameValidation('username'),
    nameValidation('name'),
    emailValidation('email'),
    passwordValidation('password1'),
    passwordValidation('password2', 'confirm password'),
    passwordMatchValidation('password1', 'password2')
]

export const userUpdateValidationChain = [
    usernameValidation('username'),
    nameValidation('name'),
    emailValidation('email')
]

export const passwordUpdateValidationChain = [
    passwordValidation2('password', 'old password'),
    passwordValidation2('password1', 'new password'),
    passwordValidation2('password2', 'new password confirm'),
    passwordMatchValidation('password1', 'password2', false)
]