"use client";
import React from "react";
import { Input } from "../ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { RxArrowRight } from "react-icons/rx";

interface Props {
  counter: number;
  setCounter: (index: number) => void;
}

const formSchema = z.object({
  title: z.string().min(10, "Title must be more than 10 characters"),
  description: z
    .string()
    .min(100, "Description must be more than 100 characters"),

  propertyType: z.string(),
  price: z.string(),
});

const BasicDetails = ({ counter, setCounter }: Props) => {
  console.log(counter);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      propertyType: "",
      price: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {};

  return (
    <div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-10 mb-7">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="name of the property"
                        {...field}
                        className="w-[30rem] h-12"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="w-3/6">
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <select
                          {...field}
                          defaultValue=""
                          className="w-full h-12 bg-white border rounded-md px-3 py-2"
                        >
                          <option>--- Select Type ---</option>
                          <option>Residental Properties</option>
                          <option>Commercial Property</option>
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex gap-10">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Price"
                        {...field}
                        className="w-[30rem] h-12"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="title"
                        {...field}
                        className="w-[39rem] h-12"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Write a full description about your property"
                      className="h-32 mt-7"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex justify-center">
          <Button
            type="button"
            className="mt-5 bg-blue-400 hover:bg-blue-500 w-32"
            onClick={() => setCounter(counter + 1)}
          >
            Next <RxArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
