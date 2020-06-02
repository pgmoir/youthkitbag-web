export const updateTokens = (headers) => {
  const authToken = localStorage.getItem('auth-token');
  const newAuthToken = headers['auth-token'];
  if (newAuthToken && newAuthToken !== authToken) {
    localStorage.setItem('auth-token', newAuthToken);
  }

  const refreshToken = localStorage.getItem('refresh-token');
  const newRefreshToken = headers['refresh-token'];
  if (newRefreshToken && newRefreshToken !== refreshToken) {
    localStorage.setItem('refresh-token', newRefreshToken);
  }
};
