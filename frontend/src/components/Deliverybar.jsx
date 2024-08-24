import React from "react";

const Deliverybar = () => {
  return (
    <section className="bg-slate-100 flex h-auto md:h-56 flex-col md:flex-row items-center md:justify-around py-8">
      <div className="flex flex-col gap-3 items-center md:items-start">
        <h1 className="text-2xl md:text-4xl font-medium">Free Delivery</h1>
        <p className="text-lg md:text-xl text-gray-400">For all orders over 50$</p>
      </div>
      <div className="flex flex-col gap-3 items-center md:items-start mt-6 md:mt-0">
        <h1 className="text-2xl md:text-4xl font-medium">90 Days Return</h1>
        <p className="text-lg md:text-xl text-gray-400">If goods have problems</p>
      </div>
      <div className="flex flex-col gap-3 items-center md:items-start mt-6 md:mt-0">
        <h1 className="text-2xl md:text-4xl font-medium">Secure Payment</h1>
        <p className="text-lg md:text-xl text-gray-400">100% secure payment</p>
      </div>
    </section>
  );
};

export default Deliverybar;
