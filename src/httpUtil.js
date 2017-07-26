import axios from 'axios';

export function get(url) {
  //data tanne
  return axios({
    method: 'GET',
    url: url
  });
}

export function post(url, data) {
  // naya data create garne
  return axios({
    method: 'POST',
    url: url,
    data: data
  });
}

export function put(url, id, data) {
  // update

  return axios({
      method: 'put',
      url: `${url}/${id}`,
      data: data

  })
}

export function remove(url, id) {
  // delete
  return axios({
    method: 'delete',
    url: `${url}/${id}`
  })
}