const key = '@GithubCompare:';

export const setStorage = async (name, data) => {
  try {
    const item = await localStorage.setItem(key + name, JSON.stringify(data));
    return item;
  } catch (err) {
    return console.warn(err);
  }
};

export const getStorage = async (name) => {
  try {
    const itens = localStorage.getItem(key + name);
    if (itens && itens.length >= 0) {
      return JSON.parse(itens);
    }
    return [];
  } catch (err) {
    return console.warn(err);
  }
};

export const deleteStorage = async (name) => {
  try {
    const item = await JSON.parse(localStorage.deleteItem(key + name));
    return item;
  } catch (err) {
    return console.warn(err);
  }
};

export const deleteItemStorage = async (name, id) => {
  try {
    const itens = JSON.parse(localStorage.getItem(key + name));
    const newItens = await itens.filter(item => item.id !== id);
    await localStorage.setItem(key + name, newItens);
    return newItens;
  } catch (err) {
    return console.warn(err);
  }
};
