<template>
    <div>
        <h2>ส่วนจัดการสัตว์</h2>
        <p><button v-on:click="logout">Logout</button></p>
        <h4>จำนวน animal {{blogs.length}}</h4>
        <p><button v-on:click="navigateTo('/blog/create')">add animal</button></p>
        <div v-for="blog in blogs" v-bind:key="blog.id">
            <p>id: {{ blog.id }}</p>
            <p>ชื่อ: {{ blog.name }}</p>
            <p>ที่อยู่อาศัย: {{ blog.habitat }}</p>
            <p>อาหาร: {{ blog.food }}</p>
            <p>ประเภท: {{ blog.status }}</p>
            <p>
            <button v-on:click="navigateTo('/blog/'+ blog.id)">ดู</button>
            <button v-on:click="navigateTo('/blog/edit/'+ blog.id)">แก้ไข</button>
            <button v-on:click="deleteBlog(blog)">ลบข้อมูล</button>
            </p>
            <hr>
        </div>
    </div>
</template>
<script>
    import BlogsService from '@/services/BlogsService'
    export default {
        data () {
            return {
                blogs: []
            }
        },
        async created () {
            this.blogs = (await BlogsService.index()).data
        },
        methods: {
            logout () {
                this.$store.dispatch('setToken', null)
                this.$store.dispatch('setBlog', null)
                this.$router.push({
                    name: 'login'
                })
            },
            navigateTo (route) {
                this.$router.push(route)
            },
            async deleteBlog (blog) {
                let result = confirm("Want to delete?")
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
            }
        }
    }
</script>
<style scoped>
</style>