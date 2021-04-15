import axios from 'axios';

//var server = 'http://127.0.0.1:8000';
export const api = axios.create({
    baseURL: `http://127.0.0.1:8000`,
    // headers: {
    //   Authorization: 'Bearer {token}'
    // }
  });

//  const api = axios.create({
//     baseURL: 'http://127.0.0.1:8000',
//     headers: {
//       Authorization: 'Bearer {token}'
//     }
//   });
//   export default ({
//     api
//   })
 // export default new Vuex.Store({
//   state,
//   mutations
// })

// export default ({ requiresAuth = false } = {}) => {
//   const options = {};
//   options.baseURL = 'http://127.0.0.1:8000';

//   //? Decide add token or not
//   if (requiresAuth) {
//     options.headers.Authorization = 'Bearer {token}'
//   }
//   const instance = axios.create(options);
//   return instance;
// };