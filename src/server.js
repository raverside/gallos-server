const api = require('./api');

function startServer() {
    api.listen(process.env.PORT, "0.0.0.0", () => {
        console.log(`Running on port ${process.env.PORT} with ${process.env.NODE_ENV} environment`);
    });
}

startServer();
