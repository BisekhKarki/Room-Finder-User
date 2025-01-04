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
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { FcGoogle } from "react-icons/fc";

const formSchema = z.object({
  firstName: z.string().min(1, "Enter at least 1 character"),
  lastName: z.string().min(1, "Enter at least 1 character"),
  email: z.string().min(1, "Enter at least 1 character"),
  phone: z
    .string()
    .min(9, "Phone Numbers cannot be less than 10 digits")
    .max(10, "Phone Numbers cannot be more than 10 digits"),
  address: z.string().min(3, "Enter your address"),
  user: z.string(),
  password: z.string().min(6, "Password must be of more than 6 characters"),
  confirmPassword: z
    .string()
    .min(6, "Password must be of more than 6 characters"),
});

const SignupPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (values.password.length !== values.confirmPassword.length) {
        toast.error("Passwords do not match");
      } else {
        const response = await axios.post(
          "http://localhost:4000/api/user/register",
          {
            FirstName: values.firstName,
            LastName: values.lastName,
            Email: values.email,
            Phone: values.phone,
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
          toast.success("User registered successfully");
          console.log(response.data.message);
          router.push("/login");
        } else {
          toast.error("Failed to register account please try again");
        }
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div>
      <div className="px-20 py-12 flex items-center justify-center flex-col">
        <h1 className="font-semibold text-3xl text-start">Register Account</h1>
        <div className="border shadow-md px-10 py-5 rounded-xl mt-2  w-1/2">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex gap-10 w-full">
                <FormField
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your first name"
                          {...field}
                          className="w-72"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="lastName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your last Name"
                          {...field}
                          className="w-72"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-10 w-full">
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
                          className="w-72"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your Phone Number"
                          {...field}
                          className="w-72"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
              <div className="flex gap-10 w-full">
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          {...field}
                          type="password"
                          className="w-72"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirmPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Confirm password"
                          {...field}
                          type="password"
                          className="w-72"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <Button
                  type="submit"
                  className="bg-[#5656FF] hover:bg-[#4545D9] items-center w-80"
                >
                  Create Account
                </Button>
                <Button
                  type="button"
                  className="bg-[#f1f1f3] hover:bg-[#e6e6ed] items-center w-80 text-black flex justify-center"
                >
                  <FcGoogle /> Signup With Google
                </Button>
              </div>
            </form>
          </Form>
          <p className="mt-2">
            Already have an account?{" "}
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
