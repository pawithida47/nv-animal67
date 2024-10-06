const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(user, options) {
    const SALT_FACTOR = 8
    if (!user.changed('password')) {
        return
    }
    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then(salt => bcrypt.hashAsync(user.password, salt, null))
        .then(hash => {
            user.setDataValue('password', hash)
        })
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,  // ทำให้ email ไม่ซ้ำกัน
            validate: {
                isEmail: true  // ตรวจสอบรูปแบบอีเมล
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false  // กำหนดให้ password ไม่เป็นค่าว่าง
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false  // กำหนดให้ name ไม่เป็นค่าว่าง
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        hooks: {
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword
        }
    })

    // เปรียบเทียบรหัสผ่านที่ผู้ใช้ใส่กับรหัสผ่านที่เก็บในฐานข้อมูล
    User.prototype.comparePassword = function (password) {
        return bcrypt.compareSync(password, this.password)
    }

    // เพิ่ม association กับโมเดลอื่น เช่น Blog
    User.associate = function (models) {
        User.hasMany(models.Blog, { foreignKey: 'userId', as: 'blogs' })
    }

    return User
}
