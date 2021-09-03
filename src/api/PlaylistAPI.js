import axios from 'axios';

const getFeaturedPlaylist = async () => {
  return await axios.get('https://afternoon-waters-49321.herokuapp.com/v1/browse/featured-playlists').then(r => r.data);
}

const getPlayListDetails = async (id) => {
  return id ? await axios.get(`https://afternoon-waters-49321.herokuapp.com/v1/playlists/${id}`).then(r => r.data) : [];
}

export default {
  getFeaturedPlaylist,
  getPlayListDetails,
}
