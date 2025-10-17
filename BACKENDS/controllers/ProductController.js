import ProductModel from "../models/ProductModel.js";

class ProductController {
  // 🟢 Get all products
  static async getAll(req, res) {
    try {
      const products = await ProductModel.getAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch products",
        error: error.message,
      });
    }
  }

  // 🟢 Get single product by ID
  static async getById(req, res) {
    try {
      const product = await ProductModel.getById(req.params.id);
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch product",
        error: error.message,
      });
    }
  }

  // 🟢 Create product
  static async create(req, res) {
  try {
    console.log("📩 Incoming form data:", req.body);
    console.log("📸 Uploaded file:", req.file);

    let { name, price, description } = req.body;
    price = parseFloat(String(price).replace(/[₦, ]/g, ""));

    const image_url = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    if (!name || !price)
      return res.status(400).json({ message: "Name and price are required" });

    const newProduct = await ProductModel.create({
      name,
      price,
      description,
      image_url,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error creating product:", error);
    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
}


  // 🟢 Update product
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, price, description } = req.body;
      const image_url = req.file
        ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        : req.body.image_url;

      const updatedProduct = await ProductModel.update(id, {
        name,
        price,
        description,
        image_url,
      });

      if (!updatedProduct)
        return res.status(404).json({ message: "Product not found" });

      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({
        message: "Failed to update product",
        error: error.message,
      });
    }
  }

  // 🟢 Delete product
  static async delete(req, res) {
    try {
      const { id } = req.params;
      await ProductModel.delete(id);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete product",
        error: error.message,
      });
    }
  }
}

export default ProductController;
