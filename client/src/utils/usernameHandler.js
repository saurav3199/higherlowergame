
const tokenName = "HiLoGamer"

export const getUser = () => {
  const user = window.localStorage.getItem(tokenName);
  
  try {
    const storedUser = JSON.parse(user);
    return storedUser;
  }catch(e){
    return undefined
  };
}

export const loginUser = (username) => {
  window.localStorage.setItem(tokenName, JSON.stringify(username));
}

export const logoutUser = () => {
  window.localStorage.removeItem(tokenName);
}
