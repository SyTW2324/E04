export const logout = () => {
  localStorage.removeItem('user_storage');
  window.location.reload();

}