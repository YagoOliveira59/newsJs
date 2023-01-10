<template>
  <div class="mb-2 header-container">
    <input
      type="text"
      class="form-control"
      id="exampleFormControlInput1"
      placeholder="search"
      v-model="filters.search"
      style="width: 50%"
    />
    <div class="filters-btn-container">
      <template v-for="item in categories" :key="item.tag">
        <input
          type="radio"
          class="btn-check"
          :id="`btn-check` + item.tag"
          name="options"
          checked
          autocomplete="off"
          :value="item.value"
          v-model="filters.category"
        />
        <label
          class="btn btn-primary btn-filter"
          :for="`btn-check` + item.tag"
          >{{ item.name }}</label
        >
      </template>
    </div>
  </div>
  <p style="justify-content: end; display: flex; opacity: 0.6">
    <em>{{ articles.length }} results found</em>
  </p>
  <div class="row row-cols-1 row-cols-lg-1 g-2 pt-3">
    <div class="col-6 col-sm-4" v-for="article in articles" :key="article">
      <ArticleItem :articleItem="article" />
    </div>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useArticleStore } from "../stores/articles";
import ArticleItem from "./ArticleItem.vue";

export default {
  components: {
    ArticleItem,
  },
  data() {
    return {
      articlesDb: [],
      filters: {
        search: "",
        category: "",
      },
      selectedArticle: {},
    };
  },
  setup() {
    const store = useArticleStore();
    const { data } = storeToRefs(store);
    const { fetchArticles } = store;
    const categories = [
      { name: "All", tag: "all", value: "" },
      { name: "Apple", tag: "apple", value: "Apple" },
      { name: "Tesla", tag: "tesla", value: "Tesla" },
      { name: "Business", tag: "business", value: "Business" },
      { name: "Tech", tag: "tech", value: "Tech" },
      { name: "Wall Street", tag: "wallStreet", value: "Wall Street" },
    ];
    return {
      data,
      fetchArticles,
      categories,
    };
  },
  async created() {
    this.fetchArticles();
  },
  computed: {
    articles() {
      return this.data.filter((article) => {
        let valid = true;
        if (this.filters.category.length && !this.filters.search.length) {
          valid = article.section === this.filters.category;
        }
        if (
          this.filters.search.length &&
          article.title &&
          article.description &&
          !this.filters.category.length
        ) {
          valid =
            article.title
              .toLowerCase()
              .includes(this.filters.search.toLowerCase()) ||
            (article.description
              .toLowerCase()
              .includes(this.filters.search.toLowerCase()) &&
              valid);
        }
        if (
          this.filters.search.length &&
          article.description &&
          this.filters.category.length
        ) {
          valid =
            (article.title
              .toLowerCase()
              .includes(this.filters.search.toLowerCase()) &&
              article.section === this.filters.category &&
              valid) ||
            (article.description
              .toLowerCase()
              .includes(this.filters.search.toLowerCase()) &&
              article.section === this.filters.category &&
              valid);
        }
        if (!article.description) valid = false;
        return valid;
      });
    },
  },
};
</script>

<style></style>
