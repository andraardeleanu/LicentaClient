export const findProductIndexById = (list, id) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].productId === id) {
      return i;
    }
  }
  return -1;
};