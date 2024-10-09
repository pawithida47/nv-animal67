<template>
  <div>
    <div class="nv-navbar">
      <ul class="nav">
        <li><router-link :to="{ name: 'blogs' }">Animal</router-link></li>
        <li><router-link :to="{ name: 'users' }">Users</router-link></li>
        <li><router-link :to="{ name: 'login' }">Login</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* ตัวเลือกการตกแต่งโดยรวม */
.nv-navbar {
  background-color: #f7d774; /* สีพื้นหลังที่สดใส */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* เพิ่มเงาเพื่อความสวยงาม */
  padding: 15px 0;
  width: 100%;
}

/* การจัดการกับรายการเมนู */
.nv-navbar .nav {
  list-style: none;
  display: flex; /* ใช้ Flexbox ในการจัดเรียง */
  justify-content: center; /* จัดให้อยู่ตรงกลาง */
  margin: 0;
  padding: 0;
}

/* การตกแต่งรายการเมนู */
.nv-navbar .nav li {
  margin: 0 15px; /* เพิ่มระยะห่างระหว่างเมนู */
}

/* การตกแต่งลิงก์ */
.nv-navbar .nav li a {
  text-decoration: none;
  color: #4a4a4a;
  font-size: 16px;
  font-weight: bold;
  transition: color 0.3s, background-color 0.3s; /* เพิ่มเอฟเฟกต์เมื่อ Hover */
  padding: 8px 15px;
  border-radius: 5px;
}

/* เมื่อ Hover เมนู */
.nv-navbar .nav li a:hover {
  background-color: #ffd700; /* เปลี่ยนสีพื้นหลังเมื่อ Hover */
  color: #333; /* สีข้อความเมื่อ Hover */
}

/* สไตล์สำหรับลิงก์ที่กำลังใช้งาน */
.nv-navbar .nav li a.router-link-active {
  background-color: #ffd700;
  color: #333;
  border-bottom: 2px solid darkslategrey; /* เส้นใต้ลิงก์ที่กำลังใช้งาน */
}
</style>
