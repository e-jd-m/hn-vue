<template>
  <div class="new">
    <ArticleList mode="new" />
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
