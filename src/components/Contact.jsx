import React, { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="md:w-[60%] w-[85%] mx-auto mb-[30%] pt-[25%] md:pt-[15%]">
      <div className="my-[4%]  ">
        <h4 className="mb-[2%] md:text-4xl text-xl font-semibold">Contact</h4>
        <p className="md:text-xl font-semibold my-[2%]">
          Contact us on : +91 6388911255(Whatsapp)
        </p>
        <p className="md:text-xl font-semibold my-[2%]">
          Email us on : jaicte37@gmail.com
        </p>
        <p className="md:text-xl font-semibold my-[2%]">
          Address : Transport Nagar, Gati Chauraha Prayagraj (UP) India
        </p>
      </div>
    </div>
  );
};

export default Contact;
