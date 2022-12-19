import React, { useEffect, useState } from 'react'
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import { Card } from '@mui/material';
import "../Businesses/AddBusiness.css"
import image from "../../Assets/placeholder.jpg"
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleCustomer } from '../../Data/Customers/Data';
import CircularProgress from '@mui/material/CircularProgress';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import PersonIcon from '@mui/icons-material/Person';
import { getSingleEmployee, updateSingleEmployee } from '../../Data/Employees/Data';
import StarsIcon from '@mui/icons-material/Stars';



interface data {
    name: "",
    email: "",
    phone: "",
    description: "",
}

const EmployeeUpdateDetails = ({ id }: any) => {
    const [data, setData] = useState<data | any>({})
    const [isLoading, setIsloading] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    const navigate = useNavigate()

    const params = useParams()

    useEffect(() => {
        getSingleEmployee(setData, params.id, setIsloading, setFormData, id)


    }, [])
    const [formData, setFormData] = useState({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({...formData,[e.target.name]:e.target.files[0]})
        }
    }


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateSingleEmployee(formData, params.id, navigate, setIsUpdating, id)
        console.log(formData)

    }
    return (
        <>
            {
                isLoading ? <div className="text-center"><CircularProgress color="success" /></div> :
                    <div className='add-business container p-4 '>
                        <h2 className='mb-3'>Update employee Details</h2>

                        <div className="row padding">
                            <div className="col-lg-6">
                                <div className='details-button' style={{ display: "flex" }}>
                                    <button className='btn btn-secondary btn-md' onClick={(() => navigate(-1))}> Back</button>
                                    <button className='btn btn-primary btn-md' onClick={(() => navigate(`/employee/${params.id}/details`))}>Manage</button>
                                </div>
                            </div>

                        </div>


                        <hr className="light mb-3 mt-3" />


                        <p className="mb-4">Update your employee</p>
                        <Card className='p-3'>
                            <form onSubmit={onSubmit}>
                                <div className="row padding mt-3">
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label ">Name</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><BusinessIcon /></span>
                                            <input type="text" onChange={handleChange} defaultValue={data.name} name="name" className="form-control" placeholder="name" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label ">Email</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><EmailIcon /></span>
                                            <input type="email" onChange={handleChange} defaultValue={data.email} name="email" className="form-control" placeholder="email" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label">Phone</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><PhoneIcon /></span>
                                            <input type="text" onChange={handleChange} defaultValue={data.phone} name="phone" className="form-control" placeholder="phone number" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row padding">
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label ">ID Number</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><EmailIcon /></span>
                                            <input type="text" onChange={handleChange} defaultValue={data.idNumber} name="idNumber" className="form-control" placeholder="id number" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label">Position</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><StarsIcon /></span>
                                            <input type="text" onChange={handleChange} defaultValue={data.position} name="position" className="form-control" placeholder="position" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>

                                </div>
                                <div className="mb-3 image-upload">


                                    <label htmlFor="formFile" className="form-label">
                                        Click to update employee image
                                        <img src={image} alt="" className='business-form-image' />
                                    </label>
                                    <input className="form-control file " onChange={handleFileChange} name='image' type="file" id="formFile" />


                                </div>
                                <div className="text-center mt-3">
                                    {
                                        isUpdating ? <button className="btn btn-success btn-md" disabled >Updating</button> :
                                            <button className="btn btn-success btn-md">Update Employee</button>
                                    }
                                </div>

                            </form>
                        </Card>
                    </div>
            }
        </>
    )
}

export default EmployeeUpdateDetails