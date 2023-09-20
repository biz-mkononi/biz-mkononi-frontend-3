import React, { useEffect, useState, useContext } from 'react'
import moment from 'moment'

import Card from '@mui/material/Card'
import {
  BarChart,
  Bar,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  FunnelChart,
  Funnel,
  Pie,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'
import './Overview.css'
import {
  getSalesInLastMonthTrend,
  getTotalDatePartSalesByHour,
  getSalesTrendByMonth,
  getTotalSales,
} from '../../Data/Analytics/SalesAnalytics'
import { getTotalSupplies } from '../../Data/Analytics/SuppliesAnalytics'
import { getTotalProfits } from '../../Data/Analytics/ProfitsAnalytics'
import CircularProgress from '@mui/material/CircularProgress'
import { DataContext } from '../../context/ContextProvider'
import { getSales } from '../../Data/Sales/Data'
import NotFound from '../NotFoundPage/NotFound'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import DateComponent from '../../components/DateComponent/DateComponent'

ChartJS.register(...registerables)

const SalesInsights = () => {
  const [sales, setSales] = useState<any[]>([])
  const [salesTrend, setSalesTrend] = useState<any[]>([])
  const [monthSalesTrend, setMonthSalesTrend] = useState<any[]>([])
  const [totalSales, setTotalSales] = useState<any>({})
  const [totalProfits, setTotalProfits] = useState<any>()
  const [totalSupplies, setTotalSupplies] = useState<any>()
  const [hourlySales, setHourlySales] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { businessId, startDate, endDate } = useContext(DataContext)

  useEffect(() => {
    const from = new Date(startDate)
    const to = new Date(endDate)
    const data = {
      from: from.toISOString(),
      to: to.toISOString(),
    }
    const groupByDayData = {
      from: from.toISOString(),
      to: to.toISOString(),
      group: 'day',
    }
    const groupByMonth = {
      from: from.toISOString(),
      to: to.toISOString(),
      group: 'month',
    }
    const partByHour = {
      from: from.toISOString(),
      to: to.toISOString(),
      part: 'hour',
    }
    getSalesTrendByMonth(setSalesTrend, setIsLoading, businessId, groupByMonth)
    getSalesInLastMonthTrend(
      setMonthSalesTrend,
      setIsLoading,
      businessId,
      groupByDayData,
    )
    getTotalSales(setTotalSales, setIsLoading, businessId, data)
    getTotalProfits(setTotalProfits, setIsLoading, businessId, data)
    getTotalSupplies(setTotalSupplies, setIsLoading, businessId, data)
    getSales(setSales, setIsLoading, businessId)
    getTotalDatePartSalesByHour(
      setHourlySales,
      setIsLoading,
      businessId,
      partByHour,
    )
  }, [startDate, endDate])
  const createYDomain = (data: any) => {
    const maxValue = Math.max(...data.map((item: any) => parseInt(item.total)))

    const yDomain = [0, maxValue]
    console.log(yDomain)

    return yDomain
  }
  return (
    <div>
      {isLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <>
          {sales.length === 0 ? (
            <NotFound
              icon={<AttachMoneyIcon />}
              title="Sale"
              link="/sales/add"
            />
          ) : (
            <div className="container-fluid overview">
              <DateComponent />
              <div className="insights container">
                <div className="row padding">
                  <div className="col-lg-4 col-sm-12 mt-3">
                    <div className="card text-center">
                      <h5 className="mb-2 top-cards">
                        <span className="money">Ksh</span> {totalSupplies}
                      </h5>
                      <h3>Total Supplies</h3>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="card text-center mt-3">
                      <h5 className="mb-2 top-cards">
                        <span className="money">Ksh</span> {totalSales.total}
                      </h5>
                      <h3>Total Sales</h3>
                    </div>
                  </div>
                  <div className="col-lg-4 ">
                    <div className="card text-center mt-3">
                      <h5 className="mb-2 top-cards">
                        <span className="money">Ksh</span> {totalProfits}
                      </h5>
                      <h3>Total Profits</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container charts">
                <div className="row padding">
                  <div className="col-lg-6 col-sm-12">
                    <Card className=" new-card">
                      <h5 className="text-center mb-2">Sales Trend by Date</h5>
                      <h6 className="text-center mb-5">
                        {moment(new Date(startDate)).format('MMMM Do YYYY')} -{' '}
                        {moment(new Date(endDate)).format('MMMM Do YYYY')}
                      </h6>
                      <ResponsiveContainer width="95%" height={400}>
                        <BarChart
                          data={monthSalesTrend}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 5,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="1 6" />
                          <XAxis dataKey={`group`} />
                          <YAxis domain={createYDomain(monthSalesTrend)} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="total" barSize={20} fill="#3282B8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Card>
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <Card className="new-card">
                      <h5 className="text-center mb-2">Monthly Sales</h5>
                      <h6 className="text-center mb-5">
                        {moment(new Date(startDate)).format('MMMM Do YYYY')} -{' '}
                        {moment(new Date(endDate)).format('MMMM Do YYYY')}
                      </h6>
                      <ResponsiveContainer width="95%" height={400}>
                        <BarChart
                          data={salesTrend}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="group" />
                          <YAxis domain={createYDomain(salesTrend)} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="total" barSize={20} fill="#3282B8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Card>
                  </div>
                </div>

                <div className="row padding">
                  <div className="col-lg-6 col-sm-12">
                    <Card className="new-card">
                      <h5 className="text-center mb-2">Most active hours</h5>
                      <h6 className="text-center mb-5">
                        {moment(new Date(startDate)).format('MMMM Do YYYY')} -{' '}
                        {moment(new Date(endDate)).format('MMMM Do YYYY')}
                      </h6>
                      <ResponsiveContainer width="95%" height={400}>
                        <LineChart
                          data={hourlySales}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="part" />
                          <YAxis domain={createYDomain(hourlySales)} />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#3282B8"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default SalesInsights
