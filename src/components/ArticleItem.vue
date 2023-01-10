<template>
  <div class="card card-article mb-3">
    <div class="row g-0 card-container">
      <div class="col-md-3 image-container">
        <img
          v-if="articleItem.urlToImage"
          :src="articleItem.urlToImage"
          class="mx-auto d-block article-image"
          alt="article image"
        />
      </div>
      <div class="col-md-9 article-container">
        <div class="card-body article-body">
          <h5 class="article-title">{{ articleItem.title }}</h5>
          <p class="article-desc">{{ articleItem.description }}</p>

          <div style="display: flex; justify-content: space-between">
            <div style="display: flex; gap: 20px">
              <p class="card-text text-opacity">
                <small class="text-muted">{{ articleItem.author }}</small>
              </p>
              <p class="card-text text-opacity">
                <small class="text-muted">{{ articleItem.publishedAt }}</small>
              </p>
            </div>
            <a
              class="btn btn-primary"
              :href="articleItem.url"
              target="_blank"
              role="button"
              >Read More</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articleItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      selectedArticle: {},
    };
  },
};
</script>

<style scoped></style>
