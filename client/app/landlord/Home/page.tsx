"use client";

import { checkToken } from "@/store/slice";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Page = () => {
  // const { validToken } = useSelector((state: RootState) => state.slice);
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (token) {
      dispatch(checkToken({ token }));
    } else if (!token) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return <div>Landlord Page</div>;
};

export default Page;
