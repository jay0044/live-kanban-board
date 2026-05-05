export const saveState = (state) => {
  localStorage.setItem("board", JSON.stringify(state));
};

export const loadState = () => {
  const data = localStorage.getItem("board");
  return data ? JSON.parse(data) : undefined;
};
