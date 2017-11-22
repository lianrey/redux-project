import * as ReadableAPI from '../ReadableAPI';

export const GET_POSTS = 'GET_POSTS';
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_SELECTIONS = 'GET_SELECTIONS'
export const ADD_POST = 'ADD_POST'

export const getPosts = posts => ({
  type: GET_POSTS,
  posts
});

export const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
})

export const setSelection = ({ category, sortType }) => ({
  type: GET_SELECTIONS,
  category,
  sortType
})

export const addPost = (posts) => ({
  type: ADD_POST,
  posts
})

export const fetchPostsWithRedux = (byCategory, sortType) => dispatch => (
  ReadableAPI
    .getAllPosts(byCategory, sortType)
    .then((data) => dispatch(getPosts(data)))
);

export const fetchCategoriesWithRedux = () => dispatch => (
  ReadableAPI
    .getAllCategories()
    .then((data) => dispatch(getCategories(data)))
);

export const addPostRedux = (post) => dispatch => (
  ReadableAPI
    .addPost(post)
    .then(dispatch(addPost(post)))
);
