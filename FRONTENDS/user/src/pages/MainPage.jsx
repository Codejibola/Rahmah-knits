import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "./Home";
import Products from "./Products";
import About from "./About";
import Contact from "./Contact";

export function MainPage() {
  return (
    <div className="bg-[#14110E] text-[#E6D5B8] min-h-screen">
      <Navbar />
      <main>
        <section id="home"><Home /></section>
        <section id="products"><Products /></section>
        <section id="about"><About /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </div>
  );
}
