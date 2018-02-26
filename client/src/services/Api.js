import axios from 'axios';

export default () => {
  return axios.create({
    baseURL: 'http://localhost:7080/api'
  });
};
