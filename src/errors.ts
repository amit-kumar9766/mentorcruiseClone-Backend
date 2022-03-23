const kerrors = {
    Unauthorized: {
        status: 401,
        response: {
            error: 'Unauthenticated',
            message: 'Sign in to set current user',
        },
    },
    Unauthenticated: {
        status: 403,
        response: {
            error: 'Unauthorized',
            message: 'Credentials do not match',
        },
    },
    AdminRequired: {
        status: 403,
        response: {
            error: 'Forbidden',
            message: 'The user needs to be an administrator',
        },
    },
};
module.exports = kerrors;
