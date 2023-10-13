import React, {useContext} from 'react';
import Card from '@mui/material/Card';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  ResponsiveContainer,
} from 'recharts';

import {Chart as ChartJS, registerables} from 'chart.js';
import moment from 'moment';
import './Overview.css';
import CircularProgress from '@mui/material/CircularProgress';
import {getTotalProfits} from '../../Data/Analytics/ProfitsAnalytics';
import {getTotalSupplies} from '../../Data/Analytics/SuppliesAnalytics';
import {getTotalSales} from '../../Data/Analytics/SalesAnalytics';
import {DataContext} from '../../context/ContextProvider';
import DateComponent from '../../components/DateComponent/DateComponent';
import {useQuery} from '@tanstack/react-query';
ChartJS.register(...registerables);

const RevenueInsights = () => {
  const {businessId, startDate, endDate} = useContext(DataContext);
  const from = new Date(startDate);
  const to = new Date(endDate);
  const data = {
    from: from.toISOString(),
    to: to.toISOString(),
  };
  const {data: totalProfits, isLoading: totalProfitsLoading} = useQuery<
  // eslint-disable-next-line
    any,
    Error
  >({
    queryKey: ['totalprofits', businessId, data],
    queryFn: () => getTotalProfits(businessId, data),
  });
  // eslint-disable-next-line
  const {data: totalSales, isLoading: totalSalesLoading} = useQuery<any, Error>(
    {
      queryKey: ['totalsales', businessId, data],
      queryFn: () => getTotalSales(businessId, data),
    }
  );
  const {data: totalSupplies, isLoading: totalSuppliesLoading} = useQuery<
  // eslint-disable-next-line
    any,
    Error
  >({
    queryKey: ['totalsupplies', businessId],
    queryFn: () => getTotalSupplies(businessId, data),
  });

  const revenueData = [
    {
      name: 'Total Supplies',
      total: totalSupplies,
    },
    {
      name: 'Total Sales',
      total: totalSales,
    },
    {
      name: 'Total Profits',
      total: totalProfits,
    },
  ];

  return (
    <div>
      {totalProfitsLoading || totalSalesLoading || totalSuppliesLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className="container-fluid overview">
          <DateComponent />

          <div className="insights container">
            <div className="row padding">
              <div className="col-lg-4 mt-3">
                <div className="card text-center">
                  <h5 className="mb-2 top-cards">
                    <span className="money">Ksh</span> {totalSupplies}
                  </h5>
                  <h3>Total Supplies </h3>
                </div>
              </div>
              <div className="col-lg-4 mt-3">
                <div className="card text-center">
                  <h5 className="mb-2 top-cards">
                    <span className="money">Ksh</span> {totalSales}
                  </h5>
                  <h3>Total Sales</h3>
                </div>
              </div>
              <div className="col-lg-4 mt-3">
                <div className="card text-center">
                  <h5 className="mb-2 top-cards">
                    <span className="money">Ksh</span> {totalProfits}
                  </h5>
                  <h3>Total Profit</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="container charts">
            <div className="row padding">
              <div className="col-lg-12 col-sm-12">
                <Card className="new-card">
                  <h5 className="text-center mb-2">Revenue Comparison</h5>
                  <h6 className="text-center mb-5">
                    {moment(new Date(startDate)).format('MMMM Do YYYY')} -{' '}
                    {moment(new Date(endDate)).format('MMMM Do YYYY')}
                  </h6>
                  <ResponsiveContainer width="95%" height={400}>
                    <BarChart
                      data={revenueData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="total" barSize={20} fill="#3282B8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueInsights;
