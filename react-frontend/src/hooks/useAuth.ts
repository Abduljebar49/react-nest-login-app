const useAuth = () => {
    const localData = localStorage.getItem("userToken");
  
    if (localData !== undefined && localData !== null) {
      const data = JSON.parse(localData);
        return data;
    }
    return null;
  };
  
  export function isUserLoggedIn():boolean {
    const data = useAuth();
    if(data?.token) return true;
    return false;
  }
  
  export function logout(){
    localStorage.removeItem("userToken")
  }
  
  export default useAuth;