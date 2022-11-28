import React, { useContext, useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import {
    Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, ResponsiveContainer
} from 'recharts';
import { Doughnut } from 'react-chartjs-2';

import { Chart as ChartJS, registerables } from "chart.js";
import "./Overview.css"
import { getChurnCustomerRate, getNewCustomers, getRepeatCustomerRate } from '../../Data/Analytics/CustomerAnalytics';
import CircularProgress from '@mui/material/CircularProgress';
import { getTodayTotalProfits, getTotalProfits } from '../../Data/Analytics/ProfitsAnalytics';
import { getTodayTotalSupplies, getTotalSupplies } from '../../Data/Analytics/SuppliesAnalytics';
import { getDailySales, getTotalSales } from '../../Data/Analytics/SalesAnalytics';
import { DataContext } from '../../context/ContextProvider';

ChartJS.register(...registerables);
const RevenueInsights = () => {
    const [totalSupplies, setTotalSupplies] = useState<any>()
    const [totalSales, setTotalSales] = useState<any>({})
    const [totalProfits, setTotalProfits] = useState<any>()
    const [totalTodayProfits, setTotalTodayProfits] = useState<any>()
    const [totalTodaySupplies, setTotalTodaySupplies] = useState<any>()
    const [totalTodaySales, setTotalTodaySales] = useState<any>({})
    const [isLoading, setIsLoading] = useState(false)
    const { businessId } = useContext(DataContext)
    useEffect(() => {
        getTotalSupplies(setTotalSupplies, setIsLoading, businessId)
        getTotalSales(setTotalSales, setIsLoading, businessId)
        getTotalProfits(setTotalProfits, setIsLoading, businessId)
        getTodayTotalProfits(setTotalTodayProfits, setIsLoading, businessId)
        getTodayTotalSupplies(setTotalTodaySupplies, setIsLoading, businessId)
        getDailySales(setTotalTodaySales, setIsLoading, businessId)
    }, [])

    const revenueData = [
        {
            name: 'Total Supplies',
            total: totalSupplies
        },
        {
            name: 'Total Sales',
            total: totalSales.total
        },
        {
            name: 'Total Profits',
            total: totalProfits
        }
    ]
    const todayRevenueData = [
        {
            name: 'Total Supplies',
            total: totalTodaySupplies
        },
        {
            name: 'Total Sales',
            total: totalTodaySales.total
        },
        {
            name: 'Total Profits',
            total: totalTodayProfits
        }
    ]
    console.log(totalTodayProfits)
    return (
        <div>
            {
                isLoading ? <div className="text-center"><CircularProgress color="success" /></div> :
                    <div className='container-fluid overview'>
                        <div className="insights container">
                            <div className="row padding">

                                <div className="col-lg-4 mt-3">
                                    <div className="card text-center">
                                        <h5 className='mb-2 top-cards'><span className='money'>Ksh</span> {totalSupplies}</h5>
                                        <h3>Total Supplies in last 30 days</h3>
                                    </div>
                                </div>
                                <div className="col-lg-4 mt-3">
                                    <div className="card text-center">
                                        <h5 className='mb-2 top-cards'><span className='money'>Ksh</span> {totalSales.total}</h5>
                                        <h3>Total Sales in last 30 days</h3>
                                    </div>
                                </div>
                                <div className="col-lg-4 mt-3">
                                    <div className="card text-center">
                                        <h5 className='mb-2 top-cards'><span className='money'>Ksh</span> {totalProfits}</h5>
                                        <h3>Total Profit in last 30 days</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row padding ">

                                <div className="col-lg-4 mt-3">
                                    <div className="card text-center">
                                        <h5 className='mb-2 top-cards'><span className='money'>Ksh</span> {totalTodaySupplies}</h5>
                                        <h3>Total Supplies in last 24 hours</h3>
                                    </div>
                                </div>
                                <div className="col-lg-4 mt-3">
                                    <div className="card text-center">
                                        <h5 className='mb-2 top-cards'><span className='money'>Ksh</span> {totalTodaySales.total}</h5>
                                        <h3>Total Sales in last 24 hours</h3>
                                    </div>
                                </div>
                                <div className="col-lg-4 mt-3">
                                    <div className="card text-center">
                                        <h5 className='mb-2 top-cards'><span className='money'>Ksh</span> {totalTodayProfits}</h5>
                                        <h3>Total Profit in last 24 hours</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container charts">
                            <div className="row padding">
                                <div className="col-lg-12 col-sm-12">
                                    <Card className="new-card">
                                        <h5 className="text-center mb-5">Revenue Comparison in the last 30 days</h5>
                                        <ResponsiveContainer width="95%" height={400}>
                                            <BarChart

                                                data={revenueData}
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
                                                <Bar dataKey="total" barSize={20} fill='#3282B8' />
                                            </BarChart>
                                        </ResponsiveContainer>

                                    </Card>
                                </div>

                            </div>
                            <div className="row padding">
                                <div className="col-lg-12 col-sm-12">
                                    <Card className="new-card">
                                        <h5 className="text-center mb-5">Revenue Comparison in the last 24 hours</h5>
                                        <ResponsiveContainer width="95%" height={400}>
                                            <BarChart

                                                data={todayRevenueData}
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

export default RevenueInsights