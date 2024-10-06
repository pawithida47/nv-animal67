<template>
    <div>
        <h2>ส่วนจัดการสัตว์</h2>
        <p><button v-on:click="logout">ออกจากระบบ</button></p>
        
        <!-- จำนวนสัตว์ -->
        <h4>จำนวนสัตว์ {{ filteredBlogs.length }}</h4>

        <!-- กล่องค้นหา -->
        <div>
            <input type="text" v-model="searchQuery" placeholder="ค้นหา" />
        </div><br>

        <!-- ปุ่มแบ่งประเภทสัตว์ -->
        <div>
            <button v-on:click="filterBlogs('ทั้งหมด')">แสดงทั้งหมด</button> 
            <button v-on:click="filterBlogs('สัตว์เลี้ยงลูกด้วยนม')">สัตว์เลี้ยงลูกด้วยนม</button>
            <button v-on:click="filterBlogs('สัตว์ปีก')">สัตว์ปีก</button>
            <button v-on:click="filterBlogs('สัตว์เลี้ยงเลื้อยคลาน')">สัตว์เลี้ยงเลื้อยคลาน</button>
            <button v-on:click="filterBlogs('สัตว์ครึ่งบกครึ่งน้ำ')">สัตว์ครึ่งบกครึ่งน้ำ</button> 
            <button v-on:click="filterBlogs('สัตว์น้ำ')">สัตว์น้ำ</button>
        </div>

        <!-- ปุ่มเพิ่มสัตว์ -->
        <p><button v-on:click="navigateTo('/blog/create')">เพิ่มสัตว์</button></p>

        <!-- รายการสัตว์ -->
        <div v-for="blog in filteredBlogs" v-bind:key="blog.id">
            <p>รหัส: {{ blog.id }}</p>
            <p>ชื่อ: {{ blog.name }}</p>
            <p>ที่อยู่อาศัย: {{ blog.habitat }}</p>
            <p>อาหาร: {{ blog.food }}</p>
            <p>ประเภท: {{ blog.status }}</p>
            <p>
                <button v-on:click="navigateTo('/blog/' + blog.id)">ดู</button>
                <button v-on:click="navigateTo('/blog/edit/' + blog.id)">แก้ไข</button>
                <button v-on:click="deleteBlog(blog)">ลบข้อมูล</button>
            </p>
            <hr>
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
</style>
