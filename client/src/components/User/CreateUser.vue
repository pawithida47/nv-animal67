<template>
  <div class="container">
    <h1>Create User</h1>
    <form v-on:submit.prevent="createUser" class="form-container">
      <div class="form-group">
        <label for="name">First Name:</label>
        <input type="text" id="name" v-model="user.name" class="form-input" required />
      </div>
      <div class="form-group">
        <label for="lastname">Last Name:</label>
        <input type="text" id="lastname" v-model="user.lastname" class="form-input" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" class="form-input" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="user.password" class="form-input" required />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Create User</button>
      </div>
    </form>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService';

export default {
  data() {
    return {
      user: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        status: 'active',
      },
    };
  },
  methods: {
    async createUser() {
      try {
        await UsersService.post(this.user);
        this.$router.push('/users');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
/* General Container */
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Title */
h1 {
  color: #343a40;
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
}

/* Form Styling */
.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
  color: #495057;
}

.form-input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  outline: none;
}

.form-input:focus {
  border-color: #80bdff;
  box-shadow: 0 0 5px rgba(128, 189, 255, 0.5);
}

/* Button Styling */
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
