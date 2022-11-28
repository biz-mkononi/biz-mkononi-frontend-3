import React, { useEffect, useState, useContext } from 'react'
import Card from '@mui/material/Card';
import {
    BarChart, Bar, LabelList, XAxis, YAxis, CartesianGrid, Tooltip, Legend, FunnelChart, Funnel, Pie, ResponsiveContainer
} from 'recharts';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from "chart.js";
import "./Overview.css"
import { getCurrentMonthSales, getCurrentSales, getDailySales, getRepeatCustomerRate, getSalesTrend, getTotalDatePartSales, getTotalSales } from '../../Data/Analytics/SalesAnalytics';
import { getTotalSupplies, months } from '../../Data/Analytics/SuppliesAnalytics';
import { getTotalProfits } from '../../Data/Analytics/ProfitsAnalytics';
import CircularProgress from '@mui/material/CircularProgress';
import { DataContext } from '../../context/ContextProvider';

ChartJS.register(...registerables);
const SalesInsights = () => {
    const [salesTrend, setSalesTrend] = useState<any[]>([])
    const [totalSales, setTotalSales] = useState<any>({})
    const [repeatCustomerRate, setRepeatCustomerRate] = useState<any>({})
    const [totalProfits, setTotalProfits] = useState<any>()
    const [totalSupplies, setTotalSupplies] = useState<any>()
    const [partSales, setPartSales] = useState<any[]>([])
    const [dailySales, setDailySales] = useState<any>({})
    const [currentMonthSales, setCurrentMonthSales] = useState<any>({})
    const [newMonthSales, setNewMonthSales] = useState<any>({})
    const [isLoading, setIsLoading] = useState(false)
    const { open, businessId } = useContext(DataContext)

    useEffect(() => {
        getSalesTrend(setSalesTrend, setIsLoading, businessId)
        getTotalSales(setTotalSales, setIsLoading, businessId)
        getRepeatCustomerRate(setRepeatCustomerRate, setIsLoading, businessId)
        getTotalProfits(setTotalProfits, setIsLoading, businessId)
        getTotalSupplies(setTotalSupplies, setIsLoading, businessId)
        getTotalDatePartSales(setPartSales, setIsLoading, businessId)
        getDailySales(setDailySales, setIsLoading, businessId)
        getCurrentMonthSales(setCurrentMonthSales, setIsLoading, businessId)
        getCurrentSales(setNewMonthSales, setIsLoading, businessId)
    }, [])
    console.log(currentMonthSales)
    let date = new Date()
    const month = date.getMonth()

    const funnelData = [
        {
            name: "total Supplies",
            total: totalSupplies
        },
        {
            name: "total Sales",
            total: totalSales.total
        },
        {
            name: "total Profits",
            total: totalProfits
        }
    ]
    return (
        <div>
            {
                isLoading ? <div className="text-center"><CircularProgress color="success" /></div> :
                    <div className='container-fluid overview'>
                        <div className="insights container">
                            <div className="row padding">
                                <div className="col-lg-4 col-sm-12 mt-3">
                                    <div className="card text-center">
                                        <h5 className='mb-2 top-cards'><span className='money'>Ksh</span> {totalSupplies}</h5>
                                        <h3>Total Supplies</h3>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <div className="card text-center mt-3">
                                        <h5 className='mb-2 top-cards'><span className='money'>Ksh</span> {totalSales.total}</h5>
                                        <h3>Total Sales</h3>
                                    </div>
                                </div>
                                <div className="col-lg-4 ">
                                    <div className="card text-center mt-3">
                                        <h5 className='mb-2 top-cards'><span className='money'>Ksh</span> {totalProfits}</h5>
                                        <h3>Total Profits</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row padding">
                                <div className="col-lg-4 mt-3">
                                    <div className="card text-center">
                                        <h5 className='mb-2 top-cards'>{repeatCustomerRate.rate}%</h5>
                                        <h3>Repeat Purchase Rate</h3>
                                    </div>
                                </div>
                                <div className="col-lg-4 mt-3">
                                    <div className="card text-center">
                                        <h5 className='mb-2 top-cards'><span className='money'>Ksh</span> {dailySales.total}</h5>
                                        <h3>Today's Sales</h3>
                                    </div>
                                </div>
                                <div className="col-lg-4 mt-3">
                                    <div className="card text-center">
                                        <h5 className='mb-2 top-cards'><span className='money'>Ksh</span> {newMonthSales.total}</h5>
                                        <h3>{months[month]} Sales</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container charts">
                            <div className="row padding">
                                <div className="col-lg-6 col-sm-12">
                                    <Card className=" new-card">
                                        <h5 className="text-center mb-5">weekly sales in last one month</h5>
                                        <ResponsiveContainer width="95%" height={400}>
                                            <BarChart

                                                data={salesTrend}
                                                margin={{
                                                    top: 10,
                                                    right: 30,
                                                    left: 5,
                                                    bottom: 5,
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="1 6" />
                                                <XAxis dataKey={`group`} />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="total" barSize={20} fill='#3282B8' />
                                            </BarChart>
                                        </ResponsiveContainer>

                                    </Card>
                                </div>
                                <div className="col-lg-6 col-sm-12">
                                    <Card className="new-card">
                                        <h5 className="text-center mb-4">Sales statistics</h5>
                                        <ResponsiveContainer width="95%" height={400}>
                                            <FunnelChart >
                                                <Tooltip />
                                                <Funnel
                                                    dataKey="total"
                                                    data={funnelData}
                                                    isAnimationActive
                                                    fill="#3282B8"
                                                >
                                                    <LabelList position="right" fill="#3282B8" stroke="none" dataKey="name" />
                                                </Funnel>
                                            </FunnelChart>
                                        </ResponsiveContainer>


                                    </Card>
                                </div>
                            </div>
                            <div className="row padding">
                                <div className="col-lg-6 col-sm-12">
                                    <Card className="new-card">
                                        <h5 className="text-center mb-5">Sales for the month of {months[month]}</h5>
                                        <ResponsiveContainer width="95%" height={400}>
                                            <BarChart

                                                data={currentMonthSales}
                                                margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5,
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="group" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="count" barSize={20} fill='#BBe1FA' />
                                                <Bar dataKey="total" barSize={20} fill='#3282B8' />
                                            </BarChart>
                                        </ResponsiveContainer>

                                    </Card>
                                </div>
                                <div className="col-lg-6 col-sm-12">
                                    <Card className="new-card">
                                        <h5 className="text-center mb-5">Partly Weekly sales in last one month</h5>
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
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="count" barSize={20} fill='#BBe1FA' />
                                                <Bar dataKey="total" barSize={20} fill='#3282B8' />
                                            </BarChart>
                                        </ResponsiveContainer>

                                    </Card>
                                </div>
                            </div>

                        </div>

                    </div>

            }

        </div>
    )
}

export default SalesInsights