<template>
  <div class="best">
    <ArticleList mode="best" />
  </div>
</template>

<script>
// @ is an alias to /src
import ArticleList from "@/components/ArticleList.vue";

export default {
  name: "Home",
  components: {
    ArticleList,
  },
};
</script>
