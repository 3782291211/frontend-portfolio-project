import axios from "axios";

const newsApi = axios.create({
  baseURL: 'https://majids-backend-api-project.onrender.com/api'
});

export const fetchArticles = (topic, sortBy, limit = 50) => {
  return newsApi.get('/articles', { params: { topic , sortBy, limit} })
  .then(res => res.data);
};

export const fetchSingleArticle = articleId => {
  return newsApi.get(`/articles/${articleId}`)
  .then(res => res.data);
};

export const fetchComments = articleId => {
  return newsApi.get(`articles/${articleId}/comments?limit=50`)
  .then(res => res.data);
};

export const updateCommentVotes = (articleOrComments, id, voteModifier) => {
  return newsApi.patch(`${articleOrComments}s/${id}`, {"inc_votes": voteModifier})
  .then(({data}) => articleOrComments === 'article' ? data.article : data.comment);
};

export const postNewComment = (articleId, body, username) => {
  return newsApi.post(`articles/${articleId}/comments`, {username, body})
  .then(({data: {comment}}) => comment);
};

export const fetchUsers = () => {
  return newsApi.get('users').then(res => res.data);
};

export const fetchTopics = () => {
  return newsApi.get('/topics')
  .then(res => res.data);
}