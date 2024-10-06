module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Blog', {
        name: { 
            type: DataTypes.STRING, 
            allowNull: false 
        }, 
        habitat: { 
            type: DataTypes.STRING, 
            allowNull: false 
        }, 
        food: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        status: { 
            type: DataTypes.ENUM('saved', 'endangered'), 
            defaultValue: 'saved' 
        },
        userId: { 
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: { 
                model: 'Users', // ตรวจสอบว่า 'Users' ตรงกับโมเดล User ที่สร้างไว้
                key: 'id' 
            } 
        }
    }, {
        timestamps: true, // ใช้ timestamps (createdAt, updatedAt)
    });

    // กำหนดความสัมพันธ์กับโมเดล User
    Blog.associate = function(models) {
        Blog.belongsTo(models.User, { 
            foreignKey: 'userId', 
            as: 'user' 
        });
    };

    return Blog;
};
