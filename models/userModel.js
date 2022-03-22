module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Password: {
            type: DataTypes.STRING
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return User

}