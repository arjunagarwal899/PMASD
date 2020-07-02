import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/';

// If axios is being used to login
const axiosLogin = axios.create({
  baseURL: baseURL,
});

// // If axios is being used after logging in
// const axiosLoggedIn = axios.create({
// 	baseURL: baseURL
// });
// axiosLoggedIn.default.headers = {
// 	"Content-Type": "application/json",
// 	Authentication: "Token "
// };

export { axiosLogin };
// export {axiosLogin, axiosLoggedIn};
