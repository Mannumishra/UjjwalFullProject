const { config } = require("dotenv")
const productCategory = require("../Model/CategoryModel")
const fs = require("fs")
const { uploadImage } = require("../Cloudnary/Cloudnary")


const createRecord = async (req, res) => {
    try {
        const { categoryname } = req.body
        if (!categoryname) {
            return res.status(403).json({
                success: false,
                mess: "Fill All Required Fields"
            })
        }
        else {
            const data = new productCategory({ categoryname })
            if (req.file) {
                const url = await uploadImage(req.file.path ,"Assorts")
                data.image = url
            }
            await data.save()
            try {
                fs.unlinkSync(req.file.path)
            } catch (error) { }
            res.status(200).json({
                success: true,
                mess: "New Category created",
                data: data
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}

const getRecord = async (req, res) => {
    try {
        let data = await productCategory.find()
        if (data) {
            res.status(200).json({
                success: true,
                mess: "All Category found",
                data: data
            })
        }
        else {
            res.status(403).json({
                success: true,
                mess: "Category Not Found"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal server error"
        })
    }
}

const getSingleRecord = async (req, res) => {
    try {
        let data = await productCategory.findOne({ _id: req.params._id })
        if (data) {
            res.status(200).json({
                success: true,
                mess: "Category Found",
                data: data
            })
        }
        else {
            res.status(403).json({
                success: true,
                mess: "Category Not Found"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Error"
        })
    }
}

const updateRecord = async (req, res) => {
    try {
        let data = await productCategory.findOne({ _id: req.params._id })
        if (data) {
            data.categoryname = req.body.categoryname ?? data.categoryname
            if (req.file) {
                const oldImage = data.image.split('/').pop().split('.')[0];
                try {
                    await cloudinary.uploader.destroy(oldImage)
                } catch (error) { }
                const url = await uploadImage(req.file.path ,"Assorts")
                data.image = url
            }
            await data.save()
            try {
                fs.unlinkSync(req.file.path)
            } catch (error) {}
            res.status(200).json({
                success: true,
                mess: "Category Updated Successfully",
                data: data
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal server error"
        })
    }
}

const deleteRecord = async (req, res) => {
    try {
        let data = await productCategory.findOne({ _id: req.params._id })
        if (data) {
            const oldImage = data.image.split('/').pop().split('.')[0];
            try {
                await cloudinary.uploader.destroy(oldImage)
            } catch (error) { }
            await data.deleteOne()
            res.status(200).json({
                success: true,
                mess: "Record deleted"
            })
        }
        else {
            return res.status(403).json({
                success: false,
                mess: "Record not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            mess: "Internal Server Errot"
        })
    }
}

module.exports = {
    createRecord: createRecord,
    getRecord: getRecord,
    getSingleRecord: getSingleRecord,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord
}