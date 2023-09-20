import React, { useState, useEffect } from 'react'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import PersonIcon from '@mui/icons-material/Person'
import ScaleIcon from '@mui/icons-material/Scale'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Card } from '@mui/material'
import { getCustomers } from '../../Data/Customers/Data'
import { getProducts } from '../../Data/Products/Data'
import '../Businesses/AddBusiness.css'
import { addSale, getSingleSale } from '../../Data/Sales/Data'
import { useNavigate, useParams } from 'react-router-dom'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

interface data {
  name: ''
  description: ''
  date: ''
}
const UpdateSale = ({ id }: any) => {
  const navigate = useNavigate()
  const [data, setData] = useState<data | any>({})
  const [customerSale, setCustomerSale] = useState<data | any>({})
  const [product, setProduct] = useState<data | any>([])
  const [customers, setCustomers] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [price, setPrice] = useState('0')
  const [amountCharged, setAmountCharged] = useState('0')
  const [amountPaid, setAmountPaid] = useState('0')
  const [totalAmount, setTotalAmount] = useState('0')
  const [customerId, setCustomer] = useState('')
  const [productId, setProductId] = useState()
  const [quantity, setQuantity] = useState('')
  const params = useParams()
  useEffect(() => {
    getCustomers(setCustomers, setIsLoading, id)
    getProducts(setProducts, setIsLoading, id)
    getSingleSale(
      setData,
      setCustomerSale,
      setProduct,
      params.id,
      setIsLoading,
      id,
    )
  }, [price, isLoading])

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCustomer(e.target.value)
  }
  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let obj = JSON.parse(e.target.value)
    setPrice(obj.sellingPrice)
    setProductId(obj.id)
  }

  const handleAmountChargedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAmountCharged(parseInt(e.target.value).toString())
  }
  const handleAmountPaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountPaid(parseInt(e.target.value).toString())
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value)
    setAmountCharged((parseInt(e.target.value) * parseFloat(price)).toString())
    setAmountPaid((parseInt(e.target.value) * parseFloat(price)).toString())
    setTotalAmount((parseInt(e.target.value) * parseFloat(price)).toString())
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const items = [
      {
        productId,
        salePrice: price,
        quantity: parseInt(quantity),
      },
    ]

    const formData = {
      saleItems: items.map((item: any) => {
        return {
          productId: item.productId,
          salePrice: item.salePrice,
          quantity: parseInt(item.quantity),
        }
      }),
      amountCharged: parseInt(amountCharged),
      amountPaid: parseInt(amountPaid),
      customerId,
    }

    addSale(formData, navigate, setIsLoading, id, setAmountPaid)
  }
  // console.log(product.quantity)
  const balance = parseInt(amountPaid) - parseInt(amountCharged)
  return (
    <div className="add-business container p-4 ">
      <h2 className="mb-3">Update Sale Details</h2>
      <div className="row padding">
        <div className="col-lg-6">
          <div className="details-button" style={{ display: 'flex' }}>
            <button
              className="btn btn-secondary btn-md"
              onClick={() => navigate(-1)}
            >
              {' '}
              Back
            </button>
            <button
              className="btn btn-primary btn-md"
              onClick={() => navigate(`/categories/${params.id}/details`)}
            >
              Manage
            </button>
          </div>
        </div>
      </div>
      <Card className="p-3">
        <form onSubmit={onSubmit}>
          <div className="row padding mt-3">
            <div className="col-lg-6">
              <label htmlFor="basic-url" className="form-label">
                Customer
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <PersonIcon />
                </span>
                <select
                  className="form-select"
                  onChange={handleCustomerChange}
                  name="category"
                  aria-label="Default select example"
                  id="basic-addon1"
                >
                  <option selected>{customerSale.name}</option>
                  {customers.map((customer) => {
                    return (
                      <option value={customer.id} key={customer.id}>
                        {customer.name}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <label htmlFor="basic-url" className="form-label">
                Product
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <ProductionQuantityLimitsIcon />
                </span>
                <select
                  className="form-select"
                  onChange={handlePriceChange}
                  name="category"
                  aria-label="Default select example"
                  id="basic-addon1"
                >
                  <option selected>{product.name}</option>
                  {products.map((product, index) => {
                    return (
                      <option value={JSON.stringify(product)} key={index}>
                        {product.name}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="row padding">
            <div className="col-lg-6">
              <label htmlFor="basic-url" className="form-label ">
                Quantity
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <ScaleIcon />
                </span>
                <input
                  type="text"
                  value={quantity}
                  onChange={handleQuantityChange}
                  name="location"
                  className="form-control"
                  placeholder="quantity"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <label htmlFor="basic-url" className="form-label">
                Item Price
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <AttachMoneyIcon />
                </span>
                <input
                  type="text"
                  value={price}
                  name="locationDetails"
                  className="form-control"
                  placeholder="details"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>

            <h2 className="mb-4">Grand Total : Ksh: {totalAmount}</h2>
          </div>
          <div className="row padding">
            <div className="col-lg-6"></div>
            <div className="col-lg-6">
              <label htmlFor="basic-url" className="form-label ">
                Amount Charged
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <AttachMoneyIcon />
                </span>
                <input
                  type="text"
                  value={amountCharged}
                  onChange={handleAmountChargedChange}
                  name="location"
                  className="form-control"
                  placeholder="location"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <label htmlFor="basic-url" className="form-label">
                Amount Paid
              </label>
              <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">
                  <AttachMoneyIcon />
                </span>
                <input
                  type="text"
                  value={amountPaid}
                  onChange={handleAmountPaidChange}
                  name="locationDetails"
                  className="form-control"
                  placeholder="details"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <h2 className="mb-4">Balance : Ksh: {balance}</h2>
            </div>
          </div>
          <div className="text-center mt-3">
            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              disabled={isLoading ? true : false}
            >
              {' '}
              {isLoading ? 'updating' : 'Update Sale'}{' '}
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default UpdateSale
