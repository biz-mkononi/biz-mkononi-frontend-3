import React from 'react'
import { data } from "../../Data/Auth/Data"
import Card from '@mui/material/Card';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { Chart as ChartJS, registerables } from "chart.js";
import "./Overview.css"

ChartJS.register(...registerables);
const ChurnRateInsights = () => {

    return (
        <div>
            {/* <AppBar />
            <Sidebar /> */}
            <div className='container-fluid overview'>
                <div className="insights container">
                    <div className="row padding">
                        <div className="col-lg-3 col-sm-12">
                            <div className="card text-center">
                                <h2 className='mb-2'>-14</h2>
                                <h3>Customer Loss</h3>
                            </div>
                        </div>
                        <div className="col-lg-3 ">
                            <div className="card text-center">
                                <h2 className='mb-2'>5</h2>
                                <h3>New Customers Acquired</h3>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="card text-center">
                                <h2 className='mb-2'>1.2%</h2>
                                <h3>Customer Churn Rate</h3>
                            </div>
                        </div>
                        <div className="col-lg-3 ">
                            <div className="card text-center">
                                <h2 className='mb-2'>8.5%</h2>
                                <h3>Repeat Purchase Rate</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container charts">
                    <div className="row padding">
                        <div className="col-lg-9 col-sm-12">
                            <Card className="Card">
                                <h2 className="text-center mb-3">Customer Churn Rate</h2>
                                <LineChart
                                    width={800}
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
                        <div className="col-lg-3">

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ChurnRateInsights