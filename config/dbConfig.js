const config = {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USER,
    password: process.env.DB_PDB_PASSWORD || '',
    database: process.env.DB_NAME
}

module.exports = config;