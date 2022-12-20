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
import { getSingleCustomer, updateSingleCustomer } from '../../Data/Customers/Data';
import CircularProgress from '@mui/material/CircularProgress';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import PersonIcon from '@mui/icons-material/Person';


interface data {
    name: "",
    email: "",
    phone: "",
    description: "",
    yearOfBirth: "",
    gender: ""
}

const UpdateCustomerDetails = ({ id }: any) => {
    const [data, setData] = useState<data | any>({})
    const [isLoading, setIsloading] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [displayImage, setDisplayImage] = useState ("")
    const navigate = useNavigate()

    const [formData, setFormData] = useState({})


    const params = useParams()

    useEffect(() => {
        getSingleCustomer(setData, params.id, setIsloading, setFormData, id)


    }, [location])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handlFileeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({...formData,[e.target.name]:e.target.files[0]})
            setDisplayImage(URL.createObjectURL(e.target.files[0]));
        }
    }


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateSingleCustomer(formData, params.id, navigate, setIsUpdating, id)
    }
    console.log(formData)

    return (
        <>
            {
                isLoading ? <div className="text-center"><CircularProgress color="success" /></div> :
                    <div className='add-business container p-4 '>
                        <h2 className='mb-3'>Update Customers Details</h2>

                        <div className="row padding">
                            <div className="col-lg-6">
                                <div className='details-button' style={{ display: "flex" }}>
                                    <button className='btn btn-secondary btn-md' onClick={(() => navigate(-1))}> Back</button>
                                </div>
                            </div>

                        </div>


                        <hr className="light mb-3 mt-3" />


                        <p className="mb-4">Update your customer</p>


                        <Card className='p-3'>
                            <form onSubmit={onSubmit}>
                                <div className="row padding mt-3">
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label ">Name</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><PersonIcon /></span>
                                            <input type="text" onChange={handleChange} defaultValue={data.name} name="name" className="form-control" placeholder="name" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label">Year Of Birth</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><PersonIcon /></span>
                                            <input type="text" onChange={handleChange} defaultValue={data.yearOfBirth} name="yearOfBirth" className="form-control" placeholder="year of birth" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <FormControl>
                                            <label htmlFor="basic-url" className="form-label">Gender</label>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue={data.gender}
                                                name="gender"
                                                onChange={handleChange}
                                            >
                                                <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                                                <FormControlLabel value="MALE" control={<Radio />} label="Male" />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="row padding mt-3">

                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label">Customer Email</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><EmailIcon /></span>
                                            <input defaultValue={data.email} type="text" onChange={handleChange} name="email" className="form-control" placeholder="email" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label">Customer Phone</label>
                                        <div className="input-group mb-5">
                                            <span className="input-group-text" id="basic-addon1"><PhoneIcon /></span>
                                            <input defaultValue={data.phone} type="text" onChange={handleChange} name="phone" className="form-control" placeholder="phone" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row padding">
                                    <div className="col-lg-4">
                                        <label htmlFor="basic-url" className="form-label ">Description</label>
                                        <div className="input-group mb-3">
                                            <textarea defaultValue={data.description} className="form-control" onChange={handleDescriptionChange} name='description' aria-label="With textarea"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="mb-3 image-upload">


                                            <label htmlFor="formFile" className="form-label">
                                                Click to set supplier image
                                                <img src={ displayImage === ""?data.imageUrl ===null? image:data.imageUrl:displayImage} alt="" className='business-form-image' />
                                            </label>
                                            <input className="form-control file " onChange={handlFileeChange} name='image' type="file" id="formFile" />


                                        </div>
                                    </div>

                                </div>
                                <div className="text-center mt-3">
                                    {
                                        isUpdating ? <button className="btn btn-success btn-md" disabled>Updating</button> :
                                            <button className="btn btn-success btn-md">Update Customer</button>
                                    }

                                </div>

                            </form>
                        </Card>

                    </div>
            }
        </>
    )
}

export default UpdateCustomerDetails