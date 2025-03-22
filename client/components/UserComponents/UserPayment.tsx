"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import toast from "react-hot-toast";
import { base_url } from "@/constants/BaseUrl";

interface Props {
  roomId: string;
  price: string;
  token: string;
  seller: string;
}

const UserPayment = ({ roomId, price, token, seller }: Props) => {
  const convertAmount = (5 / 100) * parseInt(price);

  const [formData, setFormData] = useState({
    purchase_type: "Rent",
    room_id: roomId,
    buyer_name: "",
    seller_name: seller,
    purchase_amount: convertAmount,
    purchase_date: new Date(),
    payment_type: "online",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({
        ...prev,
        purchase_date: date,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.buyer_name || !formData.purchase_date) {
      return toast.error("Fill all the details to proceed");
    }
    console.log(formData);
    try {
      const response = await fetch(`${base_url}/payment/tenants/khalti`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("Rent_Purchase_Details", JSON.stringify(formData));
        window.location.href = data.message;
      } else {
        console.log(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  return (
    <div className="m-5">
      <div className="px-5 py-10 border border-gray-200 rounded-lg">
        <p className="mb-6 text-lg font-semibold">
          Your application has been approved. <br /> You may now proceed with
          the payment.
        </p>

        <form className="space-y-4">
          {/* Purchase Type */}
          <div className="space-y-1">
            <Label htmlFor="purchase_type">Purchase Type</Label>
            <Input
              type="text"
              id="purchase_type"
              name="purchase_type"
              value={formData.purchase_type}
              required
            />
          </div>

          {/* Room ID */}
          <div className="space-y-1">
            <Label htmlFor="room_id">Room ID</Label>
            <Input
              type="text"
              id="room_id"
              name="room_id"
              value={formData.room_id}
              placeholder="Enter Room ID"
              required
            />
          </div>

          {/* Buyer Name */}
          <div className="space-y-1">
            <Label htmlFor="buyer_name">Buyer Name</Label>
            <Input
              type="text"
              id="buyer_name"
              name="buyer_name"
              value={formData.buyer_name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              required
            />
          </div>

          {/* Seller Name */}
          <div className="space-y-1">
            <Label htmlFor="seller_name">Seller Name</Label>
            <Input
              type="text"
              id="seller_name"
              name="seller_name"
              value={formData.seller_name}
              placeholder="Enter Seller Name"
              required
            />
          </div>

          {/* Purchase Amount */}
          <div className="space-y-1">
            <Label htmlFor="purchase_amount">Purchase Amount</Label>
            <Input
              type="text"
              id="purchase_amount"
              name="purchase_amount"
              value={formData.purchase_amount}
              onChange={handleChange}
              placeholder="Enter Purchase Amount"
              required
            />
          </div>

          {/* Purchase Date */}
          <div className="space-y-1">
            <Label htmlFor="purchase_date">Purchase Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.purchase_date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.purchase_date ? (
                    format(formData.purchase_date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.purchase_date}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </form>

        {/* Khalti Payment Option */}
        <div className="mt-6">
          <Button
            onClick={(e) => handleSubmit(e)}
            className="w-1/6 text-white bg-purple-600 hover:bg-purple-700 hover:text-white"
            variant="outline"
          >
            Pay with Khalti
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserPayment;
