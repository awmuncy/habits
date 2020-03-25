module.exports = (name, email) => {

    var at = new Date();

    return `
        <p>You have a new user. Pretty neat!</p>
        <p>Email: ${email}</p>
        <p>They signed up at ${at}</p>
    `;
};