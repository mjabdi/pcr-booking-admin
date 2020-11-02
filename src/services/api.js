import axios from 'axios';

export default axios.create({
  // baseURL: window.location.href,
  baseURL: 'http://localhost:9090',
  headers : {
      'Authorization' : 'Basic QXp1cmXEaWFtb45kOmh1bnRlcjO='
  }
});