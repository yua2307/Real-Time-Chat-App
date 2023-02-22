export const getJwtToken = () => {
  const userJSON = JSON.parse(localStorage.getItem('user'));
  return userJSON?.token;
};
