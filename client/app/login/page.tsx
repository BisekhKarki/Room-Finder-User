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
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().min(1, "Enter at least 1 character"),
  user: z.string(),
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
    try {
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: values.email,
          Password: values.password,
          UserType: values.user,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log(data);
        toast.success(data.message);
        router.push(data.redirect);
      } else if (response.status === 400) {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
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
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-6 md:p-10">
        <h1 className="font-bold text-2xl md:text-3xl text-gray-800 text-center">
          Login
        </h1>
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

            {/* User Type Field */}
            <FormField
              name="user"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Type</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full bg-white border rounded-md px-3 py-2"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a user type
                      </option>
                      <option value="Tenants">Tenants</option>
                      <option value="Landlord">Landlord</option>
                    </select>
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

            {/* Buttons */}
            <div className="space-y-3">
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
          Don’t have an account?{" "}
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
