import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the User type and UserContext
type User = {
  name: string;
};
const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => {},
});

// TokenProvider component to wrap the app with both contexts
export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(store.User);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children} {/* Render children once, inside both providers */}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
