import Axios from './Axios';

export async function searchAPI(searchText) {
  return Axios.get(`/user/search/${searchText}`)
    .then(res => {
      return res.data;
    })
    .catch(e => console.log(e, 'error in search api'));
}
