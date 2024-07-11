import React from "react";
import { Outlet } from "react-router-dom";
import Filters from "../components/Filters";
import Bet from "../components/Bet.js"

const Stock = ({state}) => {
  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      <Filters />
     <Bet state={state} />
      <Outlet />
    </section>
  );
};

export default Stock;
