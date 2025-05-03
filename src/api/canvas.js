import { canvases } from './http';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { data } from 'react-router-dom';

// 목록 조회
export function getCanvases(params) {
  const payload = Object.assign(
    {
      _sort: 'lastModified',
      _order: 'desc',
    },
    params,
  );
  // .get()은 목록을 조회하는 것이므로, 조회한 데이터를 돌려줘야 하기 때문에 return을 사용. 즉, 서버에서 받아온 데이터를 다시 돌려주는 역할을 한다.
  return canvases.get('/', { params: payload });
}

// 생성
export function createCanvas() {
  const newCanvas = {
    title: uuidv4().substring(0, 4) + '_새로운 린 캔버스',
    lastModified: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    category: '신규',
  };
  // .post()는 새로운 캔버스를 생성하는 것이므로, 생성한 새 데이터를 다시 돌려줘야 하기 때문에 return을 사용한다. 즉, 새로 만들어진 캔버스 정보를 다시 돌려주는 역할을 한다.
  return canvases.post('/', newCanvas);
}

// 삭제
export async function deleteCanvas(id) {
  // .delete()는 삭제만 하고, 삭제된 데이터를 돌려줄 필요가 없으니 return을 사용하지 않는다.
  await canvases.delete(`/${id}`);
}

// 하나의 캔버스 조회
export async function getCanvasById(id) {
  const { data } = await canvases.get(`/${id}`);
  return data;
}

// 하나의 캔버스 타이틀만 업데이트
export async function updateTitle(id, title) {
  canvases.patch(`/${id}`, { title });
}
