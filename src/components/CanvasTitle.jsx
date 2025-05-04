// 캔버스 타이틀 컴포넌트.

import { useEffect, useState } from 'react';
import { FaCheck, FaEdit } from 'react-icons/fa';

// 타이틀 수정방법
// 1. 제목부분과 클릭시 수정할 수 있는 input 두개를 만든다.
function CanvasTitle({ value, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  // 수정이 완료된 타이틀 상태
  const [title, setTitle] = useState(value);

  useEffect(() => {
    setTitle(value);
  }, [value]);

  // 수정모드로 진입할 수 있는 함수
  const handleEditTitle = () => {
    setIsEditing(true);
  };

  const handleDoneTitle = () => {
    setIsEditing(false);
    onChange(title);
  };

  return (
    <div className="flex items-center justify-center mb-10">
      {/* 수정 모드일 경우에는 input이 나오는 수정모드 아닐때는 타이틀 모드 */}
      {isEditing ? (
        <div className="flex items-center">
          <input
            type="text"
            className="text-4xl font-bold text-center text-blue-600 bg-transparent border-b-2 border-blue-600 focus:outline-none"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button
            className="ml-2 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            aria-label="Save title"
            onClick={handleDoneTitle}
          >
            <FaCheck />
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center ">{title}</h1>
          <button
            className="ml-2 p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            aria-label="Edit title"
            onClick={handleEditTitle}
          >
            <FaEdit />
          </button>
        </>
      )}
    </div>
  );
}

export default CanvasTitle;
