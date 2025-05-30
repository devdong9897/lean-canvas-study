import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';

const Note = ({
  id,
  content,
  onRemoveNote,
  color: initialColor,
  onUpdateNote,
}) => {
  const [localContent, setLocalContent] = useState(content);

  const colorOptions = [
    'bg-yellow-300',
    'bg-pink-300',
    'bg-blue-300',
    'bg-green-300',
  ];

  // 메모색상 상태
  const [color, setColor] = useState(() => {
    // initialColor이라는 컬러 값이 있으면 그 색상을 사용.
    if (initialColor) return initialColor;

    // initialColor가 없으면, 랜덤하게 색상 중 하나를 선택
    // 랜덤 색상
    const randomIndex = Math.floor(Math.random() * colorOptions.length);
    return colorOptions[randomIndex];
  });

  // 수정모드 상태
  const [isEditing, setIsEditing] = useState(false);

  // 글작성시 스크롤나지 않게...
  const textareaRef = useRef(null);

  // 매번 화면이 그려질 때마다 textarea의 높이를 내용에 맞게 자동으로 조정하기 위해 useEffect사용
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        //  내용이 얼마나 들어 있는지에 따라 필요한 높이를 알려준다.
        textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  const handleContentChange = () => {
    onUpdateNote(id, localContent, color);
  };

  const handleColorChange = newColor => {
    setColor(newColor);
    onUpdateNote(id, content, newColor);
  };
  return (
    <div
      className={`p-4 ${color} relative max-h-[32rem] overflow-hidden`}
      onClick={() => setIsEditing(true)}
    >
      <div className="absolute top-2 right-2">
        {/* 수정모드일 때는 체크표시 아닐때는 x표시 */}
        {isEditing ? (
          <button
            aria-label="Check Note"
            className="text-gray-700"
            onClick={e => {
              e.stopPropagation();
              setIsEditing(false);
            }}
          >
            <AiOutlineCheck size={20} />
          </button>
        ) : (
          <button
            aria-label="Close Note"
            className="text-gray-700"
            onClick={e => {
              e.stopPropagation();
              onRemoveNote(id);
            }}
          >
            <AiOutlineClose size={20} />
          </button>
        )}
      </div>
      <textarea
        ref={textareaRef}
        value={localContent}
        onChange={e => setLocalContent(e.target.value)}
        onBlur={handleContentChange}
        className={`w-full h-full bg-transparent resize-none border-none focus:outline-none text-gray-900 overflow-hidden`}
        aria-label="Edit Note"
        placeholder="메모를 작성하세요."
        style={{ height: 'auto', minHeight: '8rem' }}
        readOnly={!isEditing}
      />
      {/* 수정모드 일때 색상선택 보이게... */}
      {isEditing && (
        <div className="flex space-x-2">
          {/* option은 각 컬러배열의 색상값 */}
          {colorOptions.map((option, index) => (
            <button
              key={index}
              className={`w-6 h-6 rounded-full cursor-pointer outline outline-gray-50 ${option}`}
              aria-label={`Change color to ${option}`}
              onClick={() => handleColorChange(option)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Note;
