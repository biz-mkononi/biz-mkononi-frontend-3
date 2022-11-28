import React, { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import image from "../../Assets/placeholder.jpg"
import { Card } from '@mui/material';
import { addProduct } from '../../Data/Products/Data';
import { useNavigate } from 'react-router-dom';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ScaleIcon from '@mui/icons-material/Scale';
import StyleIcon from '@mui/icons-material/Style';
import { getCategory } from "../../Data/Categories/Data"
import CategoryIcon from '@mui/icons-material/Category';

import "../Businesses/AddBusiness.css"


const AddProduct = () => {
    const initialState = { name: "", categoryId: "", productType: "", size: "", unit: "", buyingPrice: "", sellingPrice: "", description: "", tags: "" }
    const navigate = useNavigate()

    const [formData, setFormData] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState<any[]>([])
    useEffect(() => {
        getCategory(setCategories, setIsLoading)
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, ['categoryId']: e.target.value })
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }



    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addProduct(formData, navigate, setIsLoading)
        console.log(formData)

    }

    return (
        <div className='add-business container p-4 '>
            <h2 className='mb-3'>Add Product</h2>

            <hr className="light mb-3" />
            <p className="mb-4">Add a new product to your business</p>
            <Card className='p-3'>
                <form onSubmit={onSubmit}>
                    <div className="row padding mt-3">
                        <div className="col-lg-4">
                            <label htmlFor="basic-url" className="form-label ">Name</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><ProductionQuantityLimitsIcon /></span>
                                <input type="text" onChange={handleChange} name="name" className="form-control" placeholder="name" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor="basic-url" className="form-label">Category</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><CategoryIcon /></span>
                                <select className="form-select" onChange={handleCategoryChange} name="category" aria-label="Default select example" id="basic-addon1">
                                    <option selected>Select category</option>
                                    {categories.map((category) => {
                                        return (
                                            <option value={category.id} key={category.id}>
                                                {category.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor="basic-url" className="form-label">Product Type</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><ProductionQuantityLimitsIcon /></span>
                                <select className="form-select" onChange={handleTypeChange} name="productType" aria-label="Default select example" id="basic-addon1">
                                    <option selected>select a product type</option>
                                    <option value="PRODUCT">Product</option>
                                    <option value="SERVICE">Service</option>
                                    <option value="SERVICE_PRODUCT">Service_product</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row padding">
                        <div className="col-lg-4">
                            <label htmlFor="basic-url" className="form-label ">Size e.g 500</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><ScaleIcon /></span>
                                <input type="text" onChange={handleChange} name="size" className="form-control" placeholder="Size e.g 500" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor="basic-url" className="form-label">Unit e.g. ml for millilitres</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><ScaleIcon /></span>
                                <input type="text" onChange={handleChange} name="unit" className="form-control" placeholder="Unit e.g. ml for millilitres" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor="basic-url" className="form-label">Buying Price e.g 1000</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><ShoppingCartIcon /></span>
                                <input type="text" onChange={handleChange} name="buyingPrice" className="form-control" placeholder="Buying Price e.g 1000" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>

                    </div>
                    <div className=" row padding">
                        <div className="col-lg-6">
                            <label htmlFor="basic-url" className="form-label">Selling Price e.g 1000</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><ShoppingCartIcon /></span>
                                <input type="text" onChange={handleChange} name="sellingPrice" className="form-control" placeholder="Selling Price e.g 1000" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <label htmlFor="basic-url" className="form-label">Tags</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><StyleIcon /></span>
                                <input type="text" onChange={handleChange} name="tags" className="form-control" placeholder="tags" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>


                    </div>
                    <div className="row padding">
                        <div className="col-lg-4">
                            <label htmlFor="basic-url" className="form-label ">Description</label>
                            <div className="input-group mb-3">
                                <textarea className="form-control" onChange={handleDescriptionChange} name='description' aria-label="With textarea"></textarea>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="mb-3 image-upload">


                                <label htmlFor="formFile" className="form-label">
                                    Click to set product image
                                    <img src={image} alt="" className='business-form-image' />
                                </label>
                                <input className="form-control file " name='image' type="file" id="formFile" />


                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-3">
                        {
                            isLoading ? <button className="btn btn-success btn-md" disabled>Adding</button> :
                                <button className="btn btn-success btn-md">Add Product</button>
                        }

                    </div>

                </form>
            </Card>
        </div>
    )
}

export default AddProduct