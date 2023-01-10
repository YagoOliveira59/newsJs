import axios from "axios";
import moment from "moment";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useArticleStore = defineStore("articles", () => {
  const data = ref([]);
  const key = "f61f29036c04423396ad485f20252b4a";
  async function fetchArticles() {
    const tesla = await fetchTeslaArticles();
    const apple = await fetchAppleArticles();
    const business = await fetchBusinessArticles();
    const techCrunch = await fetchTechCrunchArticles();
    const wallStreetJournal = await fetchWallStreetJournalArticles();
    this.data = tesla.concat(apple, business, techCrunch, wallStreetJournal);
  }
  async function fetchTeslaArticles() {
    let res = await axios.get(
      "https://newsapi.org/v2/everything?q=tesla&from=2022-12-10&sortBy=publishedAt&apiKey=" +
        key
    );
    return [
      ...new Set(
        res.data.articles.map((item) => {
          return {
            ...item,
            section: "Tesla",
            publishedAt: moment(item.publishedAt).fromNow(),
          };
        })
      ),
    ];
  }
  async function fetchAppleArticles() {
    let res = await axios.get(
      "https://newsapi.org/v2/everything?q=apple&from=2023-01-09&to=2023-01-09&sortBy=popularity&apiKey=" +
        key
    );
    return [
      ...new Set(
        res.data.articles.map((item) => {
          return {
            ...item,
            section: "Apple",
            publishedAt: moment(item.publishedAt).fromNow(),
          };
        })
      ),
    ];
  }
  async function fetchBusinessArticles() {
    let res = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=" +
        key
    );
    return [
      ...new Set(
        res.data.articles.map((item) => {
          return {
            ...item,
            section: "Business",
            publishedAt: moment(item.publishedAt).fromNow(),
          };
        })
      ),
    ];
  }
  async function fetchTechCrunchArticles() {
    let res = await axios.get(
      "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=" + key
    );
    return [
      ...new Set(
        res.data.articles.map((item) => {
          return {
            ...item,
            section: "Tech",
            publishedAt: moment(item.publishedAt).fromNow(),
          };
        })
      ),
    ];
  }
  async function fetchWallStreetJournalArticles() {
    let res = await axios.get(
      "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=" + key
    );
    return [
      ...new Set(
        res.data.articles.map((item) => {
          return {
            ...item,
            section: "Wall Street",
            publishedAt: moment(item.publishedAt).fromNow(),
          };
        })
      ),
    ];
  }

  return { data, fetchArticles };
});
