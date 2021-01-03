export const updateTokens = (headers) => {
  const authToken = localStorage.getItem('authToken');
  const newAuthToken = headers['authToken'];
  if (newAuthToken && newAuthToken !== authToken) {
    localStorage.setItem('authToken', newAuthToken);
  }

  const refreshToken = localStorage.getItem('refreshToken');
  const newRefreshToken = headers['refreshToken'];
  if (newRefreshToken && newRefreshToken !== refreshToken) {
    localStorage.setItem('refreshToken', newRefreshToken);
  }
};
