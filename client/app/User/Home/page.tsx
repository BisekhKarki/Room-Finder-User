"use client";

import { checkToken } from "@/store/slice";
import { AppDispatch } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (token) {
      dispatch(checkToken({ token }));
    }
  }, [dispatch]);

  return <div>User Dashboard</div>;
};

export default HomePage;
