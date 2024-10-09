<template>
    <div class="container">
        <h2>All Animal</h2>
        <!-- <p><button class="btn btn-logout" @click="logout">Log out</button></p> -->
        
        <h4 class="count">จำนวนสัตว์: {{ filteredBlogs.length }} ตัว</h4>
        
        <div>
            <input class="search-input" type="text" v-model="searchQuery" placeholder="ค้นหา..." />
        </div><br>

        <div class="filter-buttons">
            <button class="btn btn-category" @click="filterBlogs('ทั้งหมด')">แสดงทั้งหมด</button> 
            <button class="btn btn-category" @click="filterBlogs('สัตว์เลี้ยงลูกด้วยนม')">สัตว์เลี้ยงลูกด้วยนม</button>
            <button class="btn btn-category" @click="filterBlogs('สัตว์ปีก')">สัตว์ปีก</button>
            <button class="btn btn-category" @click="filterBlogs('สัตว์เลี้ยงเลื้อยคลาน')">สัตว์เลี้ยงเลื้อยคลาน</button>
            <button class="btn btn-category" @click="filterBlogs('สัตว์ครึ่งบกครึ่งน้ำ')">สัตว์ครึ่งบกครึ่งน้ำ</button> 
            <button class="btn btn-category" @click="filterBlogs('สัตว์น้ำ')">สัตว์น้ำ</button>
        </div>

        <p><button class="btn btn-add" @click="navigateTo('/blog/create')">Add Animal</button></p>

        <div class="animal-list">
            <div v-for="blog in filteredBlogs" :key="blog.id" class="animal-card">
                <img :src="BASE_URL + blog.picture" alt="Animal Image" v-if="blog.picture" class="animal-image" />
                <p><strong>รหัส:</strong> {{ blog.id }}</p>
                <p><strong>ชื่อ:</strong> {{ blog.name }}</p>
                <p><strong>ที่อยู่อาศัย:</strong> {{ blog.habitat }}</p>
                <p><strong>อาหาร:</strong> {{ blog.food }}</p>
                <p><strong>ประเภท:</strong> {{ blog.status }}</p>
                <div class="button-group">
                    <button class="btn btn-view" @click="navigateTo('/blog/' + blog.id)">View</button>
                    <button class="btn btn-edit" @click="navigateTo('/blog/edit/' + blog.id)">Edit</button>
                    <button class="btn btn-delete" @click="deleteBlog(blog)">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BlogsService from '@/services/BlogsService'

export default {
    data() {
        return {
            blogs: [],
            BASE_URL: 'http://localhost:8081/assets/uploads/',
            filter: 'ทั้งหมด',
            searchQuery: ''
        }
    },
    computed: {
        filteredBlogs() {
            let filtered = this.filter === 'ทั้งหมด' ? this.blogs : this.blogs.filter(blog => blog.status === this.filter);
            
            if (this.searchQuery) {
                const lowerSearchQuery = this.searchQuery.toLowerCase();
                filtered = filtered.filter(blog => {
                    return blog.id.toString().includes(lowerSearchQuery) || 
                           blog.name.toLowerCase().includes(lowerSearchQuery) || 
                           blog.habitat.toLowerCase().includes(lowerSearchQuery);
                });
            }
            return filtered;
        }
    },
    async created() {
        this.blogs = (await BlogsService.index()).data
    },
    methods: {
        logout() {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setBlog', null)
            this.$router.push({ name: 'login' })
        },
        navigateTo(route) {
            this.$router.push(route)
        },
        async deleteBlog(blog) {
            if (confirm("ต้องการลบข้อมูล?")) {
                try {
                    await BlogsService.delete(blog)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async refreshData() {
            this.blogs = (await BlogsService.index()).data
        },
        filterBlogs(category) {
            this.filter = category
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.count {
    font-weight: bold;
    color: #007bff;
    text-align: center;
}

.search-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s;
}

.search-input:focus {
    border-color: #007bff;
}

.filter-buttons {
    margin: 0px 0;
    display: flex;
    justify-content: center; /* จัดให้อยู่ตรงกลาง */
    flex-wrap: wrap; /* อนุญาตให้แถวใหม่เมื่อไม่มีที่พอ */
}

.btn {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    margin: 5px; /* ใช้ margin สำหรับระยะห่าง */
    transition: background-color 0.3s, transform 0.2s;
}

.btn-category {
    background-color: #007bff;
    color: white;
}

.btn-category:hover {
    background-color: #0056b3;
}

.btn-add {
    background-color: #28a745;
    color: white;
}

.btn-add:hover {
    background-color: #218838;
}

.animal-list {
    margin-top: 20px;
}

.animal-card {
    padding: 15px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

.animal-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.animal-image {
    width: 470px; /* เปลี่ยนความกว้างของรูป */
    height: 200px; /* เปลี่ยนความสูงของรูป */
    object-fit: cover; /* ให้รูปภาพปรับขนาดตามกรอบ */
    margin-bottom: 10px;
}
.animal-card p {
    margin: 5px 0;
}

.button-group {
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
}

.btn-view {
    background-color: #17a2b8;
    color: white;
}

.btn-edit {
    background-color: #ffc107;
    color: black;
}

.btn-delete {
    background-color: #dc3545;
    color: white;
}

.btn-view:hover {
    background-color: #138496;
}

.btn-edit:hover {
    background-color: #e0a800;
}

.btn-delete:hover {
    background-color: #c82333;
}
</style>
