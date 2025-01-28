import axios from 'axios';

const VK_CLIENT_ID = process.env.VK_CLIENT_ID!;
const VK_CLIENT_SECRET = process.env.VK_CLIENT_SECRET!;
const VK_REDIRECT_URI = process.env.VK_REDIRECT_URI!;
const VK_TOKEN = process.env.VK_TOKEN!;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN!;
const AUTHORIZATION_CODE = process.env.AUTHORIZATION_CODE!;

export const tokens = {
  access: VK_TOKEN,
  refresh: REFRESH_TOKEN,
};

export const axiosInstance = axios.create();

export async function getAccessToken() {
  try {
    const response = await axios.get('https://oauth.vk.com/access_token', {
      params: {
        client_id: VK_CLIENT_ID,
        client_secret: VK_CLIENT_SECRET,
        redirect_uri: VK_REDIRECT_URI,
        code: AUTHORIZATION_CODE,
      },
    });

    console.log(response.data);

    console.log('Access Token:', response.data.access_token);
    console.log('Refresh Token:', response.data.refresh_token);

    return response.data;
  } catch (error) {
    console.error('Ошибка получения access_token:', error);
  }
}

// async function refreshAccessToken() {
//   try {
//     console.log('Обновление токена...');
//     const response = await axiosInstance.get(
//       'https://oauth.vk.com/access_token',
//       {
//         params: {
//           client_id: VK_CLIENT_ID,
//           client_secret: VK_CLIENT_SECRET,
//           redirect_uri: VK_REDIRECT_URI,
//           grant_type: 'refresh_token',
//           refresh_token: tokens.refresh,
//         },
//       }
//     );

//     console.log(response);

//     if (response.data.access_token) {
//       tokens.access = response.data.access_token;
//       tokens.refresh = response.data.refresh_token;
//       console.log('Токен обновлён:', tokens.access);
//     } else {
//       throw new Error('Не удалось обновить токен');
//     }
//   } catch (error) {
//     console.error('Ошибка при обновлении токена:', error);
//   }
// }

// axiosInstance.interceptors.response.use(
//   async response => {
//     if (response.data.error?.error_code === 5) {
//       const originalRequest = response.config;

//       //@ts-ignore
//       if (!originalRequest._isRetry) {
//         //@ts-ignore
//         originalRequest._isRetry = true;

//         await refreshAccessToken();

//         originalRequest.params.access_token = tokens.access;

//         return axiosInstance(originalRequest);
//       }
//     }

//     return response;
//   },
//   error => error
// );
