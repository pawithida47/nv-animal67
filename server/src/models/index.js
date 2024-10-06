const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config');
const db = {};

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
);

// โหลดไฟล์โมเดลทั้งหมดที่อยู่ใน directory
fs.readdirSync(__dirname)
    .filter((file) =>
        file !== 'index.js' // กรองไฟล์ index.js ออกเพื่อไม่ให้โหลดตัวเอง
    )
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model; // เพิ่มโมเดลลงใน object db
    });

// เรียกใช้ associate สำหรับการสร้างความสัมพันธ์ (Associations)
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db); // เรียกใช้ฟังก์ชัน associate หากโมเดลมีฟังก์ชันนี้
    }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
