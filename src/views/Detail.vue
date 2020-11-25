<template>
  <div class="comments">
    <ul v-for="comment in comments" :key="comment.id">
      <li>
        <p v-html="comment.text" class="comment"></p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data: function () {
    return {
      url: "https://hn-api-vue.herokuapp.com/",
      comments: [],
    };
  },
  methods: {
    getComments: async function () {
      let response = null;

      response = await fetch(this.url + "comments/" + this.$route.params.id);

      this.comments = await response.json();
    },
  },
  mounted: function () {
    this.getComments();
  },
};
</script>

<style scoped>
.comment {
  border: 1px solid black;
}
</style>