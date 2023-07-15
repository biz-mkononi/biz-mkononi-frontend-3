import React, { useEffect, useState, useContext } from 'react'
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
  getCurrentMonthSales,
  getCurrentSales,
  getDailySales,
  getRepeatCustomerRate,
  getSalesInLastMonthTrend,
  getTotalDatePartSalesByHour,
  getSalesTrendByMonth,
  getTotalDatePartSalesByWeekDay,
  getTotalSales,
  getMonthlyTotalDatePartSalesByHour,
  getMonthlyTotalDatePartSalesByWeekDay,
} from '../../Data/Analytics/SalesAnalytics'
import { getTotalSupplies } from '../../Data/Analytics/SuppliesAnalytics'
import { getTotalProfits } from '../../Data/Analytics/ProfitsAnalytics'
import CircularProgress from '@mui/material/CircularProgress'
import { DataContext } from '../../context/ContextProvider'
import { getSales } from '../../Data/Sales/Data'
import NotFound from '../NotFoundPage/NotFound'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { months } from '../../Constants/Constants'

ChartJS.register(...registerables)
const SalesInsights = () => {
  const [sales, setSales] = useState<any[]>([])
  const [salesTrend, setSalesTrend] = useState<any[]>([])
  const [monthSalesTrend, setMonthSalesTrend] = useState<any[]>([])
  const [totalSales, setTotalSales] = useState<any>({})
  const [repeatCustomerRate, setRepeatCustomerRate] = useState<any>({})
  const [totalProfits, setTotalProfits] = useState<any>()
  const [totalSupplies, setTotalSupplies] = useState<any>()
  const [partSales, setPartSales] = useState<any[]>([])
  const [dailySales, setDailySales] = useState<any>({})
  const [currentMonthSales, setCurrentMonthSales] = useState<any>({})
  const [newMonthSales, setNewMonthSales] = useState<any>({})
  const [hourlySales, setHourlySales] = useState<string[]>([])
  const [monthlyHourlySales, setMonthlyHourlySales] = useState<string[]>([])
  const [monthlyWeeklySales, setMonthlyWeeklySales] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { open, businessId } = useContext(DataContext)

  useEffect(() => {
    getSalesTrendByMonth(setSalesTrend, setIsLoading, businessId)
    getSalesInLastMonthTrend(setMonthSalesTrend, setIsLoading, businessId)
    getTotalSales(setTotalSales, setIsLoading, businessId)
    getRepeatCustomerRate(setRepeatCustomerRate, setIsLoading, businessId)
    getTotalProfits(setTotalProfits, setIsLoading, businessId)
    getTotalSupplies(setTotalSupplies, setIsLoading, businessId)
    getTotalDatePartSalesByWeekDay(setPartSales, setIsLoading, businessId)
    getDailySales(setDailySales, setIsLoading, businessId)
    getCurrentMonthSales(setCurrentMonthSales, setIsLoading, businessId)
    getCurrentSales(setNewMonthSales, setIsLoading, businessId)
    getSales(setSales, setIsLoading, businessId)
    getTotalDatePartSalesByHour(setHourlySales, setIsLoading, businessId)
    getMonthlyTotalDatePartSalesByHour(
      setMonthlyHourlySales,
      setIsLoading,
      businessId,
    )
    getMonthlyTotalDatePartSalesByWeekDay(
      setMonthlyWeeklySales,
      setIsLoading,
      businessId,
    )
  }, [])
  let date = new Date()
  const month = date.getMonth()

  const createYDomain = (data: any) => {
    const minValue = Math.min(...data.map((item: any) => parseInt(item.total)))
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
                <div className="row padding">
                  <div className="col-lg-4 mt-3">
                    <div className="card text-center">
                      <h5 className="mb-2 top-cards">
                        {repeatCustomerRate.rate}%
                      </h5>
                      <h3>Repeat Purchase Rate</h3>
                    </div>
                  </div>
                  <div className="col-lg-4 mt-3">
                    <div className="card text-center">
                      <h5 className="mb-2 top-cards">
                        <span className="money">Ksh</span> {dailySales.total}
                      </h5>
                      <h3>Today's Sales</h3>
                    </div>
                  </div>
                  <div className="col-lg-4 mt-3">
                    <div className="card text-center">
                      <h5 className="mb-2 top-cards">
                        <span className="money">Ksh</span> {newMonthSales.total}
                      </h5>
                      <h3>{months[month]} Sales</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container charts">
                <div className="row padding">
                  <div className="col-lg-6 col-sm-12">
                    <Card className=" new-card">
                      <h5 className="text-center mb-5">
                        Sales Trend in last one month
                      </h5>
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
                      <h5 className="text-center mb-5">
                        Monthly Sales in the last one year
                      </h5>
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
                      <h5 className="text-center mb-5">
                        Daily sales in the last one year
                      </h5>
                      <ResponsiveContainer width="95%" height={400}>
                        <BarChart
                          width={400}
                          height={359}
                          data={partSales}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="part" />
                          <YAxis domain={createYDomain(partSales)} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="total" barSize={20} fill="#3282B8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Card>
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <Card className="new-card">
                      <h5 className="text-center mb-5">
                        Daily sales in the last one month
                      </h5>
                      <ResponsiveContainer width="95%" height={400}>
                        <BarChart
                          width={400}
                          height={359}
                          data={monthlyWeeklySales}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="part" />
                          <YAxis domain={createYDomain(monthlyWeeklySales)} />
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
                      <h5 className="text-center mb-5">
                        Most active hours in the past one year
                      </h5>
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
                  <div className="col-lg-6 col-sm-12">
                    <Card className="new-card">
                      <h5 className="text-center mb-5">
                        Most active hours in the past one month
                      </h5>
                      <ResponsiveContainer width="95%" height={400}>
                        <LineChart
                          data={monthlyHourlySales}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="part" />
                          <YAxis domain={createYDomain(monthlyHourlySales)} />
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
