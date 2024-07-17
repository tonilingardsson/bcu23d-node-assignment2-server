export const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        statusCode: err.statusCode || 500,
        error: err.message || 'Internal Server Error',
    });
}