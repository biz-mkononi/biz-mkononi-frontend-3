import React, { useState, useEffect } from 'react';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PersonIcon from '@mui/icons-material/Person';
import ScaleIcon from '@mui/icons-material/Scale';
import { Card } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { getProducts } from '../../Data/Products/Data';
import "../Businesses/AddBusiness.css"
import { addSale } from '../../Data/Sales/Data';
import { useNavigate } from 'react-router-dom';
import { businessId } from '../../Data/Employees/Data';
import { getSuppliers } from '../../Data/Suppliers/Data';
import { addSupply } from '../../Data/Supplies/Data';

const AddSupply = () => {
    const navigate = useNavigate()
    const [suppliers, setSuppliers] = useState<any[]>([])
    const [products, setProducts] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [price, setPrice] = useState("0")
    const [productId, setProductId] = useState("")
    const [amountCharged, setAmountCharged] = useState("0")
    const [amountPaid, setAmountPaid] = useState("0")
    const [totalAmount, setTotalAmount] = useState("0")
    const [SupplierId, setSupplierId] = useState("")
    const [quantity, setQuantity] = useState("")

    useEffect(() => {
        getSuppliers(setSuppliers, setIsLoading)
        getProducts(setProducts, setIsLoading)
    }, [])

    const handleSupplierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSupplierId(e.target.value)
    }
    const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let obj = JSON.parse(e.target.value)
        setPrice(obj.buyingPrice)
        setProductId(obj.id)
    }

    const handleAmountChargedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmountCharged(parseInt(e.target.value).toString())
    }
    const handleAmountPaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmountPaid(parseInt(e.target.value).toString())
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value)
        setAmountCharged((parseInt(e.target.value) * parseFloat(price)).toString())
        setAmountPaid((parseInt(e.target.value) * parseFloat(price)).toString())
        setTotalAmount((parseInt(e.target.value) * parseFloat(price)).toString())
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const supplyItems = [{
            productId,
            supplyPrice: price,
            quantity: parseInt(quantity)
        }]
        const formData = new FormData()
        formData.set("supplierId", JSON.stringify(SupplierId))
        formData.set("amountCharged", JSON.stringify(amountCharged))
        formData.set("amountPaid", JSON.stringify(amountPaid))
        formData.append("supplyItems", JSON.stringify(supplyItems))

        addSupply(formData, navigate, setIsLoading)

    }
    const balance = parseInt(amountPaid) - parseInt(amountCharged)
    console.log(productId)
    return (
        <div className='add-business container p-4 '>
            <h2 className='mb-3'>Add a Supply</h2>

            <hr className="light mb-3" />
            <p className="mb-4">Add a new Supply</p>
            <Card className='p-3'>
                <form onSubmit={onSubmit}>
                    <div className="row padding mt-3">
                        <div className="col-lg-6">
                            <label htmlFor="basic-url" className="form-label">supplier</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><PersonIcon /></span>
                                <select className="form-select" onChange={handleSupplierChange} name="category" aria-label="Default select example" id="basic-addon1">
                                    <option selected>Select supplier</option>
                                    {suppliers.map((supplier) => {
                                        return (
                                            <option value={supplier.id} key={supplier.id}>
                                                {supplier.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <label htmlFor="basic-url" className="form-label">Product</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><ProductionQuantityLimitsIcon /></span>
                                <select className="form-select" onChange={handlePriceChange} name="category" aria-label="Default select example" id="basic-addon1">
                                    <option selected>Select product</option>
                                    {products.map((product, index) => {
                                        return (
                                            <option value={JSON.stringify(product)} key={index}>
                                                {product.name}
                                            </option>

                                        );

                                    })}
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="row padding">
                        <div className="col-lg-6">
                            <label htmlFor="basic-url" className="form-label ">Quantity</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><ScaleIcon /></span>
                                <input type="text" onChange={handleQuantityChange} name="location" className="form-control" placeholder="quantity" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <label htmlFor="basic-url" className="form-label">Item Price</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><AttachMoneyIcon /></span>
                                <input type="text" value={price} name="locationDetails" className="form-control" placeholder="details" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>

                        <h2 className='mb-4'>Grand Total : Ksh: {totalAmount}</h2>

                    </div>
                    <div className="row padding">
                        <div className="col-lg-6">

                        </div>
                        <div className="col-lg-6">
                            <label htmlFor="basic-url" className="form-label ">Amount Charged</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><AttachMoneyIcon /></span>
                                <input type="text" value={amountCharged} onChange={handleAmountChargedChange} name="location" className="form-control" placeholder="location" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <label htmlFor="basic-url" className="form-label">Amount Paid</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><AttachMoneyIcon /></span>
                                <input type="text" value={amountPaid} onChange={handleAmountPaidChange} name="locationDetails" className="form-control" placeholder="details" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <h2 className='mb-4'>Balance : Ksh: {balance}</h2>
                        </div>

                    </div>
                    <div className="text-center mt-3">
                        {
                            isLoading ? <button className="btn btn-success btn-md" disabled>Adding</button> :
                                <button className="btn btn-success btn-md">Add Supply</button>
                        }

                    </div>

                </form>
            </Card>
        </div>
    )
}

export default AddSupply