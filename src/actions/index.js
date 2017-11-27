import * as ReadableAPI from '../ReadableAPI';

export const GET_POSTS = 'GET_POSTS';
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_SELECTIONS = 'GET_SELECTIONS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_VOTES = 'UPDATE_VOTES'

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

export const deletePost = (posts) => ({
  type: DELETE_POST,
  posts
})

export const updateVotes = ({ id, voteType }) => ({
  type: UPDATE_VOTES,
  id,
  voteType
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

export const deletePostRedux = (id) => dispatch => (
  ReadableAPI
    .deletePost(id)
    .then(dispatch(deletePost(id)))
);

export const updateVotesRedux = (id, voteType) => dispatch => (
  ReadableAPI
    .updateVotes(id, voteType)
    .then(dispatch(updateVotes({id, voteType})))
);
