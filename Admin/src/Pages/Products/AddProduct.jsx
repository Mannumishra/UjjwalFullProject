import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoditEditor from 'jodit-react';

const AddProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const editor = useRef(null);
    const [catedata, setCatedata] = useState([]);
    const [subcatedata, setSubcatedata] = useState([]);

    const getApiData = async () => {
        try {
            let res = await axios.get("http://localhost:8000/api/category");
            setCatedata(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getApiSubData = async (categoryName) => {
        try {
            let res = await axios.get("http://localhost:8000/api/subcategory");
            // Filter subcategories based on selected category
            const filteredSubcategories = res.data.data.filter(item => item.categoryname === categoryName);
            setSubcatedata(filteredSubcategories);
        } catch (error) {
            console.log(error);
        }
    };

    const [data, setData] = useState({
        categoryname: '',
        subcategoryName: "",
        productname: "",
        details: "",
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        tableData: ''
    });

    const getInputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });

        // If the category is selected, fetch the related subcategories
        if (name === "categoryname") {
            getApiSubData(value);
        }
    };

    const getInputfile = (e) => {
        const { name, files } = e.target;
        setData({ ...data, [name]: files[0] });
    };

    const postData = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("categoryname", data.categoryname);
            formData.append("subcategoryName", data.subcategoryName);
            formData.append("details", data.details);
            formData.append("productname", data.productname);
            formData.append("image1", data.image1);
            formData.append("image2", data.image2);
            formData.append("image3", data.image3);
            formData.append("image4", data.image4);
            formData.append("tableData", data.tableData);
            setLoading(true);
            const res = await axios.post("http://localhost:8000/api/product", formData);
            if (res.status === 200) {
                toast.success("New Product created");
                navigate("/all-products");
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    const handleEditorChange = (content) => {
        setData({ ...data, tableData: content });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postData(e);
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Product</h4>
                </div>
                <div className="links">
                    <Link to="/all-products" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="row">
                        <div className="col-md-4">
                            <label htmlFor="">Product Name <sup className='text-danger'>*</sup></label>
                            <input type="text" name="productname" onChange={getInputData} value={data.productname} className='form-control' placeholder='Product name' required />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="category">Select Category <sup className='text-danger'>*</sup></label>
                            <select name="categoryname" onChange={getInputData} className="form-control" required>
                                <option disabled selected>Choose Category</option>
                                {catedata.map((item, index) =>
                                    <option key={index} value={item.categoryname}>{item.categoryname}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="category">Select SubCategory <sup className='text-danger'>*</sup></label>
                            <select name="subcategoryName" onChange={getInputData} className="form-control" required>
                                <option disabled selected>Choose SubCategory</option>
                                {subcatedata.map((item, index) =>
                                    <option key={index} value={item.subcategoryName}>{item.subcategoryName}</option>
                                )}
                            </select>
                        </div>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="details">Product Details <sup className='text-danger'>*</sup></label>
                            <textarea name="details" value={data.details} required onChange={getInputData} className='form-control' placeholder='Product details'></textarea>
                        </div>
                    </div>
                    <div className="row">
                        {/* File input fields */}
                        <div className="col-md-3 mb-3">
                            <label htmlFor="pic1" className="form-label">Picture 1: <sup className='text-danger'>*</sup></label>
                            <input type="file" name="image1" onChange={getInputfile} className="form-control" required />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="pic2" className="form-label">Picture 2: <sup className='text-danger'>*</sup></label>
                            <input type="file" name="image2" onChange={getInputfile} className="form-control" required />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="pic3" className="form-label">Picture 3: <sup className='text-danger'>*</sup></label>
                            <input type="file" name="image3" onChange={getInputfile} className="form-control" required />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="pic4" className="form-label">Picture 4: <sup className='text-danger'>*</sup></label>
                            <input type="file" name="image4" onChange={getInputfile} className="form-control" required />
                        </div>
                    </div>
                    <div className=''>
                        <label>Product Details: <sup className='text-danger'>*</sup></label>
                        <JoditEditor
                            ref={editor}
                            value={data.tableData}
                            onChange={handleEditorChange}
                            placeholder="Enter product details here..." required
                        />
                    </div>
                    <button type="submit" className="mybtnself" style={{ marginBottom: 100 }}>{loading ? "Please wait...." : "Add New Product"}</button>
                </form>
            </div>
        </>
    );
}

export default AddProduct;
