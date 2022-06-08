import React from 'react'
import AppBar from '../AppBar/AppBar'
import Sidebar from '../sidebar/Sidebar'
import { data } from "../../Data/Data"
import Card from '@mui/material/Card';
import {
    ComposedChart, Area, Scatter, PieChart, Sector, Cell,
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from "chart.js";
import "./Overview.css"

ChartJS.register(...registerables);
const CustomersInsights = () => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const pieData = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 }
    ];
    return (
        <div>
            {/* <AppBar />
            <Sidebar /> */}
            <div className='container-fluid overview'>
                <div className="insights container w-10/12">
                    <div className="row padding">
                        <div className="col-lg-4 col-sm-12">
                            <div className="card text-center">
                                <h2 className='mb-2'>200</h2>
                                <h3>New Users Acquired</h3>
                            </div>
                        </div>
                        <div className="col-lg-4 ">
                            <div className="card text-center">
                                <h2 className='mb-2'>8.5%</h2>
                                <h3>Repeat Purchase Rate</h3>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card text-center">
                                <h2 className='mb-2'>1.2%</h2>
                                <h3>Customer Churn Rate</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container charts">
                    <div className="row padding">
                        <div className="col-lg-8 col-sm-6">
                            <Card className="Card">
                                <h2 className="text-center mb-3">Customer Phone Calls</h2>
                                <ComposedChart
                                    layout="vertical"
                                    width={500}
                                    height={359}
                                    data={data}
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
                                    <Bar dataKey="pv" barSize={20} fill='#3282B8' />
                                </ComposedChart>
                            </Card>
                        </div>
                        <div className="col-lg-4">
                            <Card className="Card">
                                <h2 className="text-center mb-3">Customer Visit and Buying</h2>

                                <Pie data={
                                    {
                                        labels: ['visit', 'buy'],
                                        datasets: [
                                            {
                                                label: '# of Votes',
                                                data: [12, 3],
                                                backgroundColor: [
                                                    '#3282B8',
                                                    '#BBe1FA',
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
                            <Card className="Card ">
                                <h2 className="text-center mb-3">Customer Gender Demographic (female)</h2>

                                <Doughnut data={

                                    {
                                        labels: ['Visit', 'Buy', 'Order'],
                                        datasets: [
                                            {
                                                label: '# of Votes',
                                                data: [12, 19, 3],
                                                backgroundColor: [
                                                    '#3282B8',
                                                    '#BBe1FA',
                                                    '#0F4c75',

                                                ],
                                                borderColor: [
                                                    '#3282B8',
                                                    '#BBe1FA',
                                                    '#0F4c75',

                                                ],
                                                borderWidth: 1,
                                            },
                                        ],
                                    }
                                } />
                            </Card>
                        </div>
                        <div className="col-lg-6">
                            <Card className="Card">
                                <h2 className="text-center mb-3">Customer Gender Demographic (male)</h2>

                                <Doughnut data={
                                    {
                                        labels: ['Visit', 'Buy', 'Order'],
                                        datasets: [
                                            {
                                                label: '# of Votes',
                                                data: [15, 19, 10],
                                                backgroundColor: [
                                                    '#3282B8',
                                                    '#BBe1FA',
                                                    '#0F4c75',

                                                ],
                                                borderColor: [
                                                    '#3282B8',
                                                    '#BBe1FA',
                                                    '#0F4c75',

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
                                <h2 className="text-center mb-3">Customer most buying day</h2>
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
        </div>
    )
}

export default CustomersInsights