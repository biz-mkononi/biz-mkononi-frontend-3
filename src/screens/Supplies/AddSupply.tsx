
import React, { useState, useEffect } from 'react';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PersonIcon from '@mui/icons-material/Person';
import ScaleIcon from '@mui/icons-material/Scale';
import { Card, Alert } from '@mui/material';
import { getCustomers } from '../../Data/Customers/Data';
import { getProducts } from '../../Data/Products/Data';
import "../Businesses/AddBusiness.css"
import { addSale } from '../../Data/Sales/Data';
import { useNavigate } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { addSupply } from '../../Data/Supplies/Data';
import { getSuppliers } from '../../Data/Suppliers/Data';


interface Form {
    product: string;
    supplyPrice: number;
    quantity: number;
    productId: string

}
interface Product {
    name: string;
    buyingPrice: number;
    id: string
}


const AddSupply = ({ id }: any) => {
    const [forms, setForms] = useState<Form[]>([{ product: '', supplyPrice: 0, quantity: 0, productId: '' }]);
    const [totalAmount, setTotalAmount] = useState(0)
    const navigate = useNavigate()
    const [suppliers, setSuppliers] = useState<any[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [amountCharged, setAmountCharged] = useState(0)
    const [amountPaid, setAmountPaid] = useState(0)
    const [supplierId, setSupplierId] = useState("")
    const [errors, setErrors] = useState("")
    useEffect(() => {
        //calculate the total
        let formTotal = 0;
        forms.forEach((form) => {
            formTotal += form.supplyPrice * form.quantity;
        });
        setTotalAmount(formTotal);
        setAmountCharged(formTotal)
        setAmountPaid(formTotal)
    }, [forms]);

    const handleAddForm = () => {
        setForms([...forms, { product: '', supplyPrice: 0, quantity: 0, productId: '' }]);
    };

    const handleRemoveForm = (index: number) => {
        const newForms = [...forms];
        newForms.splice(index, 1);
        setForms(newForms);
    };
    const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const newForms = [...forms];
        newForms[index].product = e.target.value;
        const selectedProduct = products.find(
            (product) => product.name === e.target.value
        );
        if (selectedProduct) {
            newForms[index].supplyPrice = selectedProduct.buyingPrice;
            newForms[index].productId = selectedProduct.id
        }
        setForms(newForms);
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newForms = [...forms];
        newForms[index].quantity = Number(e.target.value);
        setForms(newForms);
    };


    useEffect(() => {
        getSuppliers(setSuppliers, setIsLoading, id)
        getProducts(setProducts, setIsLoading, id)
    }, [])

    const handleSupplierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSupplierId(e.target.value)
        console.log(e.target.value)
    }
    const handleAmountChargedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmountCharged(parseInt(e.target.value))
    }
    const handleAmountPaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmountPaid(parseInt(e.target.value))
    }



    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const post = {
            supplyItems: forms,
            amountCharged: totalAmount,
            supplierId: supplierId,
            amountPaid: amountPaid
        }

        console.log(post)
        addSupply(post, navigate, setIsLoading, id)

    }
    const balance = amountPaid - amountCharged

    console.log(products)
    console.log(supplierId)
    return (
        <div className='add-business container p-4 '>
            <h2 className='mb-3'>Add a Supply</h2>

            <hr className="light mb-3" />
            <p className="mb-4">Add a new Supply</p>
            <Card className='p-3'>
                {
                    errors !== '' && (
                        <Alert variant="filled" onClose={(() => setErrors(''))} severity="error">
                            {errors}
                        </Alert>
                    )
                }
                <form onSubmit={onSubmit}>
                    <div className="row padding mt-3">

                        <div className="col-lg-6">
                            <label htmlFor="basic-url" className="form-label">Supplier</label>
                            <div className="input-group mb-5">
                                <span className="input-group-text" id="basic-addon1"><PersonIcon /></span>
                                <select className="form-select" onChange={handleSupplierChange} name="category" aria-label="Default select example" id="basic-addon1">
                                    <option selected>Select Supplier</option>
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

                        </div>
                    </div>

                    {
                        forms.map((form, index) => (
                            <React.Fragment key={index}>
                                <Card sx={{
                                    padding: "10px",
                                    marginBottom: "50px"
                                }}>
                                    <div className="row padding">
                                        <div className="col-lg-6">
                                            <label htmlFor="basic-url" className="form-label">Product</label>
                                            <div className="input-group mb-5">
                                                <span className="input-group-text" id="basic-addon1"><ProductionQuantityLimitsIcon /></span>
                                                <select className="form-select" onChange={(e) => handleProductChange(e, index)} value={form.product} name="category" aria-label="Default select example" id="basic-addon1">
                                                    <option selected>Select product</option>
                                                    {products.map((product, index) => {

                                                        return (
                                                            <option key={product.name} value={product.name}>
                                                                {product.name}
                                                            </option>

                                                        );

                                                    })}

                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <label htmlFor="basic-url" className="form-label ">Quantity</label>
                                            <div className="input-group mb-5">
                                                <span className="input-group-text" id="basic-addon1"><ScaleIcon /></span>
                                                <input type="text" onChange={(e) => handleQuantityChange(e, index)} value={form.quantity} name="location" className="form-control" placeholder="quantity" aria-label="Username" aria-describedby="basic-addon1" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row padding">

                                        <div className="col-lg-6">
                                            <label htmlFor="basic-url" className="form-label">Item Price</label>
                                            <div className="input-group mb-5">
                                                <span className="input-group-text" id="basic-addon1"><AttachMoneyIcon /></span>
                                                <input type="text" value={form.supplyPrice} name="locationDetails" className="form-control" placeholder="details" aria-label="Username" aria-describedby="basic-addon1" />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <h2 className='mb-4 mt-5'>Subtotal : Ksh: {form.supplyPrice * form.quantity}</h2>
                                        </div>

                                    </div>
                                    <div className="row padding">

                                        <div className="col-lg-6">
                                            {index !== 0 && (
                                                <button className='btn btn-md btn-danger' onClick={() => handleRemoveForm(index)}>Remove Product</button>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </React.Fragment>

                        ))
                    }
                    <div className="mt-3 mb-5">
                        <button className='btn btn-info btn-md' type='button' onClick={handleAddForm}>Add Product</button>
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
                        <button type='submit' className="btn btn-success btn-md" disabled={isLoading ? true : false} > {isLoading ? "Adding" : "Add Supply"} </button>
                    </div>

                </form>
            </Card>
        </div>
    )
}

export default AddSupply
