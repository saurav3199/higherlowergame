
const tokenName = "HiLoGamer"

export const getUser = () => {
  const user = window.sessionStorage.getItem(tokenName);
  
  try {
    const storedUser = JSON.parse(user);
    return storedUser;
  }catch(e){
    return undefined
  };
}

export const loginUser = (username) => {
  window.sessionStorage.setItem(tokenName, JSON.stringify(username));
}

export const logoutUser = () => {
  window.sessionStorage.removeItem(tokenName);
}
