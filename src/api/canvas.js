import { canvases } from './http';

// 목록 조회
export function getCanvases() {
  return canvases.get('/');
}
