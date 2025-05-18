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
// import axios from "axios";

// import { FcGoogle } from "react-icons/fc";
import * as z from "zod";
import { toast } from "react-hot-toast";
import logo from "@/public/assets/Logo.png";
import Image from "next/image";
import { base_url } from "@/constants/BaseUrl";

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
      const response = await fetch(`${base_url}/user/login`, {
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
      } else if (response.status !== 200) {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error) || "An error occurred");
    }
  };

  // const google = async () => {
  //   try {
  //     const response = await axios.get(`${base_url}/user/google`);
  //     if (response.status === 200 && response.data.url) {
  //       window.location.href = response.data.url;
  //       toast.success("Logged in successfully");
  //     } else {
  //       toast.error("Failed to initiate Google login");
  //     }
  //   } catch (error: unknown) {
  //     toast.error(String(error) || "An error occurred");
  //   }
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 md:p-8 transition-all duration-200 hover:shadow-lg transform hover:scale-[1.005]">
        {/* Logo Container */}
        <div className="flex justify-center items-center mb-6 md:mb-8">
          <Image
            src={logo}
            alt="Company Logo"
            className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0"
            width={80}
            height={80}
            priority
          />
        </div>

        <Form {...form}>
          <form
            className="flex flex-col gap-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Email Field */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm md:text-base font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      type="email"
                      className="w-full py-3 md:py-3.5 text-sm md:text-base"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm md:text-base font-medium">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full py-3 md:py-3.5 text-sm md:text-base pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <BsEye className="h-5 w-5" />
                        ) : (
                          <IoIosEyeOff className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Forgot Password */}
            <div className="-mt-2 text-right">
              <button
                type="button"
                onClick={() => router.push("/ResetPassword")}
                className="text-xs md:text-sm text-blue-600 hover:text-blue-700 underline font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full py-3 md:py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-medium"
              >
                Login
              </Button>

              {/* <Button
                onClick={google}
                type="button"
                className="w-full py-3 md:py-3.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 text-sm md:text-base font-medium"
              >
                <FcGoogle className="text-xl mr-2" />
                Continue with Google
              </Button> */}
            </div>
          </form>
        </Form>

        {/* Signup Link */}
        <p className="mt-6 text-center text-xs md:text-sm text-gray-600">
          Dont have an account?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="text-blue-600 hover:text-blue-700 underline font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
