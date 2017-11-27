const headers = {
  'Authorization': 'whatever-you-want'
}

function sortByVoteScore(a, b){
  return b.voteScore - a.voteScore;
}

function sortByTimeStamp(a, b){
  return b.timestamp - a.timestamp;
}

export const getAllPosts = (byCategory, sortType) =>
  fetch(`${process.env.REACT_APP_BACKEND}/posts`, { headers: headers } )
    .then(res => res.json())
    .then((posts) => {
      let activePosts = posts;
      let postsArray;
      if(!byCategory) {
        postsArray = activePosts;
      }
      else{
        postsArray = activePosts.filter(p => p.category === byCategory);
      }
      if(!sortType){
        return postsArray.sort(sortByVoteScore);
      }
      else if(sortType === "voteScore"){
        return postsArray.sort(sortByVoteScore);
      }
      else{
        return postsArray.sort(sortByTimeStamp);
      }
    });

export const getAllCategories = () =>
  fetch(`${process.env.REACT_APP_BACKEND}/categories`, { headers: headers } )
    .then(res => res.json())
    .then((categories) => categories);

export const addPost = (body) =>
  fetch(`${process.env.REACT_APP_BACKEND}/posts`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
  }).then(res => res.json())

export const deletePost = (id) =>
  fetch(`${process.env.REACT_APP_BACKEND}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }
  }).then(res => res.json())

export const updateVotes = (id, type) =>
  fetch(`${process.env.REACT_APP_BACKEND}/posts/${id}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "option": type })
  }).then(res => res.json())
