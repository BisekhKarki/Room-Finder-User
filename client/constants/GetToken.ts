import { useEffect, useState } from "react";

export const GetToken = () => {
  const [token, setToken] = useState<string | "">("");

  useEffect(() => {
    const tokenGet = localStorage.getItem("Token");
    if (tokenGet) {
      setToken(tokenGet);
    }
  }, []);

  return token;
};
