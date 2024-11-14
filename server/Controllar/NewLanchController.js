const { uploadImage, deleteImage, } = require("../Cloudnary/Cloudnary");
const NewLanch = require("../Model/NewLanchModel");
const fs = require("fs");

const createRecord = async (req, res) => {
    try {
        const { productName, active } = req.body;
        if (!productName) {
            return res.status(400).json({
                success: false,
                message: "New Lanch Product Name is required"
            });
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "New Lanch Product Image is required"
            });
        }
        const imgUrl = await uploadImage(req.file.path, "Assorts");
        const newProduct = new NewLanch({
            productName,
            image: imgUrl,
            active: active || false
        });
        await newProduct.save();
        fs.unlinkSync(req.file.path);
        res.status(200).json({ message: "Product created successfully", newProduct });
    } catch (error) {
        if (req.file) fs.unlinkSync(req.file.path);
        res.status(400).json({ message: "Error creating product", error });
    }
};

const getRecord = async (req, res) => {
    try {
        const products = await NewLanch.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products", error });
    }
};

const getSingleRecord = async (req, res) => {
    try {
        const product = await NewLanch.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product", error });
    }
};

const updateRecord = async (req, res) => {
    try {
        const { productName, active } = req.body;
        const productId = req.params.id;
        let updatedProduct = await NewLanch.findById(productId);
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        let imgUrl = updatedProduct.image;
        if (req.file) {
            await deleteImage(getPublicIdFromUrl(imgUrl));
            imgUrl = await uploadImage(req.file.path, "Assorts");
            fs.unlinkSync(req.file.path);
        }
        updatedProduct = await NewLanch.findByIdAndUpdate(
            productId,
            { productName, image: imgUrl, active },
            { new: true, runValidators: true }
        );
        res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        if (req.file) fs.unlinkSync(req.file.path);
        res.status(400).json({ message: "Error updating product", error });
    }
};

const deleteRecord = async (req, res) => {
    try {
        const product = await NewLanch.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await deleteImage(getPublicIdFromUrl(product.image));
        await NewLanch.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};

const getPublicIdFromUrl = (url) => {
    const urlParts = url.split('/');
    const publicIdWithExtension = urlParts[urlParts.length - 1];
    const publicId = publicIdWithExtension.split('.')[0];
    return publicId;
};

module.exports = {
    createRecord, getRecord, getSingleRecord, updateRecord, deleteRecord
};
