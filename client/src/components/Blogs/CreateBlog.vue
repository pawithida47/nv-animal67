<template>
  <div class="container">
    <h1>Create Animal</h1>
    <form v-on:submit.prevent="createBlog" class="form-container" enctype="multipart/form-data">
      <div class="form-group">
        <label for="name">ชื่อสัตว์:</label>
        <input type="text" id="name" v-model="blog.name" class="form-input" required />
      </div>

      <div class="form-group">
        <label for="habitat">ที่อยู่อาศัย:</label>
        <input type="text" id="habitat" v-model="blog.habitat" class="form-input" required />
      </div>

      <div class="form-group">
        <label for="food">อาหาร:</label>
        <input type="text" id="food" v-model="blog.food" class="form-input" required />
      </div>

      <div class="form-group">
        <label for="status">ประเภท:</label>
        <select id="status" v-model="blog.status" class="form-input" required>
          <option value="สัตว์เลี้ยงลูกด้วยนม">สัตว์เลี้ยงลูกด้วยนม</option>
          <option value="สัตว์ปีก">สัตว์ปีก</option>
          <option value="สัตว์เลี้ยงเลื้อยคลาน">สัตว์เลี้ยงเลื้อยคลาน</option>
          <option value="สัตว์ครึ่งบกครึ่งน้ำ">สัตว์ครึ่งบกครึ่งน้ำ</option>
          <option value="สัตว์น้ำ">สัตว์น้ำ</option>
        </select>
      </div>

      <div class="form-group">
        <label for="image">อัปโหลดรูปภาพ:</label>
        <input type="file" id="image" @change="onFileChange" class="form-input" accept="image/*" />
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import BlogsService from "@/services/BlogsService";

export default {
  data() {
    return {
      blog: {
        name: "",
        habitat: "",
        food: "",
        status: "",  // ค่า status เริ่มต้นให้เลือกจาก <select>
      },
      imageFile: null, // This will hold the uploaded image file
    };
  },
  methods: {
    async createBlog() {
  const formData = new FormData();
  formData.append('name', this.blog.name);
  formData.append('habitat', this.blog.habitat);
  formData.append('food', this.blog.food);
  formData.append('status', this.blog.status);
  
  if (this.imageFile) {
    formData.append('image', this.imageFile);
  }

  try {
    await BlogsService.post(formData); // สร้างบล็อกใหม่
    this.$router.push({ name: 'blogs' }); // เปลี่ยนเส้นทางไปยังหน้ารายการบล็อก
  } catch (err) {
    console.log(err); // แสดงข้อผิดพลาด
  }
}
,
    onFileChange(event) {
      this.imageFile = event.target.files[0]; // Store the selected file
    },
  },
};
</script>

<style scoped>
/* Container styles */
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

/* Title */
h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

/* Form styling */
.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-weight: 600;
  color: #333;
}

.form-input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.form-input:focus {
  border-color: #80bdff;
  box-shadow: 0 0 5px rgba(128, 189, 255, 0.5);
}

/* Button styling */
.btn {
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
