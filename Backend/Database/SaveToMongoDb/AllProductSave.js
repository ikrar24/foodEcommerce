import productData from "../Models/AllProductData.schema.js";

// Save all product data (POST method)
const SaveAllProduct = async (req, res) => {
  try {
    const {
      productName,
      productPrice,
      productOfferPrice,
      productDetails,
      productOfferDetails,
      productRating,
    } = req.body; // ✅ Use req.body, not req

    // ✅ Use logical OR (||) properly and check required fields
    if (!productName || !productPrice || !productDetails) {
      return res
        .status(400)
        .json({ message: "Please fill the required fields" });
    }

    const newProduct = new productData({
      productName,
      productPrice,
      productOfferPrice,
      productDetails,
      productOfferDetails,
      productRating,
    });

    await newProduct.save();

    res
      .status(201)
      .json({ product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all product data (GET method)
const GetAllProducts = async (req, res) => {
  try {
    const products = await productData.find();

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: "No products available" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};





const UpdateProducts = async (req, res) => {
  try {
    const { id } = req.params; // URL product ID
    const updateData = req.body; // Body updated data

    const updatedProduct = await productData.findByIdAndUpdate(id, updateData, {
      new: true, // Updated product return kare
      runValidators: true, // Schema validation apply kare
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const DeleteProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await productData.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Export functions
export { GetAllProducts, SaveAllProduct, UpdateProducts, DeleteProducts };
