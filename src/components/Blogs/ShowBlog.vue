<template>
    <div class="container">
      <h1>Show Animal</h1>
      <div class="animal-details">
        <img :src="BASE_URL + blog.picture" alt="Animal Image" v-if="blog.picture" style="width: 200px; height: auto;" />
        <p><strong>ID:</strong> {{ blog.id }}</p>
        <p><strong>ชื่อ:</strong> {{ blog.name }}</p>
        <p><strong>ที่อยู่อาศัย:</strong> {{ blog.habitat }}</p>
        <p><strong>อาหาร:</strong> {{ blog.food }}</p>
        <p><strong>ประเภท:</strong> {{ blog.status }}</p>
        <p v-if="blog.image"><strong>รูปภาพ:</strong></p>
        <img v-if="blog.image" :src="blog.image" alt="Animal Image" class="animal-image" />
      </div>
      <div class="button-group">
        <button v-on:click="navigateTo('/blog/edit/' + blog.id)" class="btn btn-primary">Edit</button>
        <button v-on:click="navigateTo('/blogs')" class="btn btn-secondary">Back</button>
      </div>
    </div>
  </template>
  
  <script>
  import BlogsService from '@/services/BlogsService'
    export default {
        data () {
            return {
                blog: null,
                BASE_URL: 'http://localhost:8081/assets/uploads/', // ตั้งค่า URL เบสที่ถูกต้อง
            }
        },
        async created () {
            try {
                let blogId = this.$route.params.blogId
                this.blog = (await BlogsService.show(blogId)).data
            } catch (error) {
                console.log(error)
            }
        },
        methods: {
            navigateTo (route) {
                this.$router.push(route)
      },
    }
  }
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
  
  /* Animal details styling */
  .animal-details {
    margin-bottom: 20px;
  }
  
  .animal-details p {
    font-size: 18px;
    color: #555;
  }
  
  /* Image styling */
  .animal-image {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    margin-top: 10px;
  }
  
  /* Button group styling */
  .button-group {
    display: flex;
    justify-content: center; /* จัดให้ปุ่มอยู่กลาง */
    gap: 10px; /* เพิ่มระยะห่างระหว่างปุ่ม */
    margin-top: 20px; /* เพิ่มระยะห่างระหว่างรายละเอียดและปุ่ม */
  }
  
  .btn {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s, transform 0.3s; /* เพิ่มเอฟเฟกต์ที่ราบรื่น */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* เพิ่มเงาให้ปุ่ม */
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
    transform: translateY(-2px); /* ยกปุ่มขึ้นเมื่อ hover */
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: white;
  }
  
  .btn-secondary:hover {
    background-color: #5a6268;
    transform: translateY(-2px); /* ยกปุ่มขึ้นเมื่อ hover */
  }
  </style>
  