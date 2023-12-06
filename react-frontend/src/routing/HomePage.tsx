import { useEffect } from "react";
import useComponent from "../hooks/useComponent";
import { User } from "../interfaces/User";

const HomePage = () => {
  const {
    isLoading,
    data,
    fetchData,
    logOut
  } = useComponent<User>()

  useEffect(()=>{
    fetchData('/auth/profile');
  },[])

  return (
    <>
      <div className="flex w-full justify-center mt-32">
        <div className="flex-col text-center ">
          <div className="flex w-80 justify-end">
            <button className="text-white bg-red-800 px-3 py-2 text-1xl font-bold rounded-xl" onClick={()=>logOut()}>
              Logout
            </button>
          </div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <div className="flex bg-blue-400 text-start px-10 py-20">
            <div className="flex justify-center">
              {isLoading && (
                <div className="spinner-container">
                  <div className="loading-spinner"></div>
                </div>
              )}
            </div>
            <div className="flex">
              {!isLoading && (
                <div>
                  <div><strong>Name:</strong> {data?.name}</div>
                  <div><strong>Email:</strong> {data?.email}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
