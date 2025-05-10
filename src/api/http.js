import axios from 'axios';

function create(baseURL, option) {
  const instance = axios.create(Object.assign({ baseURL }), option);
  return instance;
}

export const canvases = create(
  'https://json-server-vercel-vert-phi.vercel.app/canvases',
);
// export const canvases = create('http://localhost:8000/canvases/');
