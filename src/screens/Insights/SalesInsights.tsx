import React from 'react'
import AppBar from '../AppBar/AppBar'
import Sidebar from '../sidebar/Sidebar'
import { data } from "../../Data/Data"
import Card from '@mui/material/Card';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from "chart.js";
import "./Overview.css"

ChartJS.register(...registerables);
const SalesInsights = () => {
    return (
        <div>
            {/* <AppBar />
            <Sidebar /> */}
            <div className='container-fluid overview'>
                <div className="insights container">
                    <div className="row padding">
                        <div className="col-lg-3 col-sm-12">
                            <div className="card text-center">
                                <h2 className='mb-2'>200</h2>
                                <h3>Total Orders</h3>
                            </div>
                        </div>
                        <div className="col-lg-3 ">
                            <div className="card text-center">
                                <h2 className='mb-2'>8.5%</h2>
                                <h3>Repeat Purchase Rate</h3>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="card text-center">
                                <h2 className='mb-2'>5000</h2>
                                <h3>Total Sales</h3>
                            </div>
                        </div>
                        <div className="col-lg-3 ">
                            <div className="card text-center">
                                <h2 className='mb-2'>Ksh 4000</h2>
                                <h3>Average Revenue</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container charts">
                    <div className="row padding">
                        <div className="col-lg-8 col-sm-6">
                            <Card className="Card">
                                <h2 className="text-center mb-3">Customer most buying day</h2>
                                <BarChart
                                    width={700}
                                    height={359}
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
                        <div className="col-lg-4">
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
                                <h2 className="text-center mb-3">Customer Visit vs Buy</h2>

                                <BarChart
                                    width={500}
                                    height={359}
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
                                <h2 className="text-center mb-3">Orders</h2>

                                <BarChart
                                    width={500}
                                    height={359}
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

export default SalesInsights