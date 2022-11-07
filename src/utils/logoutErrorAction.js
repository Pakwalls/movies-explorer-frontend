export const apiErrorAction = (error) => {
  if (error.status === 401) {
    localStorage.clear();
    console.error(error);
  }
};
