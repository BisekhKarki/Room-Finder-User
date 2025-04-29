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
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import Image from "next/image";
import logo from "@/public/assets/Logo.png";
import { base_url } from "@/constants/BaseUrl";

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
  // const dispatch = useDispatch<AppDispatch>();

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
      if (values.password !== values.confirmPassword) {
        toast.error("Passwords do not match");
      } else {
        const response = await fetch(`${base_url}/user/verify/code`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            FirstName: values.firstName,
            LastName: values.lastName,
            Email: values.email,
            Phone: values.phone,
            Address: values.address,
            UserType: values.user,
            Password: values.password,
          }),
        });
        const val = await response.json();
        if (response.status !== 200) {
          toast.error(val.message || "Please Try again");
        } else if (response.status === 200) {
          toast.success(val.message);
          router.push("/VerifyEmail");
        }
      }
    } catch (error: unknown) {
      toast.error(String(error) || "An error occurred");
    }
  };

  const google = async () => {
    try {
      const response = await axios.get(`${base_url}/user/google`);
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
    <div className="flex items-center justify-center min-h-screen p-5 bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-1 md:p-10">
        <div className="flex justify-center items-center">
          <Image className="" src={logo} width={100} height={100} alt="logo" />
        </div>
        <Form {...form}>
          <form
            className="space-y-6 mt-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* First Name and Last Name */}
            <div className="flex flex-col md:flex-row gap-4">
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
                        className="w-full"
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
                        placeholder="Enter your last name"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email and Phone */}
            <div className="flex flex-col md:flex-row gap-4">
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
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your phone number"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Address */}
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

            {/* User Type */}
            <FormField
              name="user"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select User Type</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full bg-white border rounded-md p-2"
                      aria-label="Select an option"
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

            {/* Password and Confirm Password */}
            <div className="flex flex-col md:flex-row gap-4">
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
                        className="w-full"
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
                        placeholder="Confirm your password"
                        {...field}
                        type="password"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
              >
                Create Account
              </Button>
              <Button
                onClick={google}
                type="button"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md flex items-center justify-center gap-2"
              >
                <FcGoogle />
                Signup with Google
              </Button>
            </div>
          </form>
        </Form>

        {/* Login Redirect */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-500 underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
