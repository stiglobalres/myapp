const PORT = process.env.PORT || 3001;

module.exports= {
    config: {
        port: PORT,
        baseURL: `http://127.0.0.1:${PORT}`
    }
}