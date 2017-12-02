import * as ReadableAPI from '../ReadableAPI';

export const GET_POSTS = 'GET_POSTS';
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_SELECTIONS = 'GET_SELECTIONS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_VOTES = 'UPDATE_VOTES'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT_VOTES = 'UPDATE_COMMENT_VOTES'

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

export const editPost = (post) => ({
  type: EDIT_POST,
  post
})

export const deletePost = (posts) => ({
  type: DELETE_POST,
  posts
})

export const updateVotes = ({ postId, voteType }) => ({
  type: UPDATE_VOTES,
  postId,
  voteType
})

export const deleteComment = ({postId, commentId}) => ({
  type: DELETE_COMMENT,
  postId,
  commentId
})

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
})

export const updateCommentVotes = ({ comment, voteType}) => ({
  type: UPDATE_COMMENT_VOTES,
  comment,
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

export const editPostRedux = (post) => dispatch => (
  ReadableAPI
    .editPost(post)
    .then(dispatch(editPost(post)))
);

export const deletePostRedux = (id) => dispatch => (
  ReadableAPI
    .deletePost(id)
    .then(dispatch(deletePost(id)))
);

export const updateVotesRedux = (postId, voteType) => dispatch => (
  ReadableAPI
    .updateVotes(postId, voteType)
    .then(dispatch(updateVotes({postId, voteType})))
);

export const deleteCommentRedux = (postId, commentId) => dispatch => (
  ReadableAPI
    .deleteComment(commentId)
    .then(dispatch(deleteComment({postId, commentId})))
);

export const addCommentRedux = (comment) => dispatch => (
  ReadableAPI
    .addComment(comment)
    .then(dispatch(addComment(comment)))
);

export const updateCommentVotesRedux = (comment, voteType) => dispatch => (
  ReadableAPI
    .updateCommentVotes(comment, voteType)
    .then(dispatch(updateCommentVotes({comment, voteType})))
);

export const editCommentRedux = (comment) => dispatch => (
  ReadableAPI
    .editComment(comment)
    .then()
);
