import famouseProduct from "../Models/FamoseItems.Schema.js";
import productData from "../Models/AllProductData.schema.js";

// Save All famous products form all data url

const SaveFamousProduct = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) return res.status(400).json({ message: "URL is required" });

    // Extract the ID from the URL
    const parts = url.split("/");
    const id = parts[parts.length - 1]; // Last part is ID

    // Validate MongoDB ObjectId (24-character hex string)
    if (!/^[a-f\d]{24}$/i.test(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const findFamous = await productData.findById(id);
    const setFamusProduct = new famouseProduct({ findFamous });
    setFamusProduct.save();

    res.status(201).json({ famousProduct: setFamusProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




// get the all famous data 
const getFamousData = async (req, res) => {
  try {
    const getFamousDatas = await famouseProduct.find();

    if (getFamousDatas.length > 0) {
      res.status(201).json({getFamousDatas });
    } else {
      res.status(404).json({ message: "No Famouse Data Avilabes" });
    }


  } catch (error) {
    res.status(401).json({ message: "server Error", error });
  }
};




// admin can delete the famous prodcuts data
const deleteFamousData = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await getFamousDatas.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(401).json({ message: "server error", error });
  }
};

export { getFamousData, SaveFamousProduct, deleteFamousData };
