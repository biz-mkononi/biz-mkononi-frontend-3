import React, { useContext } from 'react'
import image from '../../Assets/Startup life-pana-3 1.svg'
import '../Insights/Overview.css'
import Card from '@mui/material/Card'
import { DataContext } from '../../context/ContextProvider'
import { useNavigate } from 'react-router-dom'

const NotFound = ({ icon, title, link }: any) => {
  const navigate = useNavigate()
  const { user, loggedUser, userName } = useContext(DataContext)
  return (
    <div className="container notfound">
      <div className="row padding">
        <div className="col-lg-6 mt-5">
          <h3 className=" mt-5 mb-4">Welcome, {user !== null && userName}</h3>
          <h4>To setup your business effectively and smoothly,</h4>
        </div>
        <div className="col-lg-6 text-right mt-3">
          <img src={image} alt="" />
        </div>
      </div>
      <div className="container notfound-card text-center mt-4">
        <Card className="Card">
          <span>{icon}</span>
          <h5 className="mt-4 mb-4">Add a {title}</h5>

          <button
            className="btn-info btn btn-md"
            onClick={() => navigate(link)}
          >
            Add {title}
          </button>
        </Card>
      </div>
    </div>
  )
}

export default NotFound
