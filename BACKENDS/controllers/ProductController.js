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
      const { name, price, description } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "Image is required" });
      }

      // Convert the file buffer to Base64 and upload directly to Cloudinary
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = `data:${file.mimetype};base64,${b64}`;

      const uploadResult = await cloudinary.uploader.upload(dataURI, {
        folder: "rahmahknits",
      });

      const image = uploadResult.secure_url;

      const newProduct = await ProductModel.create({
        name,
        price,
        description,
        image,
      });

      res.status(201).json(newProduct);
    } catch (error) {
      console.error("❌ Error creating product:", error);
      res.status(500).json({ message: "Failed to create product" });
    }
  }

  // 🟡 Update product
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, price, description } = req.body;
      let image = req.body.image;

      if (req.file) {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;
        const uploadResult = await cloudinary.uploader.upload(dataURI, {
          folder: "rahmahknits",
        });
        image = uploadResult.secure_url;
      }

      const updatedProduct = await ProductModel.update(id, {
        name,
        price,
        description,
        image,
      });

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error("❌ Error updating product:", error);
      res.status(500).json({ message: "Failed to update product" });
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
