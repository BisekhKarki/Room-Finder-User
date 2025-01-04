"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeFill } from "react-icons/bs";
import * as z from "zod";
import { IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const formSchema = z.object({
  email: z.string().min(1, "Enter at least 1 character"),

  address: z.string().min(3, "Enter your address"),
  user: z.string(),
  password: z.string().min(6, "Password must be of more than 6 characters"),
});

const loginPage = () => {
  const router = useRouter();
  const [close, open] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      address: "",

      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        {
          Email: values.email,
          Address: values.address,
          UserType: values.user,
          Password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("User Logged successfully");
        console.log(response.data.message);
      } else {
        toast.error("Failed to register account please try again");
      }
      router.push("/Home");
    } catch (error: any) {
      toast.error(error);
    }
  };

  const google = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/user/google");
      if (response.status === 200 && response.data.url) {
        window.location.href = response.data.url; // Redirect to Google Auth
      } else {
        toast.error("Failed to initiate Google login");
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div>
      <div className="px-20 py-20 flex items-center justify-center flex-col">
        <h1 className="font-semibold text-3xl text-start">Login</h1>
        <div className="border shadow-md px-10 py-5 rounded-xl mt-2  w-1/2">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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

              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your address" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="user"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select user</FormLabel>
                    <FormControl>
                      <select
                        className="w-full bg-white border p-2 rounded px-3"
                        {...field}
                        defaultValue={""}
                      >
                        <option value="" disabled>
                          Select a user
                        </option>
                        <option value="Tenants">Tenants</option>
                        <option value="Landlord">Landlord</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your password"
                          {...field}
                          type={close ? "text" : "password"}
                          className="w-full"
                        />
                        <div className="absolute  top-1 right-2">
                          {close ? (
                            <BsEye
                              type="button"
                              className="cursor-pointer h-6 w-6"
                              onClick={() => open(!close)}
                              width={150}
                              height={150}
                            />
                          ) : (
                            <IoIosEyeOff
                              type="button"
                              className="cursor-pointer h-6 w-6"
                              onClick={() => open(!close)}
                            />
                          )}
                        </div>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-center gap-2">
                <Button
                  type="submit"
                  className="bg-[#5656FF] hover:bg-[#4545D9] items-center w-80"
                >
                  Login
                </Button>
                <Button
                  onClick={() => google()}
                  type="button"
                  className="bg-[#f1f1f3] hover:bg-[#e6e6ed] items-center w-80 text-black flex justify-center"
                >
                  <FcGoogle /> Signup With Google
                </Button>
              </div>
            </form>
          </Form>
          <p className="mt-2">
            Don't have an account?
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => router.push("/signup")}
            >
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default loginPage;
