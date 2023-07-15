import React from 'react'
import './Login.css'
import image2 from '../../Assets/logo.png'
import image3 from '../../Assets/ai-1.svg'
import image4 from '../../Assets/customer 1.svg'
import image5 from '../../Assets/insight 1.svg'
import image6 from '../../Assets/business-and-finance 1.svg'

const LoginBanner = () => {
  return (
    <React.Fragment>
      <div className="container-fluid login-banner">
        <div style={{ display: 'flex' }}>
          <img src={image2} className="img-fluid banner-logo" alt="..." />
          <h5
            className=" banner-heading font-medium leading-tight text-xl mt-0 mb-2 "
            style={{ padding: '20px' }}
          >
            BizMkononi
          </h5>
        </div>

        <p>
          Biz Mkononi is an AI powered insights platform that provides decision
          making tools, solutions and analytics to the small and medium
          enterprises in Kenya and the rest of the world.
        </p>
        <div
          className="text-center mt-3 login-icons"
          style={{ marginLeft: '100px' }}
        >
          <div className="mb-4" style={{ display: 'flex' }}>
            <img src={image3} className="img-fluid" alt="..." />
            <p>AI Powered Business Intelligence</p>
          </div>

          <div className="mb-4" style={{ display: 'flex' }}>
            <img src={image4} className="img-fluid" alt="..." />
            <p>360° Customer view</p>
          </div>

          <div className="mb-4" style={{ display: 'flex' }}>
            <img src={image5} className="img-fluid" alt="..." />
            <p>100% Business Insights</p>
          </div>

          <div className="mb-4" style={{ display: 'flex' }}>
            <img src={image6} className="img-fluid" alt="..." />
            <p>Revenue Projection Charts</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default LoginBanner
