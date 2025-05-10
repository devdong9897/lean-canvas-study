// 검색창 컴포넌트.
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ searchText = '', onSearch }) {
  // 사용자가 입력한 값을 저장하는 상태.
  const [localSearchText, setLocalSearchText] = useState(searchText);
  return (
    <div className="relative w-full sm:w-64">
      <input
        type="text"
        value={localSearchText}
        onChange={e => setLocalSearchText(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSearch(localSearchText);
          }
        }}
        placeholder="검색"
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="검색"
      />
      <FaSearch className="absolute left-3 top-3 text-gray-400" />
    </div>
  );
}

export default SearchBar;
