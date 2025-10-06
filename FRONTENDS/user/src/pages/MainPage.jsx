import React from "react";
import Navbar  from "../components/Navbar";
import Footer  from "../components/Footer";
import Home  from "./Home";
import Products from "./Products";
import Contact from "./Contact";
import About from "./About";

export const MainPage = () => {
  return (
    <div className="bg-[#1b1b1b] text-[#f4d58d] font-sans overflow-x-hidden">
      <Navbar />
      <main className="scroll-smooth">
        <section id="home">
          <Home />
        </section>
        <section id="products">
          <Products />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

 
