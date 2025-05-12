import axios from 'axios';

function create(baseURL, option) {
  const instance = axios.create(Object.assign({ baseURL }), option);
  return instance;
}

console.log('MODE: ', import.meta.env.VITE_API_BASE_URL);
// 서버(vercel) 주소
// export const canvases = create(
//   'https://json-server-vercel-vert-phi.vercel.app/canvases',
// );
export const canvases = create(
  `${import.meta.env.VITE_API_BASE_URL}/canvases/`,
);
