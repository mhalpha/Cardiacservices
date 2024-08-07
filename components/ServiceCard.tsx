import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

interface ServiceCardProps {
  store: {
    centre_name: string;
    address: string;
    centre_phone_1: string;
    primary_email: string;
    lat: string;
    lng: string;
    website: string;
    distance?: number;
  };
  onClick: () => void;
  showDistance?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ store, onClick, showDistance }) => {
  return (
    <Card 
      onClick={onClick} 
      sx={{ 
        borderRadius: '10px', 
        cursor: 'pointer', 
        mb: 2, 
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
        '&:hover': {
          transform: 'scale(1.05)', 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        } 
      }}
    >
      <CardContent>
        <Typography variant="h6">{store.centre_name}</Typography>
        <Box mt={1} mb={1} />
        <Box display="flex" alignItems="center" mb={1}>
          <LocationOnIcon sx={{ mr: 1 }} />
          <Typography variant="body2">{store.address}</Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
          <PhoneIcon sx={{ mr: 1 }} />
          <Typography variant="body2">{store.centre_phone_1}</Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <EmailIcon sx={{ mr: 1 }} />
          <Typography variant="body2">{store.primary_email}</Typography>
        </Box>
        {showDistance && store.distance !== undefined && (
          <Typography variant="body2" color="textSecondary" mb={2}>
            Approx. {store.distance.toFixed(2)} km away
          </Typography>
        )}
        <Box display="flex" justifyContent="center" mt={1}>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#C8102E',
              color: 'black',
              '&:hover': {
                borderColor: '#C8102E',
              },
            }}
            href={`https://cardiac-services-directory.heartfoundation.org.au/${store.website}`}
            target="_blank"
          >
            View Service
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
