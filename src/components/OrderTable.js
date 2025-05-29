import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Grid, Card, CardContent, Typography, Chip, Avatar,
  CircularProgress, Modal, Button, Divider, List, ListItem,
  ListItemIcon, ListItemText, IconButton
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Event as DateIcon,
  CheckCircle as CompletedIcon,
  Pending as PendingIcon,
  Close as CloseIcon,
  LocalMall as DressIcon,
  Straighten as MeasurementsIcon,
  Info as DetailsIcon,
  Image as ImageIcon,
  Notes as InstructionsIcon
} from '@mui/icons-material';
import LocalMallIcon from '@mui/icons-material/LocalMall';

const statusConfig = {
  Pending: { color: 'warning', icon: <PendingIcon /> },
  Completed: { color: 'success', icon: <CompletedIcon /> },
  InProgress: { color: 'info', icon: <PendingIcon /> },
  Cancelled: { color: 'error', icon: <CloseIcon /> }
};

const OrderCards = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`/api/orders/${id}/status`, { status: newStatus });
      setOrders(prev => prev.map(order => 
        order._id === id ? { ...order, status: newStatus } : order
      ));
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
    } catch (error) {
      console.error('Error updating status:', error);
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
        Order Management
      </Typography>
      
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order._id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                  cursor: 'pointer'
                }
              }}
              onClick={() => handleOpenModal(order)}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: 'primary.main',
                    width: 56,
                    height: 56,
                    mr: 2
                  }}>
                    <PersonIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{order.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order.dressType} for {order.occasion}
                    </Typography>
                    <Chip
                      label={order.status}
                      color={statusConfig[order.status]?.color || 'default'}
                      icon={statusConfig[order.status]?.icon}
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <DateIcon sx={{ mr: 1, fontSize: '1rem' }} />
                    Due: {order.dueDate}
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <DressIcon sx={{ mr: 1, fontSize: '1rem' }} />
                    {order.fabricType}
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationIcon sx={{ mr: 1, fontSize: '1rem' }} />
                    {order.city}
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  startIcon={<DetailsIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(order);
                  }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Order Details Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="order-details-modal"
        aria-describedby="order-details-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', md: '80%', lg: '70%' },
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          overflow: 'auto',
          p: 4
        }}>
          {selectedOrder && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2">
                  Order Details
                </Typography>
                <IconButton onClick={handleCloseModal}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Grid container spacing={3}>
                {/* Left Column - Customer Info */}
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ mb: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon sx={{ mr: 1 }} /> Customer Information
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText primary="Name" secondary={selectedOrder.name} />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Gender" secondary={selectedOrder.gender} />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><EmailIcon /></ListItemIcon>
                          <ListItemText primary="Email" secondary={selectedOrder.email} />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><PhoneIcon /></ListItemIcon>
                          <ListItemText primary="Phone" secondary={selectedOrder.phone} />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><LocationIcon /></ListItemIcon>
                          <ListItemText 
                            primary="Address" 
                            secondary={`${selectedOrder.address}, ${selectedOrder.city}`} 
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>

                  {/* Order Info */}
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <DressIcon sx={{ mr: 1 }} /> Order Information
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText primary="Occasion" secondary={selectedOrder.occasion} />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><DateIcon /></ListItemIcon>
                          <ListItemText primary="Due Date" secondary={selectedOrder.dueDate} />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Dress Type" secondary={selectedOrder.dressType} />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Fabric Type" secondary={selectedOrder.fabricType} />
                        </ListItem>
                        {selectedOrder.referenceImage && (
                          <ListItem>
                            <ListItemIcon><ImageIcon /></ListItemIcon>
                            <ListItemText 
                              primary="Reference Image" 
                              secondary={
                                <img 
                                  src={selectedOrder.referenceImage} 
                                  alt="Reference" 
                                  style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '8px' }} 
                                />
                              } 
                            />
                          </ListItem>
                        )}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Right Column - Measurements and Fabrics */}
                <Grid item xs={12} md={6}>
                  {/* Measurements */}
                  <Card variant="outlined" sx={{ mb: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <MeasurementsIcon sx={{ mr: 1 }} /> Measurements
                      </Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Typography variant="body2">Height: {selectedOrder.height}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">Chest: {selectedOrder.chest}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">Waist: {selectedOrder.waist}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">Hip: {selectedOrder.hip}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">Shoulder: {selectedOrder.shoulder}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">Sleeve: {selectedOrder.sleeveLength}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">Inseam: {selectedOrder.inseam}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">Neck: {selectedOrder.neck}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  {/* Selected Fabrics */}
                  {selectedOrder.selectedFabrics?.length > 0 && (
                    <Card variant="outlined" sx={{ mb: 3 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocalMallIcon sx={{ mr: 1 }} /> Selected Fabrics
                        </Typography>
                        <List dense>
                          {selectedOrder.selectedFabrics.map((fabric, index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                <Avatar src={fabric.image} sx={{ width: 40, height: 40 }} />
                              </ListItemIcon>
                              <ListItemText
                                primary={fabric.fabricName}
                                secondary={`${fabric.price} per meter | ${fabric.quantityInMeters} meters`}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  )}

                  {/* Additional Instructions */}
                  {selectedOrder.instructions && (
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                          <InstructionsIcon sx={{ mr: 1 }} /> Special Instructions
                        </Typography>
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                          {selectedOrder.instructions}
                        </Typography>
                      </CardContent>
                    </Card>
                  )}
                </Grid>
              </Grid>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    updateStatus(selectedOrder._id, 'Cancelled');
                    handleCloseModal();
                  }}
                  disabled={selectedOrder.status === 'Cancelled'}
                >
                  Cancel Order
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => {
                    updateStatus(selectedOrder._id, 'InProgress');
                    handleCloseModal();
                  }}
                  disabled={selectedOrder.status === 'InProgress' || selectedOrder.status === 'Completed'}
                >
                  Mark In Progress
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    updateStatus(selectedOrder._id, 'Completed');
                    handleCloseModal();
                  }}
                  disabled={selectedOrder.status === 'Completed'}
                >
                  Mark Completed
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default OrderCards;