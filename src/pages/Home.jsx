import { useState } from 'react';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { createCanvas, deleteCanvas, getCanvases } from '../api/canvas';
import Button from '../components/Button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function Home() {
  const [searchText, setSearchText] = useState();
  // 뷰모드 상태(리스트형식인지 목록형식인지)
  const [isGridView, setIsGridView] = useState(true);

  const queryClient = useQueryClient();

  // 1] 데이터 조회
  // useQuery: 서버에서 데이터를 가져오고, 캐시에 저장함
  const { data, isLoading, error, refetch } = useQuery({
    // 'canvases': 캔버스 목록을 의미.
    // searchText:  검색어를 의미.
    // 검색어에 맞는 캔버스 목록을 찾는 고유한 키가 된다.
    queryKey: ['canvases', searchText],
    queryFn: () => getCanvases({ title_like: searchText }),
    initialData: [],
  });

  // 2] 등록
  // useMutation: 서버에 데이터를 변경(등록, 수정, 삭제) 요청함.
  const { mutate: createNewCanvas, isLoading: isLoadingCreate } = useMutation({
    mutationFn: createCanvas,
    // 새로운 캔버스를 추가한 후 최신 목록을 볼 때 캐쉬를 무효화해서 기존 데이터는 지우고 최신 데이터를 불러온다.
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => alert(err.message),
  });

  // 3] 삭제
  const { mutate: deleteCanvasMutation } = useMutation({
    mutationFn: deleteCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => alert(err.message),
  });

  const handleDeleteItem = async id => {
    deleteCanvasMutation(id);
  };

  const handleCreateCanvas = async () => {
    createNewCanvas();
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>
      <div className="flex justify-end mb-6">
        <Button onClick={handleCreateCanvas} loading={isLoadingCreate}>
          등록하기
        </Button>
      </div>
      {isLoading && <Loading />}
      {error && <Error message={error.message} onRetry={refetch} />}
      {!isLoading && !error && (
        <CanvasList
          filteredData={data}
          isGridView={isGridView}
          searchText={searchText}
          onDeleteItem={handleDeleteItem}
        />
      )}
    </>
  );
}

export default Home;
