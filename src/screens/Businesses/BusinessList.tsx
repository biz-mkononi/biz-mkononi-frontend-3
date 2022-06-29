import React from 'react'
import "./AddBusiness.css"
import { Pagination } from '@mui/material'

const BusinessList = () => {
    return (
        <div className='container p-3'>
            <input className="form-control search mb-3" type="search" placeholder="Search by location" aria-label="Search"></input>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Admin</th>
                        <th scope="col">Product Type</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Electron Supermarket</th>
                        <td>Nairobi, Kenya</td>
                        <td>John Doe</td>
                        <td>Service</td>
                        <td>johndoe@gmail.com</td>
                        <td>+254 923801474</td>

                    </tr>
                    <tr>
                        <th scope="row">Protron Supermarket</th>
                        <td>Nairobi, Kenya</td>
                        <td>John Doe</td>
                        <td>Service</td>
                        <td>johndoe@gmail.com</td>
                        <td>+254 923801474</td>
                    </tr>
                    <tr>
                        <th scope="row">Lime Agency</th>
                        <td>Nairobi, Kenya</td>
                        <td>John Doe</td>
                        <td>Service</td>
                        <td>johndoe@gmail.com</td>
                        <td>+254 923801474</td>

                    </tr>
                    <tr>
                        <th scope="row">Electron Supermarket</th>
                        <td>Nairobi, Kenya</td>
                        <td>John Doe</td>
                        <td>Service</td>
                        <td>johndoe@gmail.com</td>
                        <td>+254 923801474</td>

                    </tr>
                    <tr>
                        <th scope="row">Electron Supermarket</th>
                        <td>Nairobi, Kenya</td>
                        <td>John Doe</td>
                        <td>Service</td>
                        <td>johndoe@gmail.com</td>
                        <td>+254 923801474</td>

                    </tr>
                    <tr>
                        <th scope="row">Maria Supermarket</th>
                        <td>Nairobi, Kenya</td>
                        <td>John Doe</td>
                        <td>Service</td>
                        <td>johndoe@gmail.com</td>
                        <td>+254 923801474</td>

                    </tr>
                    <tr>
                        <th scope="row">Packer Supermarket</th>
                        <td>Nairobi, Kenya</td>
                        <td>John Doe</td>
                        <td>Service</td>
                        <td>johndoe@gmail.com</td>
                        <td>+254 923801474</td>

                    </tr>
                </tbody>
            </table>
            <div className="mt-5 text-center">
                <Pagination className='text-center' count={5} color="secondary" />
            </div>
        </div>
    )
}

export default BusinessList