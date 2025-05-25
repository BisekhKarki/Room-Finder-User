import React from "react";

const RulesAndRegulationsUser = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-10 mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Room Rental Rules & Regulations
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          General Rules
        </h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-600">
          <li>Tenants must be at least 18 years old to rent a room</li>
          <li>
            Valid government-issued ID verification required for all rentals
          </li>
          <li>All rental agreements must be completed through the platform</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Room Search & Rental
        </h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-600">
          <li>
            Search and filter rooms based on price, location, and amenities
          </li>
          <li>
            View detailed room information including photos and descriptions
          </li>
          <li>Access landlord contact information after signed agreement</li>
          <li>Add rooms to watchlist for later consideration</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Payment System
        </h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-600">
          <li>Secure online payment processing for deposits and rent</li>
          <li>Monthly rent payments must be made by the 5th of each month</li>
          <li>Payment history tracking available in user dashboard</li>
          <li>Receipts automatically generated for all transactions</li>
          <li>
            Payment initially is always 10-12 % percentage whereas Monthly
            payment is full payement of the room
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          User Responsibilities
        </h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-600">
          <li>Submit maintenance requests through the platform portal</li>
          <li>
            Report any issues with rental property within 48 hours of discovery
          </li>
          <li>Respect quiet hours and community guidelines</li>
          <li>Provide honest reviews after tenancy period ends</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Review System
        </h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-600">
          <li>View historical reviews from verified tenants</li>
          <li>Submit reviews after leaving the room</li>
          <li>
            Rating system based on cleanliness, landlord responsiveness, and
            accuracy
          </li>
          <li>Reviews must adhere to community guidelines</li>
          <li>
            Automatic payment reminder is of 29 days after room rented and
            pyament should be made after the reminder
          </li>
        </ul>
      </section>
    </div>
  );
};

export default RulesAndRegulationsUser;
