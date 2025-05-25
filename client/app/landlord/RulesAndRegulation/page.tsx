"use client";

import ProtectRoutePage from "@/components/ProtectRoutePage";
import React from "react";

const Page = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-10 mt-10">
      <ProtectRoutePage type="Landlord" />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Landlord Rules & Regulations
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Property Management
        </h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-600">
          <li>Post rooms with accurate descriptions and photos</li>
          <li>Update room availability status within 24 hours of rental</li>
          <li>View and manage all posted rooms in dashboard</li>
          <li>Monitor pending room approval status</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Room Posting Guidelines
        </h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-600">
          <li>
            Submit rooms for platform approval with complete documentation
          </li>
          <li>Activate listings only after successful verification payment</li>
          <li>Maintain accurate pricing and amenity information</li>
          <li>Edit room details requires re-approval if major changes occur</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Rent Applications
        </h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-600">
          <li>Review tenant applications within 72 hours of submission</li>
          <li>Approve/decline rental requests with valid reasons</li>
          <li>View complete tenant profiles and rental history</li>
          <li>Manage active tenancy agreements through dashboard</li>
          <li>
            Initial payment from tenant will be same as the landlord amount for
            room posting
          </li>
          <li>After room rented by the tenant payment will be full</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Payment System
        </h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-600">
          <li>Receive payments through secure platform gateway</li>
          <li>Payment before tenant moves-in</li>
          <li>View payment history and upcoming dues</li>
          <li>Withdraw funds after platform fee deduction</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Dispute Handling
        </h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-600">
          <li>Respond to tenant complaints within 48 hours</li>
          <li>Resolve maintenance requests through platform tracking</li>
          <li>Report tenant violations with evidence documentation</li>
          <li>Participate in mediation process if required</li>
        </ul>
      </section>
    </div>
  );
};

export default Page;
