import * as ReadableAPI from '../ReadableAPI';

export const GET_POSTS = 'GET_POSTS';
export const GET_CATEGORIES = 'GET_CATEGORIES'

export const getPosts = posts => ({
  type: GET_POSTS,
  posts
});

export const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
})

export const fetchPostsWithRedux = () => dispatch => (
  ReadableAPI
    .getAllPosts()
    .then((data) => dispatch(getPosts(data)))
);

export const fetchCategoriesWithRedux = () => dispatch => (
  ReadableAPI
    .getAllCategories()
    .then((data) => dispatch(getCategories(data)))
);
