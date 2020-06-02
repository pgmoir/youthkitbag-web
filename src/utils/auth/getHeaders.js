export const getHeaders = () => {
  const authToken = localStorage.getItem('auth-token');
  const refreshToken = localStorage.getItem('refresh-token');

  return {
    Authorization: `bearer ${authToken}`,
    'refresh-token': refreshToken,
    'content-type': 'application/json',
  };
};
