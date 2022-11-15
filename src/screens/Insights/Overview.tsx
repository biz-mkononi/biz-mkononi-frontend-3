import { data } from "../../Data/Auth/Data"
import Card from '@mui/material/Card';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, ResponsiveContainer
} from 'recharts';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from "chart.js";
import "./Overview.css"
import AppMenu from "../sidebar/AppMenu";
import InsightsDatePickers from "./Date";
import { useEffect, useState } from "react";
import { getGroupedProfits, getTotalProfits } from "../../Data/Analytics/ProfitsAnalytics";
import { getSalesTrend } from "../../Data/Analytics/SalesAnalytics";
import { getTotalSupplies } from "../../Data/Analytics/SuppliesAnalytics";
import { getChurnCustomerRate, getGenderStats, getRepeatCustomerRate } from "../../Data/Analytics/CustomerAnalytics";


ChartJS.register(...registerables);
const Overview = () => {
    const [salesTrend, setSalesTrend] = useState<any[]>([])
    const [totalProfits, setTotalProfits] = useState<any[]>([])
    const [totalSupplies, setTotalSupplies] = useState<any[]>([])
    const [churnRate, setChurnRate] = useState<any[]>([])
    const [repeatRate, setRepeatRate] = useState<any[]>([])
    const [genderStats, setGenderStats] = useState<any[]>([])

    useEffect(() => {
        getSalesTrend(setSalesTrend)
        getTotalProfits(setTotalProfits)
        getTotalSupplies(setTotalSupplies)
        getChurnCustomerRate(setChurnRate)
        getRepeatCustomerRate(setRepeatRate)
        getGenderStats(setGenderStats)
    }, [])
    const total = genderStats.reduce(function (prev: any, cur: any) {
        return prev + cur.total;
    }, 0);
    console.log(total)
    return (
        <div>

            <div className='container-fluid overview'>
                <div className="text-right">
                </div>
                <div className="insights container">
                    <div className="row padding">
                        <div className="col-lg-3 col-sm-12">
                            <div className="card text-center">
                                <h2 className='mb-2'> {totalProfits.toLocaleString()}</h2>
                                <h3>Total Revenue</h3>
                            </div>
                        </div>
                        <div className="col-lg-3 ">
                            <div className="card text-center">
                                <h2 className='mb-2'>{totalSupplies.toLocaleString()}</h2>
                                <h3>Total Orders</h3>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="card text-center">
                                <h2 className='mb-2'>{churnRate} %</h2>
                                <h3>Customer Churn Rate</h3>
                            </div>
                        </div>
                        <div className="col-lg-3 ">
                            <div className="card text-center">
                                <h2 className='mb-2'>{repeatRate} %</h2>
                                <h3>Repeat Purchase Rate</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container charts">
                    <div className="row padding">
                        <div className="col-lg-6 col-sm-6">
                            <Card className="Card">
                                <h2 className="text-center mb-3">Customer Churn Rate</h2>
                                <LineChart
                                    width={420}
                                    height={358}
                                    data={salesTrend}
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
                                    <Line type="monotone" dataKey="pv" stroke="#3282B8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </Card>
                        </div>
                        <div className="col-lg-6">
                            <Card className="Card">
                                <h2 className="text-center mb-3">Most Selling Products</h2>

                                <Doughnut data={
                                    {
                                        labels: ['apples', 'oranges', 'mangoes', 'peaches', 'plums', 'bananas'],
                                        datasets: [
                                            {
                                                label: '# of Votes',
                                                data: [12, 19, 3, 5, 2, 3],
                                                backgroundColor: [
                                                    '#3282B8',
                                                    '#BBe1FA',
                                                    '#0F4c75',
                                                    '#1B262C',
                                                    '#F2F8FF',
                                                ],
                                                borderColor: [
                                                    '#3282B8',
                                                    '#BBe1FA',
                                                    '#0F4c75',
                                                    '#1B262C',
                                                    '#F2F8FF',
                                                ],
                                                borderWidth: 1,
                                            },
                                        ],
                                    }
                                } />
                            </Card>
                        </div>
                    </div>
                    <div className="row padding">
                        <div className="col-lg-6 col-sm-6">
                            <Card className="Card">
                                <h2 className="text-center mb-3">Revenue</h2>
                                <LineChart
                                    width={700}
                                    height={358}
                                    data={data}
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
                                    <Line type="monotone" dataKey="pv" stroke="#3282B8" activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="uv" stroke="#1B262C" />

                                </LineChart>
                            </Card>
                        </div>
                        <div className="col-lg-5">
                            <Card className="Card">
                                <h2 className="text-center mb-3">Customer Visit and Buying</h2>

                                <PieChart width={400} height={250}>
                                    <Pie data={genderStats} dataKey="total" nameKey="group" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
                                </PieChart>
                                {
                                    genderStats.map((gender) => (
                                        <h2 className="p-2">{gender.group} : <span>{gender.total / total * 100} %</span> </h2>
                                    ))
                                }
                            </Card>
                        </div>
                    </div>
                    <div className="row padding">
                        <div className="col-lg-6 col-sm-6">
                            <Card className="Card">
                                <h2 className="text-center mb-3">Customer most buying day</h2>
                                <BarChart
                                    width={400}
                                    height={300}
                                    data={genderStats}
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
                                    <Bar dataKey="total" fill='#3282B8' />
                                </BarChart>
                            </Card>
                        </div>
                        <div className="col-lg-6">
                            <Card className="Card">
                                <h2 className="text-center mb-3">Customer Visit vs Buy</h2>

                                <BarChart
                                    width={500}
                                    height={300}
                                    data={data}
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
                                    <Bar dataKey="pv" fill='#3282B8' />
                                    <Bar dataKey="uv" fill='#BBe1FA' />
                                </BarChart>
                            </Card>
                        </div>
                    </div>
                    <div className="row padding">
                        <div className="col-lg-6 col-sm-6">
                            <Card className="Card">
                                <h2 className="text-center mb-3">Sales</h2>
                                <LineChart
                                    width={700}
                                    height={358}
                                    data={[{
                                        x: '2021-11-06 23:39:30',
                                        y: 50
                                    }, {
                                        x: '2021-11-07 01:00:28',
                                        y: 60
                                    }, {
                                        x: '2021-11-07 09:00:28',
                                        y: 20
                                    }]}
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
                                    <Line type="monotone" dataKey="pv" stroke="#3282B8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </Card>
                        </div>
                        <div className="col-lg-6">
                            <Card className="Card">
                                <h2 className="text-center mb-3">Most Selling Time of the Day</h2>

                                <LineChart
                                    width={700}
                                    height={358}
                                    data={data}
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
                                    <Line type="monotone" dataKey="pv" stroke="#3282B8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </Card>
                        </div>
                    </div>
                </div>

            </div>
        </div >


    )
}

export default Overview