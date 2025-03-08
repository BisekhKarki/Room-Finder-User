import service from "../public/assets/Our_Services/Service.png";
import payment from "../public/assets/Our_Services/Payment.png";
import room from "../public/assets/Our_Services/Property.png";
import recommend from "../public/assets/Our_Services/Recommend.png";

export const services = [
  {
    title: "Room Renting",
    description:
      "Explore a wide variety of available rooms tailored to your needs. From budget-friendly options to premium accommodations, we help you discover the ideal space that fits your lifestyle.",
    tagline: "Find your perfect space in just a few clicks!",
    image: service,
    alt: "Room Service",
    reverse: false,
  },
  {
    title: "Room Posting",
    description:
      "Have a vacant room to rent out? Our platform lets you post your listing quickly and connect with potential renters looking for their next home.",
    tagline: "Reach the right tenants with ease.",
    image: room,
    alt: "Property",
    reverse: true,
  },
  {
    title: "Secure Online Payments",
    description:
      "Make hassle-free and secure payments directly through our website. Say goodbye to complicated transactions and experience convenience at its best.",
    tagline: "Simplifying transactions, one click at a time.",
    image: payment,
    alt: "Room Payment",
    reverse: false,
  },
  {
    title: "Personalized Room Recommendations",
    description:
      "Get recommendations tailored to your interests, budget, and location preferences. We prioritize your needs to help you find the right fit effortlessly.",
    tagline: "Rooms that match your preferences.",
    image: recommend,
    alt: "Room Recommendation",
    reverse: true,
  },
];

export default services;
