"use client";

import { useEffect } from "react";
import { AppDispatch, store } from "./store";
import { Provider, useDispatch } from "react-redux";
import { checkToken } from "./slice";

const TokenValidator = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      dispatch(checkToken({ token }));
    }
  }, [dispatch]);

  return <>{children}</>;
};

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <TokenValidator>{children}</TokenValidator>
    </Provider>
  );
};
