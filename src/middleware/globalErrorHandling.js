export const handleError = (err, req, res, next) => {
    const statusCode = err.cause || err.status || 500;
    return res
        .status(statusCode)
        .json({ message: err.message, stack: err.stack });
};
