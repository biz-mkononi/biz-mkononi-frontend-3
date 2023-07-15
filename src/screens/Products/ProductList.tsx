import React, { useEffect, useState } from 'react'
import '../Businesses/AddBusiness.css'
import { Pagination } from '@mui/material'
import { getProducts } from '../../Data/Products/Data'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'

const ProductsList = ({ id }: any) => {
  const navigate = useNavigate()
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)
  useEffect(() => {
    getProducts(setData, setIsLoading, id)
  }, [])

  console.log(data)
  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className="container p-3">
          <input
            className="form-control search mb-3"
            type="search"
            placeholder="Search by location"
            aria-label="Search"
          ></input>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Size</th>
                <th scope="col">Stock</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {currentPosts.map((product) => (
              <tbody>
                <tr>
                  <th scope="row">{product.name}</th>
                  <td>{product.category.name}</td>
                  <td>{product.size}</td>
                  <td>{product.stock}</td>

                  <td>
                    <div style={{ display: 'flex' }}>
                      <button
                        className="btn btn-warning btn-sm m-2 "
                        onClick={() =>
                          navigate(`/products/${product.id}/details`)
                        }
                      >
                        View
                      </button>
                      <button
                        className="btn btn-success btn-sm m-2"
                        onClick={() =>
                          navigate(`/products/${product.id}/update-details`)
                        }
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <div className="mt-5 text-center">
            <Pagination
              className="text-center"
              count={Math.ceil(data.length / postsPerPage)}
              onChange={handleChange}
              color="secondary"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ProductsList
