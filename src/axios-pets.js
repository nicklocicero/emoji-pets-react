import axios from 'axios';

const instance = axios.create({
  baseURL: "https://emojipets.firebaseio.com"
})

export default instance;