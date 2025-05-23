"use client";

import { base_url } from "@/constants/BaseUrl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserValidation {
  type: string;
}

const ProtectRoutePage = ({ type }: UserValidation) => {
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Get token from localStorage
  useEffect(() => {
    const getToken = localStorage.getItem("Token");
    if (!getToken) {
      router.push("/login");
      return;
    }
    setToken(getToken);
  }, [router]);

  // Validate user with backend
  useEffect(() => {
    if (!token) return;

    const getUserFromBackend = async () => {
      try {
        const response = await fetch(`${base_url}/valid/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.status === 200) {
          setUser(data.message); // user's role
        } else {
          router.push("/login");
        }
      } catch (error: unknown) {
        router.push("/login");
        console.log(String(error));
      } finally {
        setLoading(false);
      }
    };

    getUserFromBackend();
  }, [token, router]);

  // Perform redirect check once user is known
  useEffect(() => {
    if (!loading && user) {
      if (type === "Tenants" && user === "Landlord") {
        router.push("/landlord/MyRooms");
      } else if (type === "Landlord" && user === "Tenants") {
        router.push("/User/Home");
      } else if (!type && !user) {
        router.push("/");
      }
    }
  }, [type, user, loading, router]);

  // Prevent flashing content during validation
  return <></>;
};

export default ProtectRoutePage;
