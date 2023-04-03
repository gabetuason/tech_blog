// checks whether the user is logged in by looking at the 'loggedIn'
const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login'); // If the user is not logged in, it redirects them to the login page
    } else {
        next(); // If the user is logged in, it calls the 'next' middleware function
    }
};

module.exports = withAuth;