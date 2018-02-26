import Api from '@/services/Api';

export default {
  index(search) {
    console.log('search', search);
    return Api().get('repos', {
      params: search
    });
  }
};
