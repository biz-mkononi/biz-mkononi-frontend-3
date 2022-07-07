import React, { useState } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Card } from '@mui/material';
const NewCategory = () => {
    const initialState = { name: "", age: "", gender: "", phone: "", email: "", description: "" }


    const [formData, setFormData] = useState(initialState)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }



    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

    }

    return (
        <div className='add-business container p-4 '>
            <h2 className='mb-3'>Add Category</h2>

            <hr className="light mb-3" />
            <p className="mb-4">Add a new category to your business</p>
            <Card className='p-3'>
                <form onSubmit={onSubmit}>
                    <label htmlFor="basic-url" className="form-label ">Name</label>
                    <div className="input-group mb-5">
                        <span className="input-group-text" id="basic-addon1"><BusinessIcon /></span>
                        <input type="text" onChange={handleChange} name="name" className="form-control" placeholder="name" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <label htmlFor="basic-url" className="form-label ">Description</label>
                    <div className="input-group mb-3">
                        <textarea className="form-control" onChange={handleDescriptionChange} name='description' aria-label="With textarea"></textarea>
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor="formFile" className="form-label">Click below to upload business image</label>
                        <input className="form-control file mt-2" name='image' type="file" id="formFile" />
                    </div>
                    <div className="text-center mt-3">
                        <button className="btn btn-success btn-md">Add Category</button>
                    </div>

                </form>
            </Card>
        </div>
    )
}

export default NewCategory