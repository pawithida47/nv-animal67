<template>
  <div class="container">
    <h1>Get All Users</h1>
    <div class="button-container">
      <button v-on:click="navigateTo('/user/create')" class="btn btn-primary">สร้างผู้ใช้</button>
    </div>
    <hr>
    <div v-if="users.length">
      <div><b>จำนวนผู้ใช้งาน:</b> {{ users.length }}</div><br>
      <div v-for="user in users" v-bind:key="user.id" class="user-card">
        <div><b>id:</b> {{ user.id }}</div>
        <div><b>ชื่อผู้ใช้:</b> {{ user.name }} {{ user.lastname }}</div>
        <div><b>อีเมล:</b> {{ user.email }}</div>
        <div><b>สถานะ:</b> {{ user.status }}</div>
        <div><b>ประเภท:</b> {{ user.type }}</div>
        <div class="button-group">
          <button v-on:click="navigateTo('/user/'+user.id)" class="btn btn-info">ดูข้อมูล</button>
          <button v-on:click="navigateTo('/user/edit/'+user.id)" class="btn btn-warning">แก้ไขข้อมูล</button>
          <button v-on:click="deleteUser(user)" class="btn btn-danger">ลบข้อมูล</button>
        </div>
        <hr>
      </div>
    </div>
    <div class="button-container">
      <button v-on:click="logout" class="btn btn-secondary">Logout</button>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";
export default {
  data() {
    return {
      users: []
    }
  },
  async created() {
    try {
      this.users = (await UsersService.index()).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'login'
      })
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user) {
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
      if (result) {
        try {
          await UsersService.delete(user);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      try {
        this.users = (await UsersService.index()).data;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.button-container {
  margin-bottom: 20px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-warning {
  background-color: #ffc107;
  color: black;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.user-card {
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.user-card div {
  margin-bottom: 5px;
}
</style>
