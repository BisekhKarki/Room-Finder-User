"use client";

import { checkToken } from "@/store/slice";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const { validToken } = useSelector((state: RootState) => state.slice);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (token) {
      dispatch(checkToken({ token }));
    }
  }, [dispatch]);

  return <div>Landlord Page</div>;
};

export default HomePage;
