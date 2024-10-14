const PORT = process.env.PORT || 5001;

module.exports= {
    config: {
        port: PORT,
        baseURL: `http://127.0.0.1:${PORT}`
    }
}