<template>
    <div class="container">
        <h2>ส่วนจัดการสัตว์</h2>
        <p><button class="btn btn-logout" @click="logout">ออกจากระบบ</button></p>
        
        <!-- จำนวนสัตว์ -->
        <h4 class="count">จำนวนสัตว์: {{ filteredBlogs.length }}</h4>

        <!-- กล่องค้นหา -->
        <div>
            <input class="search-input" type="text" v-model="searchQuery" placeholder="ค้นหา" />
        </div><br>

        <!-- ปุ่มแบ่งประเภทสัตว์ -->
        <div class="filter-buttons">
            <button class="btn btn-category" @click="filterBlogs('ทั้งหมด')">แสดงทั้งหมด</button> 
            <button class="btn btn-category" @click="filterBlogs('สัตว์เลี้ยงลูกด้วยนม')">สัตว์เลี้ยงลูกด้วยนม</button>
            <button class="btn btn-category" @click="filterBlogs('สัตว์ปีก')">สัตว์ปีก</button>
            <button class="btn btn-category" @click="filterBlogs('สัตว์เลี้ยงเลื้อยคลาน')">สัตว์เลี้ยงเลื้อยคลาน</button>
            <button class="btn btn-category" @click="filterBlogs('สัตว์ครึ่งบกครึ่งน้ำ')">สัตว์ครึ่งบกครึ่งน้ำ</button> 
            <button class="btn btn-category" @click="filterBlogs('สัตว์น้ำ')">สัตว์น้ำ</button>
        </div>

        <!-- ปุ่มเพิ่มสัตว์ -->
        <p><button class="btn btn-add" @click="navigateTo('/blog/create')">เพิ่มสัตว์</button></p>

        <!-- รายการสัตว์ -->
        <div class="animal-list">
            <div v-for="blog in filteredBlogs" v-bind:key="blog.id" class="animal-card">
                <p><strong>รหัส:</strong> {{ blog.id }}</p>
                <p><strong>ชื่อ:</strong> {{ blog.name }}</p>
                <p><strong>ที่อยู่อาศัย:</strong> {{ blog.habitat }}</p>
                <p><strong>อาหาร:</strong> {{ blog.food }}</p>
                <p><strong>ประเภท:</strong> {{ blog.status }}</p>
                <div>
                    <button class="btn btn-view" @click="navigateTo('/blog/' + blog.id)">ดู</button>
                    <button class="btn btn-edit" @click="navigateTo('/blog/edit/' + blog.id)">แก้ไข</button>
                    <button class="btn btn-delete" @click="deleteBlog(blog)">ลบข้อมูล</button>
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
            filter: 'ทั้งหมด',  // ตัวกรองเริ่มต้นแสดงทั้งหมด
            searchQuery: ''      // ค่าการค้นหาเริ่มต้นเป็นว่าง
        }
    },
    computed: {
        filteredBlogs() {
            // กรองข้อมูลสัตว์ตามประเภท
            let filtered = this.filter === 'ทั้งหมด' ? this.blogs : this.blogs.filter(blog => blog.status === this.filter);
            
            // กรองข้อมูลสัตว์ตาม ID, ชื่อ หรือ ที่อยู่อาศัย
            if (this.searchQuery) {
                filtered = filtered.filter(blog => {
                    const lowerSearchQuery = this.searchQuery.toLowerCase();
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
            this.$router.push({
                name: 'login'
            })
        },
        navigateTo(route) {
            this.$router.push(route)
        },
        async deleteBlog(blog) {
            let result = confirm("ต้องการลบข้อมูลหรือไม่?")
            if (result) {
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
            this.filter = category  // กำหนดตัวกรองตามประเภทที่เลือก
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
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
}

.filter-buttons {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
}

.btn {
    padding: 8px 12px; /* เปลี่ยนขนาด padding */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px; /* ลดขนาดฟอนต์ */
    flex: 1; /* ให้ปุ่มขยายเต็มที่ */
    margin: 0 5px; /* เว้นระยะระหว่างปุ่ม */
    transition: background-color 0.3s, transform 0.2s; /* เพิ่มการเปลี่ยนแปลง */
}

.btn-category {
    background-color: #007bff;
    color: white;
}

.btn-category:hover {
    background-color: #0056b3; /* เปลี่ยนสีเมื่อ Hover */
}

.btn-add {
    background-color: #28a745;
    color: white;
}

.btn-add:hover {
    background-color: #218838; /* เปลี่ยนสีเมื่อ Hover */
}

.animal-list {
    margin-top: 20px;
}

.animal-card {
    padding: 15px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    transition: box-shadow 0.3s;
}

.animal-card:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* เพิ่มเงาเมื่อ Hover */
}

.animal-card p {
    margin: 5px 0;
}

.btn-view, .btn-edit, .btn-delete {
    margin-right: 5px;
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
    background-color: #138496; /* เปลี่ยนสีเมื่อ Hover */
}

.btn-edit:hover {
    background-color: #e0a800; /* เปลี่ยนสีเมื่อ Hover */
}

.btn-delete:hover {
    background-color: #c82333; /* เปลี่ยนสีเมื่อ Hover */
}
</style>
