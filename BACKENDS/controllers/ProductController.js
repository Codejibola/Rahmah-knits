//  Import dependencies and configurations
import ProductModel from "../models/ProductModel.js";   // Database model for product operations (CRUD)
import cloudinary from "../config/cloundinary.js";       // Cloudinary configuration file for image uploads
import streamifier from "streamifier";                  // Converts file buffers into readable streams (for Cloudinary upload)

//  Controller class to handle all product-related operations
class ProductController {

  //  GET all products
  static async getAll(req, res) {
    try {
      const products = await ProductModel.getAll(); // Fetch all products from DB
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ 
        message: "Failed to fetch products", 
        error: err.message 
      });
    }
  }

  //  CREATE a new product
  static async create(req, res) {
    try {
      const { name, price, description } = req.body;

      // Validate required fields
      if (!name || !price) {
        return res.status(400).json({ message: "Name and price are required" });
      }

      let imageUrl = null; // Initialize image URL (in case there's no image)

      //  If user uploaded an image, upload it to Cloudinary
      if (req.file) {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "rahmahknits" }, // Store image inside 'rahmahknits' folder on Cloudinary
          async (error, result) => {
            if (error) {
              console.error("❌ Cloudinary upload error:", error);
              return res.status(500).json({ message: "Image upload failed", error });
            }

            //  On success, get the Cloudinary image URL
            imageUrl = result.secure_url;

            // Convert price to number and validate
            const priceValue = parseFloat(price);
            if (isNaN(priceValue)) {
              return res.status(400).json({ message: "Invalid price format" });
            }

            // 💾 Save product to the database
            const newProduct = await ProductModel.create({
              name,
              price: priceValue,
              description,
              image: imageUrl,
            });

            return res.status(201).json(newProduct);
          }
        );

        // Convert file buffer to a stream and pipe it to Cloudinary
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

      } else {
        //  No image uploaded — save product without image
        const newProduct = await ProductModel.create({
          name,
          price: parseFloat(price),
          description,
          image: null,
        });
        res.status(201).json(newProduct);
      }
    } catch (error) {
      console.error("❌ Error creating product:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  //  GET a single product by ID
  static async getById(req, res) {
    try {
      const product = await ProductModel.getById(req.params.id); // Find product by ID
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

  // 🟡 UPDATE a product (replaces image only if a new one is uploaded)
static async update(req, res) {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    // 🧩 Start with existing image from the request body
    // (Frontend should send the old image URL if not uploading a new one)
    let image = req.body.image || null;

    // 🖼️ If a new image file is uploaded, replace the old one on Cloudinary
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;

      // Upload to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(dataURI, {
        folder: "rahmahknits",
      });

      // Replace image URL with the new one
      image = uploadResult.secure_url;
    }

    // 💾 Update the product in the database
    const updatedProduct = await ProductModel.update(id, {
      name,
      price: parseFloat(price),
      description,
      image, // Keep old image unless a new one was uploaded
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("❌ Error updating product:", error);
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
}

  //  DELETE a product by ID
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

//  Export the controller to be used in routes
export default ProductController;
