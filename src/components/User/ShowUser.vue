<template>
<<<<<<< HEAD
  <div class="user-container">
    <h1>Show User</h1>
    <div class="user-card">
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Lastname:</strong> {{ user.lastname }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Password:</strong> {{ user.password }}</p>
      <p><strong>Status:</strong> {{ user.status }}</p>
      <p><strong>Type:</strong> {{ user.type }}</p>
      <p><strong>Created At:</strong> {{ user.createdAt }}</p>
    </div>
    <div class="button-container">
      <button class="back-button" @click="goBack">Back</button>
    </div>
=======
  <div>
    <h1>Show User</h1>
    <p>ID: {{ user.id }} </p>
    <p>Name: {{ user.id }} </p>
    <p>Lastname: {{ user.lastname }} </p>
    <p>Email: {{ user.email }}</p>
    <p>Password: {{ user.password }}</p>
    <p>Status: {{ user.status }}</p>
    <p>Type: {{ user.type }}</p>
    <p>Created At: {{ user.createdAt }}</p>
>>>>>>> 08ab55fd7f86d8084deddbad6a7c7433e3dbd464
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";

export default { 
<<<<<<< HEAD
  data() {
=======
  data(){
>>>>>>> 08ab55fd7f86d8084deddbad6a7c7433e3dbd464
    return {
      user: {}
    }
  },
  async created() {
<<<<<<< HEAD
    try {
      const userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
=======
    try{
      var userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    }catch(err){
      console.log(err);
    }
    
    // console.log(this.user);
  },
  

>>>>>>> 08ab55fd7f86d8084deddbad6a7c7433e3dbd464
}
</script>

<style>
<<<<<<< HEAD
.user-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}

.user-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

p {
  margin: 10px 0;
  line-height: 1.6;
}

strong {
  color: #555;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.back-button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>
=======

</style>
>>>>>>> 08ab55fd7f86d8084deddbad6a7c7433e3dbd464
