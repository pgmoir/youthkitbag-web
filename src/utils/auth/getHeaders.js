export const getHeaders = () => {
  const authToken = localStorage.getItem('authToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return {
    Authorization: `Bearer ${authToken}`,
    'refresh-token': refreshToken
    // 'content-type': 'application/json',
  };
};
