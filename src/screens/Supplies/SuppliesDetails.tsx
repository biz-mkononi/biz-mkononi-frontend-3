import React, { useState, useEffect } from 'react'
import image2 from "../../Assets/placeholder.jpg"
import "../Businesses/AddBusiness.css"
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import AlertDialog from '../Dialog/Dialog'
import { deleteSupplies, getSingleSupply } from '../../Data/Supplies/Data';


interface data {
    name: "",
    description: "",
    date: ""
}
const SuppliesDetails = ({ id }: any) => {
    const [open, setOpen] = useState(false)
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }

    const navigate = useNavigate()
    const [data, setData] = useState<data | any>({})
    const [supplier, setSupplier] = useState<data | any>({})
    const [product, setProduct] = useState<data | any>([])
    const [isLoading, setIsloading] = useState(false)


    const params = useParams()
    const handleDelete = () => {
        deleteSupplies(navigate, params.id, setIsloading, id)
        setOpen(false)
    }
    useEffect(() => {
        getSingleSupply(setData, setSupplier, setProduct, params.id, setIsloading, id)


    }, [location]);
    const onDelete = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    console.log(data)
    return (
        <>
            {
                isLoading ? <div className="text-center"><CircularProgress color="success" /></div> :
                    <div className="container p-3">

                        {
                            open ? <AlertDialog open={open} handleClose={handleClose} title="this supply" handleDelete={handleDelete} /> : ""
                        }
                        <div className="row padding">
                            <div className="col-lg-6">
                                <h2 className='mb-4'>Supply Details</h2>

                            </div>

                        </div>
                        <div className="row padding mb-4">
                            <div className="col-lg-6">
                                <div className='details-button' style={{ display: "flex" }}>
                                    <button className='btn btn-secondary btn-md' onClick={(() => navigate(-1))}> Back</button>
                                    <button className='btn btn-warning btn-md' onClick={(() => navigate(`/expense/${params.id}/update-details`))}> Update</button>
                                    <button className='btn btn-danger btn-md' onClick={onDelete}> Delete</button>

                                </div>


                            </div>

                        </div>

                        <div className="row padding">
                            <h2 className='mt-3'>Supplier</h2>
                            <div className="col-lg-6">
                                <img className='business-details-image ' src={image2} />
                            </div>

                            <div className="col-lg-6">
                                <table className="table mt-3">

                                    <>
                                        <tbody >
                                            <tr >
                                                <th>Name</th>
                                                <td>{supplier.name}</td>
                                            </tr>

                                            <tr>
                                                <th>email</th>
                                                <td>{supplier.email}</td>
                                            </tr>
                                            <tr>
                                                <th>Phone Number</th>
                                                <td>{supplier.phone}</td>
                                            </tr>
                                            <tr>
                                                <th>Date Created</th>
                                                <td>{new Date(data.createdAt).toLocaleDateString(undefined, options)}</td>
                                            </tr>
                                        </tbody>
                                    </>


                                </table>
                            </div>
                        </div>
                        <div className="row padding">
                            <h2 className='mt-3'>Product</h2>
                            <div className="col-lg-6">
                                <img className='business-details-image ' src={image2} />
                            </div>

                            <div className="col-lg-6">
                                <table className="table mt-3">

                                    <>

                                        <tbody >
                                            <tr >
                                                <th>Product</th>
                                                <td>{product.name}</td>
                                            </tr>

                                            <tr>
                                                <th>Product Type</th>
                                                <td>{product.productType}</td>
                                            </tr>
                                            <tr>
                                                <th>Buying Price</th>
                                                <td><span className='money'>Ksh</span> {product.buyingPrice}</td>
                                            </tr>
                                            <tr>
                                                <th>Selling Price</th>
                                                <td><span className='money'>Ksh</span> {product.sellingPrice}</td>
                                            </tr>

                                        </tbody>
                                    </>


                                </table>
                            </div>
                        </div>
                        <h2 className='mt-3'>Supplies</h2>
                        <table className="table mt-3">

                            <>
                                <tbody >
                                    <tr >
                                        <th>Grand Total</th>
                                        <td><span className='money'>Ksh</span> {data.totalAmount}</td>
                                    </tr>

                                    <tr>
                                        <th>Charged Amount</th>
                                        <td><span className='money'>Ksh</span> {data.amountCharged}</td>
                                    </tr>
                                    <tr>
                                        <th>Paid Amount</th>
                                        <td><span className='money'>Ksh</span> {data.amountPaid}</td>
                                    </tr>
                                    <tr>
                                        <th>Balance</th>
                                        <td><span className='money'>Ksh</span> {data.amountCharged - data.amountPaid}</td>
                                    </tr>

                                </tbody>
                            </>


                        </table>

                    </div>
            }
        </>
    )
}

export default SuppliesDetails