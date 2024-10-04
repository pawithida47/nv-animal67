module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Blog', {
        name: { type: DataTypes.STRING, allowNull: false },  // ใช้ DataTypes.STRING แทน String
        habitat: { type: DataTypes.STRING, allowNull: false }, // ใช้ DataTypes.STRING
        food: { type: DataTypes.STRING, allowNull: false },    // ใช้ DataTypes.STRING
        status: { type: DataTypes.ENUM('saved', 'endangered'), defaultValue: 'saved' }, // ใช้ DataTypes.ENUM
        userId: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'id' } }, // ใช้ DataTypes.INTEGER แทน ObjectId
    }, {
        timestamps: true, // เปิดใช้ timestamps (createdAt, updatedAt) อัตโนมัติ
    });
    return Blog
}