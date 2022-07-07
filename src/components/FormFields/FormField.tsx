import React from 'react'

interface formProps {
    labelName: string
    icon: any
    onChange: any
    name: string


}

const FormField = ({ labelName, icon, onChange, name }: formProps) => {
    return (
        <div>
            <label htmlFor="basic-url" className="form-label ">{labelName}</label>
            <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">{icon}</span>
                <input type="text" onChange={onChange} name={name} className="form-control" placeholder="location" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            {/* <label htmlFor="basic-url" className="form-label">{labelName}</label> */}
            {/* <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">{icon}</span>
                <select className="form-select" onChange={onChange} name={name} aria-label="Default select example" id="basic-addon1">
                    <option selected>{option1}</option>
                    <option value="PRODUCT">{option2}</option>
                    <option value="SERVICE">{option3}</option>
                    <option value="SERVICE_PRODUCT">{option4}</option>
                </select>
            </div> */}
        </div>
    )
}

export default FormField