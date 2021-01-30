<template>
  <div class="articles">
    <div v-for="article in articles" :key="article.id">
      <div class="post">
        <a v-if="article.url" v-bind:href="article.url" target="blank">
          <h2>{{ article.title }}</h2>
        </a>
        <a
          v-else
          v-bind:href="'https://news.ycombinator.com/item?id=' + article.id"
          target="blank"
        >
          <h2>{{ article.title }}</h2>
        </a>

        <router-link :to="'article/' + article.id">detail</router-link>
        <div class="score">{{ article.score }}</div>
        <a
          v-bind:href="'https://news.ycombinator.com/item?id=' + article.id"
          target="blank"
          >hn link</a
        >
        <p>{{ new Date(article.time * 1000).toLocaleString() }}</p>

        <button v-on:click="toggleComments(article.id)">...</button>
        <div v-if="comments[article.id]">
          <div v-if="comments[article.id].visible">
            <CommentsTree
              v-for="comment in comments[article.id].text"
              :key="comment.id"
              :comment="comment"
              :depth="0"
            />
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
//v-if="!!comments[article.id]"
import CommentsTree from "@/components/CommentsTree.vue";
export default {
  name: "ArticleList",
  components: {
    CommentsTree,
  },
  props: {
    mode: {
      validator: function (value) {
        return ["new", "best"].indexOf(value) !== -1;
      },
    },
  },
  data: () => {
    return {
      url: "https://hn-api-vue.herokuapp.com/",
      articles: [],
      loading: true,
      comments: {},
    };
  },
  methods: {
    async fetchArticles() {
      let response = null;

      response = await fetch(this.url + this.mode);

      this.articles = await response.json();
    },
    async fetchComments(id) {
      //TODO close comments
      //TODO comment cashing
      let response = null;

      response = await fetch(this.url + "comments/" + id + "/0");
      let body = await response.json();

      let articleComments = {};

      articleComments.text = [];
      for (let item of body) {
        articleComments.text.push(item);
      }
      articleComments.visible = true;
      this.$set(this.comments, id, articleComments);
    },
    toggleComments(id) {
      if (!this.comments[id]) {
        this.fetchComments(id);
        return;
      }
      this.comments[id].visible = !this.comments[id].visible;
      this.$set(this.comments, id, this.comments[id]);
    },
  },
  mounted: function () {
    this.fetchArticles();
  },
  filters: {},
};
</script>

<style scoped>
.comment {
  border: 1px solid grey;
  padding: 5px;
}

.comments {
  list-style: none;
}
</style>