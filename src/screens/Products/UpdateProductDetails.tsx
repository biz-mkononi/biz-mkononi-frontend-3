import React, { useEffect, useState } from 'react'
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import { Card } from '@mui/material';
import "../Businesses/AddBusiness.css"
import image from "../../Assets/placeholder.jpg"
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleProduct, updateSingleProduct } from '../../Data/Products/Data';
import CircularProgress from '@mui/material/CircularProgress';
import CategoryIcon from '@mui/icons-material/Category';

import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ScaleIcon from '@mui/icons-material/Scale';
import StyleIcon from '@mui/icons-material/Style';
import { getCategory } from '../../Data/Categories/Data';

interface data {
    name: "",
    productType: "",
    size: "",
    unit: '',
    buyingPrice: "",
    sellingPrice: "",
    stock: ""
}

const UpdateProductDetails = ({ id }: any) => {
    const [data, setData] = useState<data | any>({})
    const [isLoading, setIsloading] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)


    const navigate = useNavigate()

    const [formData, setFormData] = useState({})
    const [categories, setCategories] = useState<any[]>([])
    const [category, setCategory] = useState<data | any>({})
    const [displayImage, setDisplayImage] = useState ("")

    const params = useParams()

    useEffect(() => {
        getSingleProduct(setData, params.id, setIsloading, setCategory, setFormData, id)
        getCategory(setCategories, setIsloading, id)
    }, [location]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, ['categoryId']: e.target.value })
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({...formData,[e.target.name]:e.target.files[0]})
            setDisplayImage(URL.createObjectURL(e.target.files[0]));
        }
    }



    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateSingleProduct(formData, navigate, params.id, setIsUpdating, id)

    }
    console.log(formData)

    return (
        <>
            {
                isLoading ? <div className="text-center"><CircularProgress color="success" /></div> :
                    <div className='add-business container p-4 '>
                        <h2 className='mb-3'>Update Product Details</h2>
                        <div className="row padding">
                            <div className="col-lg-6">
                                <div className='details-button' style={{ display: "flex" }}>
                                    <button className='btn btn-secondary btn-md' onClick={(() => navigate(-1))}> Back</button>
                                </div>
                            </div>
                        </div>


                        <hr className="light mb-3 mt-3" />


                        <p className="mb-4">Update your Product</p>


                        <Card className='p-3'>
                            <form onSubmit={onSubmit}>
                                <div className="row padding mt-3">
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label ">Name</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><ProductionQuantityLimitsIcon /></span>
                                            <input type="text" onChange={handleChange} defaultValue={data.name} name="name" className="form-control" placeholder="name" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label">Category</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><CategoryIcon /></span>
                                            <select className="form-select" onChange={handleCategoryChange} name="category" aria-label="Default select example" id="basic-addon1">
                                                <option selected>{category.name}</option>
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
                                                <option selected>{data.productType}</option>
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
                                            <input type="text" onChange={handleChange} defaultValue={data.size} name="size" className="form-control" placeholder="Size e.g 500" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label">Unit e.g. ml for millilitres</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><ScaleIcon /></span>
                                            <input type="text" onChange={handleChange} defaultValue={data.unit} name="unit" className="form-control" placeholder="Unit e.g. ml for millilitres" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label">Buying Price e.g 1000</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><ShoppingCartIcon /></span>
                                            <input type="text" onChange={handleChange} defaultValue={data.buyingPrice} name="buyingPrice" className="form-control" placeholder="Buying Price e.g 1000" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>

                                </div>
                                <div className=" row padding">
                                    <div className="col-lg-6">
                                        <label htmlFor="basic-url" className="form-label">Selling Price e.g 1000</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><ShoppingCartIcon /></span>
                                            <input type="text" onChange={handleChange} defaultValue={data.sellingPrice} name="sellingPrice" className="form-control" placeholder="Selling Price e.g 1000" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="basic-url" className="form-label">Tags</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><StyleIcon /></span>
                                            <input type="text" onChange={handleChange} defaultValue={data.tags} name="tags" className="form-control" placeholder="tags" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>


                                </div>
                                <div className="row padding">
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label ">Description</label>
                                        <div className="input-group mb-3">
                                            <textarea className="form-control" defaultValue={data.description} onChange={handleDescriptionChange} name='description' aria-label="With textarea"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="mb-3 image-upload">


                                            <label htmlFor="formFile" className="form-label">
                                                Click to set product image
                                                <img src={ displayImage === ""?data.imageUrl ===null? image:data.imageUrl:displayImage} alt="" className='business-form-image' />
                                            </label>
                                            <input className="form-control file " onChange={handleFileChange} name='image' type="file" id="formFile" />


                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mt-3">
                                    {
                                        isUpdating ? <button className="btn btn-success btn-md" disabled>Updating</button> :
                                            <button className="btn btn-success btn-md">Update Product</button>
                                    }

                                </div>

                            </form>
                        </Card>

                    </div>
            }
        </>
    )
}

export default UpdateProductDetails