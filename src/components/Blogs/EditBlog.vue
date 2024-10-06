<template>
    <div>
        <h1>Edit animal</h1>
        <form v-on:submit.prevent = "editBlog">
            <p>ชื่อ: <input type="text" v-model="blog.name"></p>
            <p>ที่อยู่อาศัย: <input type="text" v-model="blog.habitat" /></p>
            <p>อาหาร: <input type="text" v-model="blog.food"></p>
            <p>ประเภท: <input type="text" v-model="blog.status"></p>
            <p>
            <button type="submit">update blog</button>
            <button v-on:click="navigateTo('/blogs')">กลับ</button>
            </p>
        </form>
    </div>
</template>
<script>
import BlogsService from '@/services/BlogsService'
import VueCkeditor from "vue-ckeditor2"

export default {
    components: { VueCkeditor },
    data () {
        return {
            blog: {
                title: '',
                thumbnail: 'null',
                pictures: 'null',
                content: '',
                category: '',
                status: ''
            },
            config: {
                toolbar: [
                    ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript']
                ],
                height: 300
            },
        }
    },
    methods: {
        async editBlog () {
            try {
                await BlogsService.put(this.blog)
                this.$router.push({
                    name: 'blogs'
                })
            } catch (err) {
                console.log(err)
            }
        }

    },
    async created () {
        try {
            let blogId = this.$route.params.blogId
            this.blog = (await BlogsService.show(blogId)).data
            
        } catch (error) {
            console.log (error)
        }
    },



}
</script>
<style scoped>
</style>