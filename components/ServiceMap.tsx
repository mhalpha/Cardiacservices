import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { Button, Box, Typography } from '@mui/material';
interface Store {
 centre_name: string;
 address: string;
 centre_phone_1: string;
 primary_email: string;
 lat: string;
 lng: string;
 website: string;
}
interface ServiceMapProps {
 stores: Store[];
 nearestStores: Store[];
 center: { lat: number; lng: number };
 zoom: number;
 showNearestMarkers: boolean;
 onMarkerClick: (store: Store, index: number) => void;
 onInfoWindowClose: () => void;
}
const containerStyle = {
 width: '100%',
 height: '100%',
};
const ServiceMap = forwardRef((props: ServiceMapProps, ref) => {
 const { stores, nearestStores, center, zoom, showNearestMarkers, onMarkerClick, onInfoWindowClose } = props;
 const [selectedStore, setSelectedStore] = useState<Store | null>(null);
 const mapRef = useRef<google.maps.Map | null>(null);
 useImperativeHandle(ref, () => ({
   handleStoreClick(store: Store) {
     setSelectedStore(store);
   },
   fitBounds(bounds: google.maps.LatLngBounds) {
     if (mapRef.current) {
       mapRef.current.fitBounds(bounds);
     }
   },
 }));
 const allMarkers = showNearestMarkers ? [...stores, ...nearestStores] : stores;
 return (
<GoogleMap
     mapContainerStyle={containerStyle}
     center={center}
     zoom={zoom}
     onLoad={(map) => {
       mapRef.current = map;
     }}
     options={{
       gestureHandling: 'greedy',
       fullscreenControl: false,    // Turn off fullscreen control
       streetViewControl: false,    // Turn off street view control
       mapTypeControl: false,       // Turn off map type control (map/satellite toggle)
     }}
>
     {allMarkers.map((store, index) => (
<Marker
         key={index}
         position={{ lat: parseFloat(store.lat), lng: parseFloat(store.lng) }}
         onClick={() => {
           setSelectedStore(store);
           onMarkerClick(store, index);
         }}
         zIndex={selectedStore && selectedStore.lat === store.lat && selectedStore.lng === store.lng ? 1000 : 1}
       />
     ))}
     {selectedStore && (
<InfoWindow
         position={{ lat: parseFloat(selectedStore.lat), lng: parseFloat(selectedStore.lng) }}
         onCloseClick={() => {
           setSelectedStore(null);
           onInfoWindowClose();
         }}
         options={{ pixelOffset: new google.maps.Size(0, -30) }}
>
<Box sx={{ width: '250px' }}>
<Typography variant="h6" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
             {selectedStore.centre_name}
</Typography>
<Box display="flex" alignItems="center" mb={1}>
<LocationOnIcon sx={{ mr: 1 }} />
<Typography variant="body2" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
               {selectedStore.address}
</Typography>
</Box>
<Box display="flex" alignItems="center" mb={1}>
<PhoneIcon sx={{ mr: 1 }} />
<Typography variant="body2">{selectedStore.centre_phone_1}</Typography>
</Box>
<Box display="flex" alignItems="center" mb={2}>
<EmailIcon sx={{ mr: 1 }} />
<Typography variant="body2" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
               {selectedStore.primary_email}
</Typography>
</Box>
<Box display="flex" justifyContent="center">
<Button
               variant="outlined"
               sx={{
                 borderColor: '#C8102E',
                 color: 'black',
                 '&:hover': {
                   borderColor: '#C8102E',
                 },
               }}
               href={`https://cardiac-services-directory.heartfoundation.org.au/${selectedStore.website}`}
               target="_blank"
>
               View Service
</Button>
</Box>
</Box>
</InfoWindow>
     )}
</GoogleMap>
 );
});
export default ServiceMap;