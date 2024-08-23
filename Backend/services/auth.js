const jwt = require('jsonwebtoken');

const secret = "TESH@123"; // Secret key for signing JWTs

function setUser(user) {
    const payload = {
        ...user
    };

    // Sign the JWT with an expiration time (optional but recommended)
    return jwt.sign(payload, secret, { expiresIn: '1h' }); // Token expires in 1 hour
}

function getUser(token) {
    if (!token) {
        return null;
    }

    try {
        // Verify the JWT and return the decoded payload
        return jwt.verify(token, secret);
    } catch (err) {
        console.error('Invalid or expired token:', err.message);
        return null; // Return null if token is invalid or expired
    }
}

module.exports = { setUser, getUser }; // Ensure both functions are exported
