module.exports = (token) => {

    return `
        <p>To reset your password, follow this link:</p>
        <p><a href="https://checkyourhabit.com/reset-password/${token}">Password reset</a></p>
    `;
};