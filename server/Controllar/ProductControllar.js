const { uploadImage, deleteImage } = require("../Cloudnary/Cloudnary")
const product = require("../Model/ProductModel")
const fs = require("fs")

const createRecord = async (req, res) => {
    try {
        console.log(req.body)
        const { tableData, categoryname, subcategoryName, details, productname } = req.body
        if (!categoryname || !subcategoryName || !details || !productname) {
            return res.status(403).json({
                success: false,
                mess: "Fill all required fields"
            })
        }
        else {
            const data = new product({ categoryname, subcategoryName, details, productname, tableData })
            if (req.files) {
                if (req.files.image1) {
                    const url = await uploadImage(req.files.image1[0].path, "Assorts")
                    data.image1 = url
                }
                if (req.files.image2) {
                    const url = await uploadImage(req.files.image2[0].path, "Assorts")
                    data.image2 = url
                }
                if (req.files.image3) {
                    const url = await uploadImage(req.files.image3[0].path, "Assorts")
                    data.image3 = url
                }
                if (req.files.image4) {
                    const url = await uploadImage(req.files.image4[0].path, "Assorts")
                    data.image4 = url
                }
            }
            await data.save()
            try {
                fs.unlinkSync(req.files.image1[0].path)
            } catch (error) { }
            try {
                fs.unlinkSync(req.files.image2[0].path)
            } catch (error) { }
            try {
                fs.unlinkSync(req.files.image3[0].path)
            } catch (error) { }
            try {
                fs.unlinkSync(req.files.image4[0].path)
            } catch (error) { }
            res.status(200).json({
                success: true,
                mess: "New Product created",
                data: data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}

const getproduct = async (req, res) => {
    try {
        let data = await product.find()
        if (!data) {
            return res.status(400).json({
                success: true,
                mess: "Record not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                mess: "Record found",
                data: data
            })
        }
    } catch (error) {
        res.status(500).json({
            success: true,
            mess: "Internal Server Error"
        })
    }
}

const getSinglrproduct = async (req, res) => {
    try {
        let data = await product.findOne({ _id: req.params._id })
        if (!data) {
            return res.status(400).json({
                success: true,
                mess: "Record not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                mess: "Record found",
                data: data
            })
        }
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            success: true,
            mess: "Internal Server Error"
        })
    }
}

const deleteRecord = async (req, res) => {
    try {
        let data = await product.findOne({ _id: req.params._id });
        if (data) {
            if (data.image1) {
                const oldimage1 = data.image1.split("/").pop().split(".")[0];
                try {
                    await deleteImage(oldimage1);
                } catch (error) {
                    console.error('Error deleting image1:', error);
                }
            }
            if (data.image2) {
                const oldimage2 = data.image2.split("/").pop().split(".")[0];
                try {
                    await deleteImage(oldimage2);
                } catch (error) {
                    console.error('Error deleting image2:', error);
                }
            }
            if (data.image3) {
                const oldimage3 = data.image3.split("/").pop().split(".")[0];
                try {
                    await deleteImage(oldimage3);
                } catch (error) {
                    console.error('Error deleting image3:', error);
                }
            }
            if (data.image4) {
                const oldimage4 = data.image4.split("/").pop().split(".")[0];
                try {
                    await deleteImage(oldimage4);
                } catch (error) {
                    console.error('Error deleting image4:', error);
                }
            }
            await data.deleteOne();
            res.status(200).json({
                success: true,
                mess: "Record Deleted",
            });
        } else {
            res.status(404).json({
                success: false,
                mess: "Record Not Found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            mess: "Internal Server Error",
        });
    }
};


const updateProduct = async (req, res) => {
    try {
        let data = await product.findOne({ _id: req.params._id });
        if (data) {
            console.log(data);
            data.categoryname = req.body.categoryname ?? data.categoryname;
            data.productname = req.body.productname ?? data.productname;
            data.details = req.body.details ?? data.details;
            data.subcategoryName = req.body.subcategoryName ?? data.subcategoryName;
            data.tableData = req.body.tableData ?? data.tableData;
            if (req.files) {
                if (req.files.image1) {
                    const olImage = data.image1.split("/").pop().split(".")[0];
                    try {
                        await deleteImage(olImage);
                    } catch (error) { }
                    const ulr = await uploadImage(req.files.image1[0].path, "Assorts");
                    data.image1 = ulr;
                }
                if (req.files.image2) {
                    const oldImage = data.image2.split("/").pop().split(".")[0];
                    try {
                        await deleteImage(oldImage);
                    } catch (error) { }
                    const url = await uploadImage(req.files.image2[0].path, "Assorts");
                    data.image2 = url;
                }
                if (req.files.image3) {
                    const oldImage = data.image3.split("/").pop().split(".")[0];
                    try {
                        await deleteImage(oldImage);
                    } catch (error) { }
                    const url = await uploadImage(req.files.image3[0].path, "Assorts");
                    data.image3 = url;
                }
                if (req.files.image4) {
                    const oldImage = data.image4.split("/").pop().split(".")[0];
                    try {
                        await deleteImage(oldImage);
                    } catch (error) { }
                    const url = await uploadImage(req.files.image4[0].path, "Assorts");
                    data.image4 = url;
                }
            }
            await data.save();
            console.log("save data", data);
            try {
                if (req.files.image1) fs.unlinkSync(req.files.image1[0].path);
            } catch (error) { }
            try {
                if (req.files.image2) fs.unlinkSync(req.files.image2[0].path);
            } catch (error) { }
            try {
                if (req.files.image3) fs.unlinkSync(req.files.image3[0].path);
            } catch (error) { }
            try {
                if (req.files.image4) fs.unlinkSync(req.files.image4[0].path);
            } catch (error) { }
            res.status(200).json({
                success: true,
                mess: "Record updated successfully",
                data: data
            });
        } else {
            return res.status(403).json({
                success: false,
                mess: "Record Not found"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: true,
            mess: "Internal Server Error"
        });
    }
};


module.exports = {
    createRecord: createRecord,
    getproduct: getproduct,
    getSinglrproduct: getSinglrproduct,
    deleteRecord: deleteRecord,
    updateProduct: updateProduct
}