import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CircularProgress, Box, Grid, Card, CardContent,
  Typography, Button, Chip, Avatar, Divider
} from '@mui/material';
import {
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  Pending as PendingIcon,
  Store as ShopIcon,
  Person as OwnerIcon,
  Email as EmailIcon,
  Phone as ContactIcon,
  LocationOn as LocationIcon,
  Assignment as LicenseIcon
} from '@mui/icons-material';

const statusConfig = {
  active: { color: 'success', icon: <ActiveIcon /> },
  inactive: { color: 'error', icon: <InactiveIcon /> },
  pending: { color: 'warning', icon: <PendingIcon /> }
};

const ShopCards = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/shops')
      .then(res => setShops(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, action) => {
    try {
      await axios.put(`/api/admin/shops/${id}/${action}`);
      setShops(prev => prev.map(shop => shop._id === id ? { ...shop, status: action } : shop));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
        Shop Management
      </Typography>
      
      <Grid container spacing={3}>
        {shops.map((shop) => (
          <Grid item xs={12} sm={6} md={4} key={shop._id}>
            <Card sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 3,
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2
                }}>
                  <Avatar sx={{ 
                    bgcolor: 'secondary.main',
                    width: 56,
                    height: 56,
                    mr: 2
                  }}>
                    <ShopIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" component="div">
                      {shop.shopName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {shop.owner}
                    </Typography>
                    <Chip
                      label={shop.status}
                      color={statusConfig[shop.status]?.color || 'default'}
                      icon={statusConfig[shop.status]?.icon}
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon sx={{ mr: 1, fontSize: '1rem' }} />
                    {shop.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <ContactIcon sx={{ mr: 1, fontSize: '1rem' }} />
                    {shop.contact}
                  </Typography>
                  {shop.location && (
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationIcon sx={{ mr: 1, fontSize: '1rem' }} />
                      {shop.location}
                    </Typography>
                  )}
                  {shop.businessLicense && (
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                      <LicenseIcon sx={{ mr: 1, fontSize: '1rem' }} />
                      License: {shop.businessLicense}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 'auto',
                  pt: 2
                }}>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    disabled={shop.status === 'active'}
                    onClick={() => updateStatus(shop._id, 'active')}
                    startIcon={<ActiveIcon />}
                    sx={{ flex: 1, mr: 1 }}
                  >
                    Activate
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    disabled={shop.status === 'inactive'}
                    onClick={() => updateStatus(shop._id, 'inactive')}
                    startIcon={<InactiveIcon />}
                    sx={{ flex: 1 }}
                  >
                    Deactivate
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShopCards;