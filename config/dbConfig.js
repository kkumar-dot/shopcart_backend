module.exports = {
    HOST: 'localhost',
    USER: 'abcd',
    PASSWORD: '12345',
    DB: 'employee',
    dialect: 'mssql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}