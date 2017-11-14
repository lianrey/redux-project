const headers = {
  'Authorization': 'whatever-you-want'
}

export const getAllPosts = () =>
  fetch(`${process.env.REACT_APP_BACKEND}/posts`, { headers: headers } )
    .then(res => res.json())
    .then((posts) => posts);

export const getAllCategories = () =>
  fetch(`${process.env.REACT_APP_BACKEND}/categories`, { headers: headers } )
    .then(res => res.json())
    .then((categories) => categories);
