import { useCallback, useState } from 'react';

export default function useApiRequest(apiFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 실제 네트워크 통신하는 함수
  // options: {onSuccess, onError}
  // useCallback으로 다시 그리지 않고 이 함수를 기억. apiFunction이 바뀌면 기억했던 함수 지우고 다시 만들어줘.
  const execute = useCallback(
    async (params, { onSuccess, onError }) => {
      try {
        setIsLoading(true);
        setError(null);
        await new Promise(resolver => setTimeout(resolver, 1000));
        const response = await apiFunction(params);
        if (onSuccess) {
          onSuccess(response);
        }
      } catch (err) {
        setError(err);
        if (onError) {
          onError(err);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction],
  );

  return {
    isLoading,
    error,
    execute,
  };
}
