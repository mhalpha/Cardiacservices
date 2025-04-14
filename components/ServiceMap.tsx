import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect, useMemo } from 'react';
import { GoogleMap, Marker, InfoWindow, MarkerClusterer } from '@react-google-maps/api';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { Button, Box, Typography } from '@mui/material';
interface Store {
 centre_name: string;
 address: string;
 centre_phone_1: string;
 primary_email: string;
 lat: string | number;
 lng: string | number;
 website: string;
 distance?: number;
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
// Memoized container style to prevent recreating on every render
const containerStyle = {
 width: '100%',
 height: '100%',
};
const ServiceMap = forwardRef((props: ServiceMapProps, ref) => {
 const { stores, nearestStores, center, zoom, showNearestMarkers, onMarkerClick, onInfoWindowClose } = props;
 const [selectedStore, setSelectedStore] = useState<Store | null>(null);
 const mapRef = useRef<any>(null);
 const [mapLoaded, setMapLoaded] = useState(false);
 // Expose methods to parent component
 useImperativeHandle(ref, () => ({
   handleStoreClick(store: Store) {
     setSelectedStore(store);
   },
   fitBounds(bounds: any) {
     if (mapRef.current) {
       mapRef.current.fitBounds(bounds);
     }
   },
 }));
 // Memoize markers to prevent unnecessary recalculations
 const allMarkers = useMemo(() => {
   if (showNearestMarkers) {
     // Create unique set of markers by combining both arrays and filtering out duplicates
     const uniqueStores = new Map<string, Store>();
     // Add regular stores first
     stores.forEach(store => {
       const key = `${store.lat}-${store.lng}`;
       uniqueStores.set(key, store);
     });
     // Then add nearest stores (only if they're not already in the map)
     nearestStores.forEach(store => {
       const key = `${store.lat}-${store.lng}`;
       if (!uniqueStores.has(key)) {
         uniqueStores.set(key, store);
       }
     });
     return Array.from(uniqueStores.values());
   } else {
     return stores;
   }
 }, [stores, nearestStores, showNearestMarkers]);
 // Handle map load event
 const handleMapLoad = (map: any) => {
   console.log("Map loaded successfully");
   mapRef.current = map;
   setMapLoaded(true);
 };
 // Update the map when center or zoom changes
 useEffect(() => {
   if (mapRef.current) {
     mapRef.current.panTo(center);
     mapRef.current.setZoom(zoom);
   }
 }, [center, zoom]);
 // Reset selected store when stores change
 useEffect(() => {
   setSelectedStore(null);
 }, [stores]);
 // Memoize the marker click handler
 const handleMarkerClick = (store: Store, index: number) => {
   setSelectedStore(store);
   onMarkerClick(store, index);
 };
 // Map options
 const mapOptions = {
   gestureHandling: 'greedy',
   disableDefaultUI: true,
   clickableIcons: false,
   zoomControl: true,
   maxZoom: 18,
   minZoom: 3,
   mapTypeControl: false,
   streetViewControl: false,
   rotateControl: false,
   scaleControl: false,
   fullscreenControl: false,
   tilt: 0,
 };
 // Cluster options - defined inside component to avoid 'google is not defined' error
 const clusterOptions = {
   gridSize: 50,
   maxZoom: 15,
   minimumClusterSize: 3,
 };
 return (
<GoogleMap
     mapContainerStyle={containerStyle}
     center={center}
     zoom={zoom}
     onLoad={handleMapLoad}
     options={mapOptions}
>
     {mapLoaded && (
<MarkerClusterer options={clusterOptions}>
         {(clusterer) => (
<div>
             {allMarkers.map((store, index) => (
<Marker
                 key={`${store.lat}-${store.lng}-${index}`}
                 position={{
                   lat: typeof store.lat === 'string' ? parseFloat(store.lat) : store.lat as number,
                   lng: typeof store.lng === 'string' ? parseFloat(store.lng) : store.lng as number
                 }}
                 onClick={() => handleMarkerClick(store, index)}
                 clusterer={clusterer}
                 zIndex={selectedStore && store &&
                   typeof selectedStore.lat !== undefined && typeof store.lat !== undefined &&
                   typeof selectedStore.lng !== undefined && typeof store.lng !== undefined &&
                   String(selectedStore.lat) === String(store.lat) &&
                   String(selectedStore.lng) === String(store.lng)
                   ? 1000 : 1}
               />
             ))}
</div>
         )}
</MarkerClusterer>
     )}
     {selectedStore && (
<InfoWindow
         position={{
           lat: typeof selectedStore.lat === 'string' ? parseFloat(selectedStore.lat) : selectedStore.lat as number,
           lng: typeof selectedStore.lng === 'string' ? parseFloat(selectedStore.lng) : selectedStore.lng as number
         }}
         onCloseClick={() => {
           setSelectedStore(null);
           onInfoWindowClose();
         }}
         // Define options inline to avoid 'google is not defined' error
         options={{
           pixelOffset: {
             equals: () => false, // Stub method required by Google Maps API
             x: 0,
             y: -30
           } as any
         }}
>
<Box sx={{ width: '250px' }}>
<Typography
             variant="subtitle1"
             sx={{
               whiteSpace: 'nowrap',
               overflow: 'hidden',
               textOverflow: 'ellipsis',
               fontWeight: 500
             }}
>
             {selectedStore.centre_name}
</Typography>
<Box display="flex" alignItems="flex-start" mb={1}>
<LocationOnIcon sx={{ mr: 1, color: '#C8102E', fontSize: '1.2rem', mt: 0.2 }} />
<Typography
               variant="body2"
               sx={{
                 whiteSpace: 'nowrap',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 lineHeight: 1.4,
                 maxWidth: 'calc(100% - 32px)' // Account for icon
               }}
>
               {selectedStore.address}
</Typography>
</Box>
<Box display="flex" alignItems="center" mb={1}>
<PhoneIcon sx={{ mr: 1, color: '#C8102E', fontSize: '1.2rem' }} />
<Typography variant="body2">{selectedStore.centre_phone_1}</Typography>
</Box>
<Box display="flex" alignItems="flex-start" mb={1.5}>
<EmailIcon sx={{ mr: 1, color: '#C8102E', fontSize: '1.2rem', mt: 0.2 }} />
<Typography
               variant="body2"
               sx={{
                 whiteSpace: 'nowrap',
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 lineHeight: 1.4,
                 maxWidth: 'calc(100% - 32px)' // Account for icon
               }}
>
               {selectedStore.primary_email}
</Typography>
</Box>
<Box display="flex" justifyContent="center">
<Button
               variant="outlined"
               size="small"
               sx={{
                 width: 1,
                 borderColor: '#C8102E',
                 color: 'black',
                 textTransform: 'none',
                 '&:hover': {
                   borderColor: '#C8102E',
                   backgroundColor: 'rgba(200, 16, 46, 0.04)'
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
// Use React.memo to prevent unnecessary re-renders
export default React.memo(ServiceMap);