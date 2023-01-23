import Card from '@mui/material/Card';
import {
    ComposedChart,
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, ResponsiveContainer
} from 'recharts';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from "chart.js";
import "./Overview.css"
import { useContext, useEffect, useState } from "react";
import { getAgeStats, getChurnCustomerRate, getCurrentMonthNewCustomers, getDailyNewCustomers, getGenderStats, getMostActiveCustomers, getMostActiveInCurrentCustomers, getNewCustomers, getRepeatCustomerRate, getTotalCustomers } from "../../Data/Analytics/CustomerAnalytics";
import { getSalesTrend } from "../../Data/Analytics/SalesAnalytics";
import { months } from '../../Data/Analytics/SuppliesAnalytics';
import CircularProgress from '@mui/material/CircularProgress';
import { DataContext } from '../../context/ContextProvider';

ChartJS.register(...registerables);
const CustomersInsights = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [totalCustomers, setTotalCustomers] = useState<any>({})
    const [newCustomers, setNewCustomers] = useState<any>({})
    const [dailyCustomers, setDailyCustomers] = useState<any>({})
    const [repeatPurchaseRate, setRepeatPurchaseRate] = useState<any>()
    const [churnRate, setChurnRate] = useState<any[]>([])
    const [genderStats, setGenderStats] = useState<any[]>([])
    const [ageStats, setAgeStats] = useState<any[]>([])
    const [mostActive, setMostActive] = useState<any[]>([])
    const [currentMonthNewCustomers, setCurrentMonthNewCustomers] = useState<any>({})
    const [mostActiveInCurrentMonth, setMostActiveInCurrentMonth] = useState<any[]>([])
    const { businessId } = useContext(DataContext)
    // const [salesTrend, setSalesTrend] = useState<any>({})
    useEffect(() => {
        getTotalCustomers(setTotalCustomers, setIsLoading, businessId)
        getNewCustomers(setNewCustomers, setIsLoading, businessId)
        getRepeatCustomerRate(setRepeatPurchaseRate, setIsLoading, businessId)
        getChurnCustomerRate(setChurnRate, setIsLoading, businessId)
        getAgeStats(setAgeStats, setIsLoading, businessId)
        getGenderStats(setGenderStats, setIsLoading, businessId)
        getMostActiveCustomers(setMostActive, setIsLoading, businessId)
        getDailyNewCustomers(setDailyCustomers, setIsLoading, businessId)
        getCurrentMonthNewCustomers(setCurrentMonthNewCustomers, setIsLoading, businessId)
        getMostActiveInCurrentCustomers(setMostActiveInCurrentMonth, setIsLoading, businessId)
        // getSalesTrend(setSalesTrend)
    }, [])
    const total = genderStats.reduce(function (prev: any, cur: any) {
        return prev + cur.total;
    }, 0);

    let date = new Date()
    const month = date.getMonth()

    console.log(genderStats)
    return (
        <div>
            {
                isLoading ? <div className="text-center"><CircularProgress color="success" /></div> :
                    <div className='container-fluid overview'>
                        <div className="insights container w-10/12">
                            <div className="row padding">
                                <div className="col-lg-4 col-sm-12 mt-3">
                                    <div className="card text-center">
                                        <h5 className='mb-2 top-cards'>{totalCustomers.total}</h5>
                                        <h3>Total Customers</h3>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-sm-12 mt-3">
                                    <div className="card text-center">
                                        <h5 className='mb-2 top-cards'>{newCustomers.total}</h5>
                                        <h3>New Users Acquired</h3>
                                    </div>
                                </div>
                                <div className="col-lg-4 mt-3">
                                    <div className="card text-center">
                                        <h5 className='mb-2 top-cards'>{repeatPurchaseRate} %</h5>
                                        <h3>Repeat Purchase Rate</h3>
                                    </div>
                                </div>

                            </div>
                            <div className="row padding">

                                <div className="col-lg-4 mt-3">
                                    <div className="card text-center">
                                        <h5 className='mb-2 top-cards'>{churnRate} %</h5>
                                        <h3>Customer Churn Rate</h3>
                                    </div>
                                </div>
                                <div className="col-lg-4 mt-3">
                                    <div className="card text-center">
                                        <h5 className='mb-2 top-cards'>{dailyCustomers.total}</h5>
                                        <h3>Today's new customers</h3>
                                    </div>
                                </div>
                                <div className="col-lg-4 mt-3">
                                    <div className="card text-center">
                                        <h5 className='mb-2 top-cards'>{currentMonthNewCustomers.total}</h5>
                                        <h3>New customers in {months[month]}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container charts">
                            <div className="row padding">
                                <div className="col-lg-6 col-sm-12">
                                    <Card className="new-card">
                                        <h5 className="text-center mb-4">Most Active Customers in last 30 days</h5>
                                        <ResponsiveContainer width="95%" height={400}>
                                            <ComposedChart
                                                layout="vertical"
                                                data={mostActive}
                                                margin={{
                                                    top: 20,
                                                    right: 20,
                                                    bottom: 20,
                                                    left: 20,
                                                }}
                                            >
                                                <CartesianGrid stroke="#f5f5f5" />
                                                <XAxis type="number" />
                                                <YAxis dataKey="name" type="category" scale="band" />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="total" barSize={20} fill='#3282B8' />
                                            </ComposedChart>
                                        </ResponsiveContainer>

                                    </Card>
                                </div>
                                <div className="col-lg-6">
                                    <Card className="new-card">
                                        <h5 className="text-center mb-5">Most Active Customers in {months[month]}</h5>
                                        <ResponsiveContainer width="95%" height={400}>
                                            <BarChart

                                                data={mostActiveInCurrentMonth}
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
                                <div className="col-lg-6 col-sm-12">
                                    <Card className="new-card">
                                        <h5 className="text-center mb-4">Customer gender statistics</h5>
                                        <ResponsiveContainer width="95%" height={300}>
                                            <PieChart>
                                                <Pie data={genderStats} dataKey="total" nameKey="group" cx="50%" cy="50%" outerRadius={110} fill="#8884d8" label />
                                            </PieChart>
                                        </ResponsiveContainer>

                                        {
                                            genderStats.map((gender) => (
                                                <div className='row'>
                                                    <h5 className="p-2">{gender.group} : <span>{Math.round(gender.total / total * 100)} %</span> </h5>
                                                </div>
                                            ))
                                        }
                                    </Card>
                                </div>
                                <div className="col-lg-6 col-sm-12">
                                    <Card className="new-card">
                                        <h5 className="text-center mb-4">Customer Age statistics</h5>
                                        <ResponsiveContainer width="95%" height={400}>
                                            <BarChart
                                                data={ageStats}
                                                margin={{
                                                    top: 15,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 3,
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="group" />
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

export default CustomersInsights