import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
//eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: null,
    description: "",
  });
  const [file, setFile] = useState(null);

  //  Refs for scrolling (mobile UX improvement)
  const formRef = useRef(null);
  const topRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://rahmah-knits.onrender.com/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setFile(e.target.files[0]);

  //  ADD PRODUCT
  const handleAdd = async () => {
    if (!form.name || !form.price)
      return alert("Name & price are required");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    if (file) formData.append("image", file);

    try {
      const res = await fetch("https://rahmah-knits.onrender.com/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload product");
      const newProduct = await res.json();

      setProducts([newProduct, ...products]);
      setForm({ name: "", price: "", image: null, description: "" });
      setFile(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product.");
    }
  };

  //  EDIT PRODUCT — auto scrolls to the form on mobile
  const handleEdit = (id) => {
    const p = products.find((x) => x.id === id);
    setEditing(id);
    setForm({
      name: p.name,
      price: p.price,
      image: p.image,
      description: p.description,
    });

    //  Auto scroll down to the form when editing (mobile only)
    setTimeout(() => {
      if (window.innerWidth < 768 && formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  //  UPDATE PRODUCT — scrolls back up after saving
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("description", form.description);

      if (file) {
        formData.append("image", file);
      } else if (form.image) {
        formData.append("image", form.image);
      }

      const res = await fetch(
        `https://rahmah-knits.onrender.com/api/products/${editing}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to update product");
      const updated = await res.json();

      const next = products.map((p) =>
        p.id === editing ? updated : p
      );
      setProducts(next);

      //  Reset form
      setEditing(null);
      setForm({ name: "", price: "", image: "", description: "" });
      setFile(null);

      //  Scroll back to top after saving (mobile only)
      setTimeout(() => {
        if (window.innerWidth < 768 && topRef.current) {
          topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200);
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    }
  };

  //  DELETE PRODUCT
  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    try {
      const res = await fetch(
        `https://rahmah-knits.onrender.com/api/products/${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Delete failed");

      const next = products.filter((p) => p.id !== id);
      setProducts(next);
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-yellow-200">
      <Sidebar />
      <div className="flex-1">
        {/* Scroll target for going back up after save */}
        <div ref={topRef}></div>

        <Header title="Products" subtitle="Manage your product catalog" />
        <main className="p-6 md:p-10">
          <div className="flex flex-col-reverse md:grid md:grid-cols-3 gap-6">
            {/* PRODUCT LIST */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.length > 0 ? (
                  products.map((p) => (
                    <ProductCard
                      key={p.id}
                      p={p}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <div className="text-yellow-100/60">No products yet</div>
                )}
              </div>
            </div>

            {/* ADD / EDIT FORM */}
            <aside
              ref={formRef}
              className="p-6 rounded-2xl bg-zinc-900 border border-yellow-400/10 order-first md:order-last"
            >
              <h3 className="font-semibold mb-4">Add / Edit Product</h3>

              <div className="flex flex-col gap-3">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="p-3 rounded bg-zinc-800 border border-zinc-700"
                />
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Price (₦)"
                  className="p-3 rounded bg-zinc-800 border border-zinc-700"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="p-3 rounded bg-zinc-800 border border-zinc-700"
                />

                {/* Show current image preview when editing */}
                {form.image && !file && (
                  <img
                    src={form.image}
                    alt="Current product"
                    className="w-24 h-24 object-cover rounded mt-2 border border-zinc-700"
                  />
                )}

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Short description"
                  className="p-3 rounded bg-zinc-800 border border-zinc-700"
                />

                <div className="flex gap-2">
                  {!editing ? (
                    <button
                      onClick={handleAdd}
                      className="px-4 py-2 bg-yellow-400 text-black rounded"
                    >
                      Add Product
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-amber-500 text-black rounded"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => {
                          setEditing(null);
                          setForm({
                            name: "",
                            price: "",
                            image: "",
                            description: "",
                          });
                          setFile(null);
                        }}
                        className="px-4 py-2 border border-yellow-400/10 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
