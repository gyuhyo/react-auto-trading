import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useAuth() {
  const GET_USER_AUTH = useSelector((state) => state.auth);

  const [auth, setAuth] = useState(GET_USER_AUTH);

  useEffect(() => {
    if (!auth) {
      const localStorageAuth = JSON.parse(localStorage.getItem("auth"));
      setAuth(localStorageAuth);
    }
  }, []);

  return [auth?.apiKey, auth?.secret];
}
