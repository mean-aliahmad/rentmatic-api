// Configuration settings (e.g., database URI)
const config = {
    databaseURI: process.env.DATABASE_URI || 'mongodb://localhost:27017/mydb',
};

module.exports = { config };
