<template>
  <div>
    <h2>Article Title</h2>
    <CommentsTree
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      :depth="0"
    />
  </div>
</template>

<script>
import CommentsTree from "@/components/CommentsTree.vue";
export default {
  name: "Detail",
  components: {
    CommentsTree,
  },
  data: function () {
    return {
      url: "https://hn-api-vue.herokuapp.com/",
      comments: [],
      replyDepth: 4,
    };
  },
  methods: {
    getComments: async function () {
      let response = null;

      response = await fetch(
        this.url + "comments/" + this.$route.params.id + "/" + this.replyDepth
      );

      this.comments = await response.json();
    },
  },
  mounted: function () {
    this.getComments();
  },
};
</script>
