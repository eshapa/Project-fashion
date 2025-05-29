import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CircularProgress, Box, Grid, Card, CardContent,
  Typography, Button, Chip, Avatar, Divider
} from '@mui/material';
import {
  CheckCircle as ApprovedIcon,
  Cancel as RejectedIcon,
  Pending as PendingIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Store as ShopIcon,
  Work as ExperienceIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

const statusConfig = {
  approved: { color: 'success', icon: <ApprovedIcon /> },
  rejected: { color: 'error', icon: <RejectedIcon /> },
  pending: { color: 'warning', icon: <PendingIcon /> }
};

const TailorCards = () => {
  const [tailors, setTailors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/tailors')
      .then(res => setTailors(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, action) => {
    try {
      await axios.put(`/api/admin/tailors/${id}/${action}`);
      setTailors(prev => prev.map(t => t._id === id ? { ...t, status: action } : t));
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
        Tailor Management
      </Typography>
      
      <Grid container spacing={3}>
        {tailors.map((tailor) => (
          <Grid item xs={12} sm={6} md={4} key={tailor._id}>
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
                    bgcolor: 'primary.main',
                    width: 56,
                    height: 56,
                    mr: 2
                  }}>
                    <PersonIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" component="div">
                      {tailor.name}
                    </Typography>
                    <Chip
                      label={tailor.status}
                      color={statusConfig[tailor.status]?.color || 'default'}
                      icon={statusConfig[tailor.status]?.icon}
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon sx={{ mr: 1, fontSize: '1rem' }} />
                    {tailor.email}
                  </Typography>
                  {tailor.phone && (
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PhoneIcon sx={{ mr: 1, fontSize: '1rem' }} />
                      {tailor.phone}
                    </Typography>
                  )}
                  {tailor.shopName && (
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <ShopIcon sx={{ mr: 1, fontSize: '1rem' }} />
                      {tailor.shopName}
                    </Typography>
                  )}
                  {tailor.experience && (
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <ExperienceIcon sx={{ mr: 1, fontSize: '1rem' }} />
                      {tailor.experience} years experience
                    </Typography>
                  )}
                  {tailor.location && (
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationIcon sx={{ mr: 1, fontSize: '1rem' }} />
                      {tailor.location}
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
                    disabled={tailor.status === 'approved'}
                    onClick={() => updateStatus(tailor._id, 'approved')}
                    startIcon={<ApprovedIcon />}
                    sx={{ flex: 1, mr: 1 }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    disabled={tailor.status === 'rejected'}
                    onClick={() => updateStatus(tailor._id, 'rejected')}
                    startIcon={<RejectedIcon />}
                    sx={{ flex: 1 }}
                  >
                    Reject
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

export default TailorCards;