<template>
  <div>
    <div :style="commentStyle" :class="{ first: depth == 0 }" class="comment">
      <small>
        <span>{{ comment.by }}</span>
        <span>|{{ new Date(comment.time * 1000).toLocaleString() }}</span>
        | {{ depth }}
      </small>
      <div v-html="comment.text"></div>
    </div>
    <CommentsTree
      v-for="reply in comment.kids"
      :key="reply.id"
      :comment="reply"
      :depth="depth + 1"
    />
  </div>
</template>

<script>
export default {
  name: "CommentsTree",
  props: ["comment", "depth"],
  data: function () {
    return {
      colors: ["blue, red, orange"],
    };
  },
  computed: {
    commentStyle: {
      marginLeft: `${this.depth * 1.5}em`,
      borderLeft: `1px solid ${this.colors[this.depth % this.colors.length]}`,
    },
  },
};
</script>

<style scoped>
.comment {
  border: 1px solid grey;
  padding: 5px;
  margin: 1px;
}
.first {
  /*border: 2px solid var(--prim-color);*/
  margin-top: 5px;
}
</style>