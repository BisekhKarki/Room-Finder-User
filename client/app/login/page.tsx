"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye } from "react-icons/bs";
import { IoIosEyeOff } from "react-icons/io";
import axios from "axios";

import { FcGoogle } from "react-icons/fc";
import * as z from "zod";
import { toast } from "react-hot-toast";
import logo from "@/public/assets/Logo.png";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().min(1, "Enter at least 1 character"),
  password: z.string().min(6, "Password must be more than 6 characters"),
});

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Hellow world");
    try {
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: values.email,
          Password: values.password,
        }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message);
        localStorage.setItem("Token", data.token);
        router.push(data.redirect);
      } else {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error) || "An error occurred");
    }
  };

  const google = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/user/google");
      if (response.status === 200 && response.data.url) {
        window.location.href = response.data.url;
        toast.success("Logged in successfully");
      } else {
        toast.error("Failed to initiate Google login");
      }
    } catch (error: unknown) {
      toast.error(String(error) || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-6 md:p-10">
        <div className="flex justify-center items-center">
          <Image className="" src={logo} width={100} height={100} alt="logo" />
        </div>
        <Form {...form}>
          <form
            className="space-y-4 mt-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Email Field */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      type="email"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full"
                      />
                      <div className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer">
                        {showPassword ? (
                          <BsEye
                            onClick={() => setShowPassword(false)}
                            className="h-5 w-5 text-gray-500"
                          />
                        ) : (
                          <IoIosEyeOff
                            onClick={() => setShowPassword(true)}
                            className="h-5 w-5 text-gray-500"
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Signup Redirect */}
            <p
              className="mt-4 text-center  text-blue-500 underline cursor-pointer"
              onClick={() => router.push("/ResetPassword")}
            >
              Forgot Password?
            </p>

            {/* Buttons */}
            <div className="space-y-2">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
              >
                Login
              </Button>
              <Button
                onClick={google}
                type="button"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md flex items-center justify-center gap-2"
              >
                <FcGoogle className="text-lg" />
                Login with Google
              </Button>
            </div>
          </form>
        </Form>

        {/* Signup Redirect */}
        <p className="mt-4 text-center text-gray-600">
          Dont have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-blue-500 underline cursor-pointer"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
