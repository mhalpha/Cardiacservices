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
lat: string | number;
lng: string | number;
website: string;
distance?: number;
};
onClick: () => void;
showDistance?: boolean;
isSelected?: boolean;
}

// Lightweight card component with reduced animations and optimized rendering
const ServiceCard: React.FC<ServiceCardProps> = ({ store, onClick, showDistance, isSelected }) => {
// Pre-compute the URL to avoid doing this on every render
const serviceUrl = `https://cardiac-services-directory.heartfoundation.org.au/${store.website}`;

// Prevent event bubbling for the button click
const handleButtonClick = (e: React.MouseEvent) => {
e.stopPropagation();
};

return (
<Card
onClick={onClick}
sx={{
borderRadius: '8px',
cursor: 'pointer',
transition: 'transform 0.2s ease, box-shadow 0.2s ease',
transform: isSelected ? 'scale(1.02)' : 'none',
boxShadow: isSelected ? '0 2px 8px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.05)',
'&:hover': {
boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
// Only apply transform on hover if not already selected (reduces unnecessary animations)
transform: isSelected ? 'scale(1.02)' : 'scale(1.01)'
}
}}
>
<CardContent sx={{ padding: 2, '&:last-child': { pb: 2 } }}>
<Typography variant="subtitle1" component="h3" sx={{ fontWeight: 'medium', mb: 1 }}>
{store.centre_name}
</Typography>

<Box display="flex" alignItems="flex-start" mb={1}>
<LocationOnIcon sx={{ mr: 1, color: '#C8102E', fontSize: '1.2rem', mt: 0.2 }} />
<Typography variant="body2" sx={{ lineHeight: 1.4 }}>{store.address}</Typography>
</Box>

<Box display="flex" alignItems="center" mb={1}>
<PhoneIcon sx={{ mr: 1, color: '#C8102E', fontSize: '1.2rem' }} />
<Typography variant="body2">{store.centre_phone_1}</Typography>
</Box>

<Box display="flex" alignItems="flex-start" mb={1.5}>
<EmailIcon sx={{ mr: 1, color: '#C8102E', fontSize: '1.2rem', mt: 0.2 }} />
<Typography
variant="body2"
sx={{
lineHeight: 1.4,
maxWidth: 'calc(100% - 32px)', // Accounting for icon width and margin
overflow: 'hidden',
textOverflow: 'ellipsis',
whiteSpace: 'nowrap'
}}
>
{store.primary_email}
</Typography>
</Box>

{showDistance && store.distance !== undefined && (
<Typography variant="body2" color="textSecondary" mb={1.5}>
Approx. {store.distance.toFixed(1)} km away
</Typography>
)}

<Box display="flex" justifyContent="center">
<Button
variant="outlined"
sx={{
width: 1,
borderColor: '#C8102E',
color: 'black',
'&:hover': {
borderColor: '#C8102E',
backgroundColor: 'rgba(200, 16, 46, 0.04)'
},
}}
href={serviceUrl}
target="_blank"
onClick={handleButtonClick} // Prevent card click when clicking the button
>
View Service
</Button>
</Box>
</CardContent>
</Card>
);
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(ServiceCard);