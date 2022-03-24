module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("productData", {
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        published: {
            type: DataTypes.INTEGER
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Product

}