import { useState, useEffect, useContext } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import "./Overview.css"
import { getSalesTrend, getTotalSales,getSalesInLastMonthTrend } from '../../Data/Analytics/SalesAnalytics';
import { getTotalProfits } from "../../Data/Analytics/ProfitsAnalytics";
import { getTotalSupplies, months } from '../../Data/Analytics/SuppliesAnalytics';
import { getChurnCustomerRate, getMostActiveCustomers, getNewCustomers, getRepeatCustomerRate, getTotalCustomers } from "../../Data/Analytics/CustomerAnalytics";
import Card from '@mui/material/Card';
import {
    BarChart, Bar, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import CircularProgress from '@mui/material/CircularProgress';
import { DataContext } from "../../context/ContextProvider";
import NotFound from '../NotFoundPage/NotFound';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { getSales } from '../../Data/Sales/Data';

ChartJS.register(...registerables);
const Overview = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [totalSales, setTotalSales] = useState<any>({})
    const [totalProfits, setTotalProfits] = useState<any>()
    const [totalCustomers, setTotalCustomers] = useState<any>({})
    const [totalSupplies, setTotalSupplies] = useState<any>()
    const [repeatPurchaseRate, setRepeatPurchaseRate] = useState<any>()
    const [churnRate, setChurnRate] = useState<any[]>([])
    const [salesTrend, setSalesTrend] = useState<any[]>([])
    const [monthSalesTrend, setMonthSalesTrend] = useState<any[]>([])

    const [mostActive, setMostActive] = useState<any[]>([])
    const [newCustomers, setNewCustomers] = useState<any>({})
    const [sales, setSales] = useState<any[]>([])

    const { open, businessId } = useContext(DataContext)
    console.log(businessId)

    useEffect(() => {
        getSalesTrend(setSalesTrend, setIsLoading, businessId)
        getSalesInLastMonthTrend(setMonthSalesTrend, setIsLoading, businessId)
        getTotalSales(setTotalSales, setIsLoading, businessId)
        getTotalProfits(setTotalProfits, setIsLoading, businessId)
        getTotalCustomers(setTotalCustomers, setIsLoading, businessId)
        getTotalSupplies(setTotalSupplies, setIsLoading, businessId)
        getRepeatCustomerRate(setRepeatPurchaseRate, setIsLoading, businessId)
        getChurnCustomerRate(setChurnRate, setIsLoading, businessId)
        getMostActiveCustomers(setMostActive, setIsLoading, businessId)
        getNewCustomers(setNewCustomers, setIsLoading, businessId)
        getSales(setSales, setIsLoading, businessId)
    }, [])
    const churnData = [
        {
            name: 'new Customers',
            total: newCustomers.total
        },
        {
            name: 'repeat purchase rate %',
            total: repeatPurchaseRate
        },
        {
            name: 'churn rate %',
            total: churnRate
        }
    ]
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
    let date = new Date()
    const month = date.getMonth()
    return (
        <div>
            {
                isLoading ? <div className="text-center"><CircularProgress color="success" /></div> :
                <>
                {
                    sales.length === 0 ?
                    <NotFound icon={<AttachMoneyIcon/>} title="Sale" link='/sales/add' />:
                    <div className='container-fluid overview'>
                    <div className="text-right">
                    </div>
                    <div className="insights container">
                        <div className="row padding">
                            <div className="col-lg-4 mt-3">
                                <div className="card text-center">
                                    <h5 className='mb-2 top-cards'><span className='money'>Ksh</span> {totalSales.total}</h5>
                                    <h3>Total Sales in last one Year</h3>
                                </div>
                            </div>
                            <div className="col-lg-4 mt-3">
                                <div className="card text-center">
                                    <h5 className='mb-2 top-cards'><span className='money'>Ksh</span> {totalProfits}</h5>
                                    <h3>Total Profit in last one Year</h3>
                                </div>
                            </div>
                            <div className="col-lg-4 mt-3">
                                <div className="card text-center">
                                    <h5 className='mb-2 top-cards'>{totalCustomers.total}</h5>
                                    <h3>Total Customers</h3>
                                </div>
                            </div>

                        </div>
                        <div className="row padding">
                            <div className="col-lg-4 col-sm-12 mt-3">
                                <div className="card text-center">
                                    <h5 className='mb-2 top-cards'><span className='money'>Ksh</span> {totalSupplies}</h5>
                                    <h3>Total Supplies</h3>
                                </div>
                            </div>
                            <div className="col-lg-4 mt-3">
                                <div className="card text-center">
                                    <h5 className='mb-2 top-cards'>{repeatPurchaseRate} %</h5>
                                    <h3>Repeat Purchase Rate</h3>
                                </div>
                            </div>
                            <div className="col-lg-4 mt-3">
                                <div className="card text-center">
                                    <h5 className='mb-2 top-cards'>{churnRate} %</h5>
                                    <h3>Customer Churn Rate</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container charts">
                        <div className="row padding">
                            <div className="col-lg-6 col-sm-12">
                                <Card className=" new-card">
                                    <h5 className="text-center mb-5">Sales trend in last one month</h5>
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
                        </div>
                        <div className="row padding">
                            <div className="col-lg-12 col-sm-12">
                                <Card className="Card new-card">
                                    <h5 className="text-center mb-5">Customer Details in the last 30 days</h5>
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
                                            <Bar dataKey="total" barSize={20} fill='#3282B8' />
                                        </BarChart>
                                    </ResponsiveContainer>

                                </Card>
                            </div>

                        </div>
                        <div className="row padding">
                            <div className="col-lg-12 col-sm-12">
                                <Card className="Card new-card">
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

                    </div>

                </div>
                }
                </>
                 
            }
        </div >


    )
}

export default Overview