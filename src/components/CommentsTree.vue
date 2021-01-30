<template>
  <div>
    <div :style="commentStyle" :class="{ first: depth == 0 }" class="comment">
      <small>
        <span>{{ comment.by }}</span>
        <span>|{{ new Date(comment.time * 1000).toLocaleString() }}</span>
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
      colors: ["blue", "orange", "yellow", "pink"],
    };
  },
  computed: {
    commentStyle() {
      //"margin-left": `${this.depth * 1.5}em`,

      return {
        "margin-left": `${this.depth * 1.5}em`,
        "border-left": `3px solid ${
          this.depth == 0 ? "red" : this.colors[this.depth % this.colors.length]
        }`,
      };
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