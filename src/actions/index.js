import * as ReadableAPI from '../ReadableAPI';

export const GET_POSTS = 'GET_POSTS';

export const getPosts = posts => ({
  type: GET_POSTS,
  posts
});

export const fetchPostsWithRedux = () => dispatch => (
  ReadableAPI
    .getAllPosts()
    .then((data) => dispatch(getPosts(data)))
);
