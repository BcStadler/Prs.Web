import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Outlet } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { IUser } from "./users/IUser";

export interface IUserContextType {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

const UserContext = createContext<IUserContextType | undefined>(undefined);

export function useUserContext(): IUserContextType {
  const userContext = useContext(UserContext);
  if (userContext === undefined) throw new Error("context not found");
  return userContext;
}

function getPersistedUser() {
  const userAsJSON = localStorage.getItem("user");
  if (!userAsJSON) return undefined;
  try {
    return JSON.parse(userAsJSON);
  } catch {
    localStorage.removeItem("user");
    return undefined;
  }
}

function App() {
  const [user, setUser] = useState<IUser | undefined>(getPersistedUser());
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Toaster
        toastOptions={{
          success: { iconTheme: { primary: "#0400ff", secondary: "white" } },
          style: { maxWidth: 500 },
        }}
      />
      <Outlet />
    </UserContext.Provider>
  );
}

export default App;
