import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import TailorTable from './TailorTable';
import ShopTable from './ShopTable';
import OrderTable from './OrderTable';

const summaryData = {
  totalTailors: 10,
  totalShops: 4,
  totalOrders: 15,
  activeUsers: 20,
};

const ordersByMonth = [
  { month: 'Jan', orders: 3 },
  { month: 'Feb', orders: 4 },
  { month: 'Mar', orders: 5 },
  { month: 'Apr', orders: 7 },
  { month: 'May', orders: 6 },
  { month: 'Jun', orders: 8 },
];

const userDistribution = [
  { name: 'Tailors', value: 10 },
  { name: 'Shops', value: 4 },
  { name: 'Customers', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const cardData = [
  {
    key: 'tailors',
    label: 'Explore Tailors',
    img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  },
  {
    key: 'shops',
    label: 'Explore Shops',
    img: 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png',
  },
  {
    key: 'orders',
    label: 'Explore Orders',
    img: 'https://cdn-icons-png.flaticon.com/512/263/263142.png',
  },
];

const summaryCards = [
  { label: 'Total Tailors', value: summaryData.totalTailors, color: '#1976d2' },
  { label: 'Total Shops', value: summaryData.totalShops, color: '#388e3c' },
  { label: 'Total Orders', value: summaryData.totalOrders, color: '#f57c00' },
  { label: 'Active Users', value: summaryData.activeUsers, color: '#d32f2f' },
];

const AdminDashboard = () => {
  const tabKeyToIndex = { tailors: 0, shops: 1, orders: 2 };
  const [tabIndex, setTabIndex] = useState(0);

  const onCardClick = (key) => {
    setTabIndex(tabKeyToIndex[key]);
  };

  const renderTable = () => {
    if (tabIndex === 0) return <TailorTable />;
    if (tabIndex === 1) return <ShopTable />;
    if (tabIndex === 2) return <OrderTable />;
    return null;
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)', // adjust for footer height, example footer height = 64px
        width: '100%',
        mx: 'auto',
        mt: 2,
        px: 3,
        py: 2,
        bgcolor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        overflowY: 'auto', // allow scrolling if content grows
      }}
    >
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" color="#333" textAlign="center">
        Admin Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} justifyContent="center">
        {summaryCards.map(({ label, value, color }) => (
          <Grid key={label} item xs={6} sm={3} md={3}>
            <Paper
              elevation={4}
              sx={{
                py: 3,
                textAlign: 'center',
                bgcolor: color,
                color: 'white',
                borderRadius: 3,
                userSelect: 'none',
              }}
            >
              <Typography variant="h6">{label}</Typography>
              <Typography variant="h4" fontWeight="bold" mt={1}>
                {value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          gap: 2,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {/* Bar Chart */}
        <Box sx={{ flex: 1, minWidth: 280, height: 300 }}>
          <Typography variant="h6" gutterBottom>
            Orders by Month
          </Typography>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={ordersByMonth} margin={{ top: 15, right: 20, bottom: 10 }}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#1976d2" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Pie Chart */}
        <Box sx={{ flex: 1, minWidth: 280, height: 300 }}>
          <Typography variant="h6" gutterBottom>
            User Distribution
          </Typography>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={userDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {userDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* Explore Cards */}
      <Grid container spacing={3} justifyContent="center">
        {cardData.map(({ key, label, img }) => (
          <Grid key={key} item xs={12} sm={4} md={4} lg={3}>
            <Card
              elevation={6}
              sx={{
                cursor: 'pointer',
                textAlign: 'center',
                borderRadius: 3,
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.05)' },
                bgcolor: tabKeyToIndex[key] === tabIndex ? '#1976d2' : 'white',
                color: tabKeyToIndex[key] === tabIndex ? 'white' : 'inherit',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onClick={() => onCardClick(key)}
            >
              <CardContent sx={{ flexGrow: 1, py: 3 }}>
                <Box
                  component="img"
                  src={img}
                  alt={label}
                  sx={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain',
                    mx: 'auto',
                    mb: 2,
                    filter:
                      tabKeyToIndex[key] === tabIndex ? 'brightness(0) invert(1)' : 'none',
                  }}
                />
                <Typography variant="h6" fontWeight="medium">
                  {label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Table Area */}
      <Paper
        sx={{
          p: 3,
          mt: 2,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'white',
          minHeight: 280,
        }}
      >
        {renderTable()}
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
