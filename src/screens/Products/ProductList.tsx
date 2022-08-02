import React, { useEffect, useState } from 'react'
import "../Businesses/AddBusiness.css"
import { Pagination } from '@mui/material'
import { getProducts } from "../../Data/Products/Data"
import { useNavigate } from "react-router-dom"

const ProductsList = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<any[]>([])
    useEffect(() => {
        getProducts(setData)
    }, [])

    console.log(data)
    const onClick = (id: any) => {
        localStorage.setItem("supplierId", JSON.stringify({ id }));
        navigate(0)
    }
    return (
        <div className='container p-3'>
            <input className="form-control search mb-3" type="search" placeholder="Search by location" aria-label="Search"></input>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Product Type</th>
                        <th scope="col">Size</th>
                        <th scope="col">Unit</th>
                        <th scope="col">Buying Price</th>
                        <th scope="col">Selling Price</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Actions</th>

                    </tr>
                </thead>
                {
                    data.map((product) => (
                        <tbody>
                            <tr>
                                <th scope="row" >{product.name}</th>
                                <td>{product.category.name}</td>
                                <td>{product.productType}</td>
                                <td>{product.size}</td>
                                <td>{product.unit}</td>
                                <td>{product.buyingPrice}</td>
                                <td>{product.sellingPrice}</td>
                                <td>{product.stock}</td>



                                <td>
                                    <button className="btn btn-warning btn-sm ml-2 " onClick={(() => { onClick(product.id) })}>View</button>
                                    <button className="btn btn-success btn-sm ml-2">Edit</button>
                                    <button className="btn btn-danger btn-sm ml-2">Delete</button>
                                </td>


                            </tr>

                        </tbody>
                    ))
                }

            </table>
            <div className="mt-5 text-center">
                <Pagination className='text-center' count={5} color="secondary" />
            </div>
        </div>
    )
}

export default ProductsList