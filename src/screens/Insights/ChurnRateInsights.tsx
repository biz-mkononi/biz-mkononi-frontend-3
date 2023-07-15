import React, { useContext, useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  ResponsiveContainer,
} from 'recharts'
import { Chart as ChartJS, registerables } from 'chart.js'
import './Overview.css'
import {
  getChurnCustomerRate,
  getNewCustomers,
  getRepeatCustomerRate,
} from '../../Data/Analytics/CustomerAnalytics'
import CircularProgress from '@mui/material/CircularProgress'
import { DataContext } from '../../context/ContextProvider'

ChartJS.register(...registerables)
const ChurnRateInsights = () => {
  const [newCustomers, setNewCustomers] = useState<any>({})
  const [repeatPurchaseRate, setRepeatPurchaseRate] = useState<any>()
  const [churnRate, setChurnRate] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { businessId } = useContext(DataContext)
  useEffect(() => {
    getNewCustomers(setNewCustomers, setIsLoading, businessId)
    getRepeatCustomerRate(setRepeatPurchaseRate, setIsLoading, businessId)
    getChurnCustomerRate(setChurnRate, setIsLoading, businessId)
  }, [])
  const churnData = [
    {
      name: 'new Customers',
      total: newCustomers.total,
    },
    {
      name: 'repeat purchase rate %',
      total: repeatPurchaseRate,
    },
    {
      name: 'churn rate %',
      total: churnRate,
    },
  ]
  let date = new Date()
  const month = date.getMonth()
  return (
    <div>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className="container-fluid overview">
          <div className="insights container">
            <div className="row padding">
              <div className="col-lg-4 mt-3">
                <div className="card text-center">
                  <h2 className="mb-2">{newCustomers.total}</h2>
                  <h3>New Customers Acquired</h3>
                </div>
              </div>
              <div className="col-lg-4 mt-3">
                <div className="card text-center">
                  <h2 className="mb-2">{churnRate}%</h2>
                  <h3>Customer Churn Rate</h3>
                </div>
              </div>
              <div className="col-lg-4 mt-3">
                <div className="card text-center">
                  <h2 className="mb-2">{repeatPurchaseRate} %</h2>
                  <h3>Repeat Purchase Rate</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="container charts">
            <div className="row padding">
              <div className="col-lg-12 col-sm-12">
                <Card className="Card new-card">
                  <h5 className="text-center mb-5">
                    Customer Details in the last 30 days
                  </h5>
                  <ResponsiveContainer width="95%" height={400}>
                    <BarChart
                      data={churnData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="total" barSize={20} fill="#3282B8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChurnRateInsights
