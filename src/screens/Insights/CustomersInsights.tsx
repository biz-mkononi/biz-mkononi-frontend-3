import React from 'react'
import Card from '@mui/material/Card';
import {
  ComposedChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  ResponsiveContainer,
} from 'recharts';
import {Chart as ChartJS, registerables} from 'chart.js';
import './Overview.css';
import {useContext} from 'react';
import {
  getAgeStats,
  getChurnCustomerRate,
  getGenderStats,
  getMostActiveCustomers,
  getNewCustomers,
  getRepeatCustomerRate,
  getTotalCustomers,
} from '../../Data/Analytics/CustomerAnalytics';
import CircularProgress from '@mui/material/CircularProgress';
import {DataContext} from '../../context/ContextProvider';
import DateComponent from '../../components/DateComponent/DateComponent';
import {useQuery} from '@tanstack/react-query';

ChartJS.register(...registerables);
const CustomersInsights = () => {
  const {businessId, startDate, endDate} = useContext(DataContext);
  const from = new Date(startDate);
  const to = new Date(endDate);
  const data = {
    from: from.toISOString(),
    to: to.toISOString(),
  };
  const mostActiveCustomers = {
    from: from.toISOString(),
    to: to.toISOString(),
    limit: 10,
  };
  const {data: newCustomers, isLoading: customersLoading} = useQuery({
    queryKey: ['newcustomers', data, businessId],
    queryFn: () => getNewCustomers(businessId, data),
  });
  const {data: repeatPurchaseRate, isLoading: purchaseRateLoading} = useQuery({
    queryKey: ['repeatpurchaserate', data, businessId],
    queryFn: () => getRepeatCustomerRate(businessId, data),
  });
  // eslint-disable-next-line
  const {data: churnRate, isLoading: churnRateLoading} = useQuery<any, Error>({
    queryKey: ['churnrate', data, businessId],
    queryFn: () => getChurnCustomerRate(businessId, data),
  });
  const {data: totalCustomers, isLoading: totalCustomersLoading} = useQuery<
  // eslint-disable-next-line
    any,
    Error
  >({
    queryKey: ['totalcustomers', businessId],
    queryFn: () => getTotalCustomers(businessId),
  });
  // eslint-disable-next-line
  const {data: ageStats, isLoading: ageStatsLoading} = useQuery<any, Error>({
    queryKey: ['agestats', data, businessId],
    queryFn: () => getAgeStats(businessId, data),
  });

  const {data: genderStats, isLoading: genderStatsLoading} = useQuery<
  // eslint-disable-next-line
    any,
    Error
  >({
    queryKey: ['genderstats', data, businessId],
    queryFn: () => getGenderStats(businessId, data),
  });
  // eslint-disable-next-line
  const {data: mostActive, isLoading: mostActiveLoading} = useQuery<any, Error>(
    {
      queryKey: ['mostactive', mostActiveCustomers, businessId],
      queryFn: () => getMostActiveCustomers(businessId, mostActiveCustomers),
    }
  );
  // eslint-disable-next-line
  const total = genderStats?.reduce(function (prev: any, cur: any) {
    return prev + cur.total;
  }, 0);

  return (
    <div>
      {customersLoading ||
      purchaseRateLoading ||
      churnRateLoading ||
      totalCustomersLoading ||
      ageStatsLoading ||
      genderStatsLoading ||
      mostActiveLoading ? (
        <div className="text-center">
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className="container-fluid overview">
          <DateComponent />
          <div className="insights container w-10/12">
            <div className="row padding">
              <div className="col-lg-3 col-sm-12 mt-3">
                <div className="card text-center">
                  <h5 className="mb-2 top-cards">{totalCustomers}</h5>
                  <h3>Total Customers</h3>
                </div>
              </div>
              <div className="col-lg-3 col-sm-12 mt-3">
                <div className="card text-center">
                  <h5 className="mb-2 top-cards">{newCustomers}</h5>
                  <h3>New Users Acquired</h3>
                </div>
              </div>
              <div className="col-lg-3 mt-3">
                <div className="card text-center">
                  <h5 className="mb-2 top-cards">{repeatPurchaseRate} %</h5>
                  <h3>Repeat Purchase Rate</h3>
                </div>
              </div>
              <div className="col-lg-3 mt-3">
                <div className="card text-center">
                  <h5 className="mb-2 top-cards">{churnRate} %</h5>
                  <h3>Customer Churn Rate</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="container charts">
            <div className="row padding">
              <div className="col-lg-6 col-sm-12">
                <Card className="new-card">
                  <h5 className="text-center mb-4">Most Active Customers</h5>
                  <ResponsiveContainer width="95%" height={400}>
                    <ComposedChart
                      layout="vertical"
                      data={mostActive}
                      margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                      }}>
                      <CartesianGrid stroke="#f5f5f5" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" scale="band" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="total" barSize={20} fill="#3282B8" />
                    </ComposedChart>
                  </ResponsiveContainer>
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
                      }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="group" />
                      <YAxis />
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
                  <h5 className="text-center mb-4">
                    Customer gender statistics
                  </h5>
                  <ResponsiveContainer width="95%" height={300}>
                    <PieChart>
                      <Pie
                        data={genderStats}
                        dataKey="total"
                        nameKey="group"
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        fill="#8884d8"
                        label
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  {
                    // eslint-disable-next-line
                  genderStats?.map((gender: any) => (
                    <div className="row" key={gender.group}>
                      <h5 className="p-2">
                        {gender.group} :{' '}
                        <span>
                          {Math.round((gender.total / total) * 100)} %
                        </span>{' '}
                      </h5>
                    </div>
                  ))}
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersInsights;
