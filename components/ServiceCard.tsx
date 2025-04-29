// ServiceCard.tsx - Updated with sleek red bottom border for selected state

import React from 'react';

import { Card, CardContent, Typography, Box, Button } from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';

import PhoneIcon from '@mui/icons-material/Phone';

import EmailIcon from '@mui/icons-material/Email';

import { SxProps, Theme } from '@mui/material';

interface ServiceCardProps {

  store: {

    service_name: string;

    street_address: string;

    phone_number: string;

    email: string;

    website: string;

    program_type: 'Public' | 'Private';

    distance?: number;

  };

  onClick: () => void;

  showDistance?: boolean;

  isSelected?: boolean;

  sx?: SxProps<Theme>;

}

const ServiceCard: React.FC<ServiceCardProps> = React.memo(({

    store,

    onClick,

    showDistance,

    isSelected,

    sx = {}

  }) => {

  const serviceUrl = `https://cardiac-services-directory.heartfoundation.org.au/${store.website}`;

  const handleButtonClick = (e: React.MouseEvent) => {

    e.stopPropagation();

  };

  return (
<Card

      onClick={onClick}

      sx={{

        borderRadius: '12px',

        cursor: 'pointer',

        mb: 0, // No margin bottom - container handles spacing

        transform: isSelected ? 'scale(1.02)' : 'none',

        boxShadow: isSelected ? 3 : 1,

        width: '100%',

        transition: 'all 0.2s ease-in-out',

        position: 'relative', // Required for the pseudo-element positioning

        '&::after': isSelected ? {

          content: '""',

          position: 'absolute',

          bottom: 0,

          left: 0,

          right: 0,

          height: '2px', // Thin border

          backgroundColor: '#C8102E', // Heart Foundation red color

          zIndex: 1,

        } : {},

        ...sx

      }}
>
<CardContent sx={{

        padding: 2,

        '&:last-child': { pb: 2 },

        display: 'flex',

        flexDirection: 'column'

      }}>
<Box display="flex" alignItems="center" justifyContent="space-between" mb={1.5}>
<Typography variant="subtitle1" component="h3" sx={{ fontWeight: 'medium', pr: 1 }}>

            {store.service_name}
</Typography>
<Box 

            component="span"

            sx={{

              fontSize: '0.75rem',

              py: 0.25,

              px: 1,

              borderRadius: '4px',

              backgroundColor: store.program_type === 'Public' ? 'rgba(25, 118, 210, 0.12)' : 'rgba(200, 16, 46, 0.12)',

              color: store.program_type === 'Public' ? '#1976d2' : '#C8102E',

              fontWeight: 500,

              whiteSpace: 'nowrap',

              flexShrink: 0

            }}
>

            {store.program_type}
</Box>
</Box>
<Box display="flex" alignItems="flex-start" mb={1.5}>
<LocationOnIcon sx={{ mr: 1, color: '#C8102E', fontSize: '1.2rem', mt: 0.2 }} />
<Typography variant="body2" sx={{ lineHeight: 1.4 }}>{store.street_address}</Typography>
</Box>
<Box display="flex" alignItems="center" mb={1.5}>
<PhoneIcon sx={{ mr: 1, color: '#C8102E', fontSize: '1.2rem' }} />
<Typography variant="body2">{store.phone_number}</Typography>
</Box>
<Box display="flex" alignItems="flex-start" mb={1.5}>
<EmailIcon sx={{ mr: 1, color: '#C8102E', fontSize: '1.2rem', mt: 0.2 }} />
<Typography

            variant="body2"

            sx={{

              lineHeight: 1.4,

              maxWidth: 'calc(100% - 32px)',

              overflow: 'hidden',

              textOverflow: 'ellipsis',

              whiteSpace: 'nowrap'

            }}
>

            {store.email}
</Typography>
</Box>

        {showDistance && store.distance !== undefined && (
<Typography variant="body2" color="textSecondary" mb={1.5}>

            Approx. {store.distance.toFixed(1)} km away
</Typography>

        )}
<Box display="flex" justifyContent="center" mt={0.5}>
<Button

            variant="text"

            size="small"

            sx={{

              width: 1,

              color: '#C8102E',

              textTransform: 'none',

              fontWeight: 500,

              borderRadius: '8px',

              py: 0.75,

              '&:hover': {

                backgroundColor: 'rgba(200, 16, 46, 0.08)'

              },

            }}

            href={serviceUrl}

            target="_blank"

            onClick={handleButtonClick}
>

            View Service
</Button>
</Box>
</CardContent>
</Card>

  );

});

export default ServiceCard; 