import { atom, useAtom } from "jotai";
import Cookies from "js-cookie";
import { useEffect } from "react";

const userAtom = atom((get) => {
  const storedUser = Cookies.get("user");
  return storedUser ? JSON.parse(storedUser) : null;
});

export const useUserAtom = () => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const handleCookieChange = () => {
      const storedUser = Cookies.get("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", handleCookieChange);

    return () => {
      window.removeEventListener("storage", handleCookieChange);
    };
  }, [setUser]);

  return user;
};

export default userAtom;
