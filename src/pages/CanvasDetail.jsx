// 캔버스 클릭시 들어가는 컴포넌트.
import { useParams } from 'react-router-dom';
import CanvasTitle from '../components/CanvasTitle';
import LeanCanvas from '../components/LeanCanvas';
import { useEffect, useState } from 'react';
import { getCanvasById, updateCanvas, updateTitle } from '../api/canvas';

function CanvasDetail() {
  const { id } = useParams();
  // 현재 캔버스의 상태
  const [canvas, setCanvas] = useState();

  useEffect(() => {
    const fetchCanvas = async () => {
      const data = await getCanvasById(id);
      setCanvas(data);
    };
    fetchCanvas();
  }, [id]);

  // 타이틀이 바뀌었을 때, 그걸 서버에 저장하는 함수.
  const handleTitleChange = async title => {
    try {
      // 이 ID에 해당하는 캔버스의 제목을 이걸로 바꿔줘라고 요청.
      await updateTitle(id, title);
    } catch (err) {
      alert(err.message);
    }
  };

  // 업데이트 이벤트핸들러
  // updatedCanvas: 수정된 캔버스
  const handleCanvasChange = async updatedCanvas => {
    try {
      await updateCanvas(id, updatedCanvas);
      // 업데이트 된 캔버스를 화면에 보여줌.
      setCanvas(updatedCanvas);
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div>
      <CanvasTitle value={canvas?.title} onChange={handleTitleChange} />
      {canvas && (
        <LeanCanvas canvas={canvas} onCanvasChange={handleCanvasChange} />
      )}
    </div>
  );
}

export default CanvasDetail;
