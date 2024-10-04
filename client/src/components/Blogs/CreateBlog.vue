<template>
  <div>
    <h1>add animal</h1>
    <form v-on:submit.prevent="createBlog">
      <p>
        ชื่อ:
        <input type="text" v-model="blog.name" />
      </p>
      p><strong>content: </strong></p> 
<p><vue-ckeditor 
v-model.lazy="blog.content" 
:config="config" 
@blur="onBlur($event)" @focus="onFocus($event)" /></p> 
      <p>ที่อยู่อาศัย:
      <input type="text" v-model="blog.habitat" />
    </p>
      <p>
        อาหาร:
        <input type="text" v-model="blog.food" />
      </p>
      <p>
        ประเภท:
        <input type="text" v-model="blog.status" />
      </p>
      <p>
        <button type="submit">add</button>
      </p>
    </form>
  </div>
</template>
<script>
import BlogsService from "@/services/BlogsService";
import VueCkeditor from "vue-ckeditor2";

export default {
  components: { VueCkeditor },
  data() {
    return {
      blog: {
        title: "",
        thumbnail: "null",
        pictures: "null",
        content: "",
        category: "",
        status: "",
      },
      config: {
        toolbar: [
          ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript"],
        ],
        height: 300,
      },
    };
  },
  methods: {
    async createBlog() {
      try {
        await BlogsService.post(this.blog);
        this.$router.push({
          name: "blogs",
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
}
components: {  
VueCkeditor  
}

</script>
<style scoped>

</style>
