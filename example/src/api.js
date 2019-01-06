const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const range = (from, to) => {
  const list = [];
  for (let i = from + 1; i <= to; i++) {
    list.push(i);
  }
  return list;
};

const api = itemsPerPage => async page => {
  const data = range((page - 1) * itemsPerPage, page * itemsPerPage);
  await delay(500);
  return data;
};

export default api;
