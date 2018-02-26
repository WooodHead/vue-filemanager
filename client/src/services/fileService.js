import Api from '@/services/Api';
var querystring = require('querystring');
export default {
  list(path) {
    var pathStr = '/' + path.join('/');
    console.log('pathStr', pathStr);
    var query = querystring.stringify({
      path: pathStr
    });
    console.log('query', query);
    return Api().get('files' + '?' + query);
  }
};
