//****ImportingPackages******//
const rateLimiting = require('express-rate-limit');

const getResetTime = (req, options) => {
    const now = Date.now();
    const resetTime = req.rateLimit.resetTime;
    return Math.ceil((resetTime - now) / 1000);
};

const limiter = rateLimiting({
    windowMs: 60 * 1000,
    max: 5,
    message: 'Too many requests from this IP, please try again later.',
    handler: (req, res, next, options) => {
        req.rateLimit = { resetTime: Date.now() + options.windowMs };
        const remainingTime = getResetTime(req, options);

        res.status(429).json({
            status: false,
            error: "Too many request please try again later",
            resetIn: "Wait for " + remainingTime + " seconds"

        });
    },
});

module.exports = { limiter }