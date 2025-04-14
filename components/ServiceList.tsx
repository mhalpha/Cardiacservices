import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Box, TextField, MenuItem, Select, FormControl, SelectChangeEvent, Typography, Button, IconButton,
InputAdornment, Paper, Collapse, useMediaQuery, useTheme } from '@mui/material';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CloseIcon from '@mui/icons-material/Close';
import ServiceCard from './ServiceCard';
import ServiceMap from './ServiceMap';

// Define known libraries to prevent rerenders
const libraries: ('places')[] = ['places'];

// Create our own debounce function
const debounce = (func: Function, wait: number) => {
let timeout: ReturnType<typeof setTimeout>;
return function executedFunction(...args: any[]) {
const later = () => {
clearTimeout(timeout);
func(...args);
};
clearTimeout(timeout);
timeout = setTimeout(later, wait);
};
};

// Memoize calculation function to prevent recreation on render
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
const toRad = (value: number) => value * Math.PI / 180;
const R = 6371; // km
const dLat = toRad(lat2 - lat1);
const dLon = toRad(lon2 - lon1);
const a =
Math.sin(dLat / 2) * Math.sin(dLat / 2) +
Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
Math.sin(dLon / 2) * Math.sin(dLon / 2);
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
return R * c;
};

const initialCenter = { lat: -25.2744, lng: 133.7751 };
const initialZoom = 4;

// Define the store type for type safety
interface Store {
centre_name: string;
address: string;
centre_phone_1: string;
primary_email: string;
lat: string;
lng: string;
website: string;
distance?: number;
}

const ServiceList = () => {
const mapRef = useRef<any>(null);
const searchInputRef = useRef<HTMLInputElement>(null);
const [searchTerm, setSearchTerm] = useState('');
const [radius, setRadius] = useState(10);
const [filteredStores, setFilteredStores] = useState<Store[]>([]);
const [nearestStores, setNearestStores] = useState<Store[]>([]);
const [allStores, setAllStores] = useState<Store[]>([]);
const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
const [noStoresFound, setNoStoresFound] = useState(false);
const [searchMode, setSearchMode] = useState<'autocomplete' | 'keyword'>('autocomplete');
const [selectedStore, setSelectedStore] = useState<null | number>(null);
const [isListOpen, setIsListOpen] = useState(false);
const [mapCenter, setMapCenter] = useState(initialCenter);
const [zoom, setZoom] = useState(initialZoom);
const [dataLoaded, setDataLoaded] = useState(false);
const [scriptLoaded, setScriptLoaded] = useState(false);

// Mobile detection
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

// Fetch stores data only once
useEffect(() => {
const fetchStores = async () => {
try {
console.log("Fetching stores data...");
// Add cache control for better network performance
const response = await fetch('/api/stores', {
headers: {
'Cache-Control': 'max-age=3600' // Cache for an hour
}
});

if (!response.ok) {
throw new Error(`Error fetching data: ${response.statusText}`);
}

const data = await response.json();
console.log(`Fetched ${data.length} stores`);

// Process data once to avoid reprocessing
const processedData = data.map((store: Store) => ({
...store,
lat: store.lat, // Keep as string for compatibility
lng: store.lng
}));

setAllStores(processedData);
setFilteredStores(processedData);
setDataLoaded(true);
} catch (error) {
console.error('Error fetching store data:', error);
}
};

fetchStores();
}, []);

// Memoize the filter function to prevent recreating on each render
const filterStoresByRadius = useCallback((lat: number, lng: number, radius: number) => {
// Create bounds object once
const bounds = new google.maps.LatLngBounds();
const storesWithDistance = allStores.map(store => {
const distance = calculateDistance(lat, lng, parseFloat(store.lat), parseFloat(store.lng));

// Extend bounds while we're already iterating
if (distance <= radius) {
bounds.extend(new google.maps.LatLng(parseFloat(store.lat), parseFloat(store.lng)));
}

return {
...store,
distance
};
});

const storesWithinRadius = storesWithDistance
.filter(store => store.distance <= radius)
.sort((a, b) => (a.distance || 0) - (b.distance || 0));

const nearestStoresSorted = [...storesWithDistance]
.sort((a, b) => (a.distance || 0) - (b.distance || 0))
.slice(0, 5); // Top 5 nearest stores

setFilteredStores(storesWithinRadius);
setNearestStores(nearestStoresSorted);
setNoStoresFound(storesWithinRadius.length === 0);

// Only fit bounds if there are stores to display
if (storesWithinRadius.length > 0 && mapRef.current) {
mapRef.current.fitBounds(bounds);
}
}, [allStores]);

// Debounce the search to prevent excessive filtering
const debouncedKeywordSearch = useCallback(
debounce((term: string) => {
if (searchMode === 'keyword') {
const lowerTerm = term.toLowerCase();
const filtered = allStores
.map(store => ({
...store,
distance: calculateDistance(
mapCenter.lat,
mapCenter.lng,
parseFloat(store.lat),
parseFloat(store.lng)
)
}))
.filter(store =>
store.centre_name.toLowerCase().includes(lowerTerm) ||
store.address.toLowerCase().includes(lowerTerm)
);

setFilteredStores(filtered);
setNoStoresFound(filtered.length === 0);
}
}, 300), // 300ms debounce delay
[allStores, mapCenter, searchMode]
);

// Effect for handling autocomplete place selection
useEffect(() => {
if (autocomplete) {
autocomplete.addListener('place_changed', () => {
const place = autocomplete.getPlace();
if (place?.geometry?.location) {
const lat = place.geometry.location.lat();
const lng = place.geometry.location.lng();
filterStoresByRadius(lat, lng, radius);
setMapCenter({ lat, lng });
setZoom(12);
}
});
}
}, [autocomplete, radius, filterStoresByRadius]);

// Update search results when search term changes
useEffect(() => {
debouncedKeywordSearch(searchTerm);
}, [searchTerm, debouncedKeywordSearch]);

// Memoize event handlers to prevent recreation on renders
const handleStoreClick = useCallback((store: Store, index: number) => {
if (mapRef.current) {
mapRef.current.handleStoreClick(store);
setMapCenter({
lat: parseFloat(store.lat),
lng: parseFloat(store.lng)
});
setZoom(12);
setSelectedStore(index);

// Use ref instead of direct DOM query
const storeListContainer = document.querySelector('.store-list-container');
if (storeListContainer) {
const storeElement = document.getElementById(`store-${index}`);
if (storeElement) {
storeListContainer.scrollTo({
top: storeElement.offsetTop - 100,
behavior: 'smooth'
});
}
}
}
}, []);

const handleMapMarkerClick = useCallback((store: Store, index: number) => {
setSelectedStore(index);

// Use ref instead of direct DOM query
const storeListContainer = document.querySelector('.store-list-container');
if (storeListContainer) {
const storeElement = document.getElementById(`store-${index}`);
if (storeElement) {
storeListContainer.scrollTo({
top: storeElement.offsetTop - 100,
behavior: 'smooth'
});
}
}
}, []);

const handleInfoWindowClose = useCallback(() => {
setSelectedStore(null);

// Use ref instead of direct DOM query
const storeListContainer = document.querySelector('.store-list-container');
if (storeListContainer) {
storeListContainer.scrollTo({ top: 0, behavior: 'smooth' });
}
}, []);

const handleClearSearch = useCallback(() => {
setSearchTerm('');
setFilteredStores(allStores);
setMapCenter(initialCenter);
setZoom(initialZoom);
setNoStoresFound(false);
setSelectedStore(null);

// Use ref instead of direct DOM query
const storeListContainer = document.querySelector('.store-list-container');
if (storeListContainer) {
storeListContainer.scrollTo({ top: 0, behavior: 'smooth' });
}
}, [allStores]);

const handleLoad = useCallback((autocompleteInstance: google.maps.places.Autocomplete) => {
setAutocomplete(autocompleteInstance);
}, []);

const handleRadiusChange = useCallback((e: SelectChangeEvent<number>) => {
const newRadius = Number(e.target.value);
setRadius(newRadius);

if (autocomplete) {
const place = autocomplete.getPlace();
if (place?.geometry?.location) {
const lat = place.geometry.location.lat();
const lng = place.geometry.location.lng();
filterStoresByRadius(lat, lng, newRadius);
}
}
}, [autocomplete, filterStoresByRadius]);

const handleSearchModeChange = useCallback(() => {
setSearchMode(prev => prev === 'autocomplete' ? 'keyword' : 'autocomplete');
setSearchTerm('');
}, []);

const toggleList = useCallback(() => {
setIsListOpen(prev => !prev);
}, []);

// Memoize the map props to prevent unnecessary re-renders
const mapProps = useMemo(() => ({
stores: filteredStores,
nearestStores,
center: mapCenter,
zoom,
showNearestMarkers: noStoresFound && searchMode === 'autocomplete',
onMarkerClick: handleMapMarkerClick,
onInfoWindowClose: handleInfoWindowClose
}), [
filteredStores,
nearestStores,
mapCenter,
zoom,
noStoresFound,
searchMode,
handleMapMarkerClick,
handleInfoWindowClose
]);

if (!dataLoaded) {
return <div>Loading data...</div>;
}

return (
<LoadScript
googleMapsApiKey="AIzaSyAm-eP8b7-FH2A8nzYucTG9NcPTz0OiAX0"
libraries={libraries}
loadingElement={<div>Loading Google Maps...</div>}
onLoad={() => {
console.log("Google Maps script loaded");
setScriptLoaded(true);
}}
onError={(e) => console.error('Error loading Google Maps API:', e)}
>
<Box sx={{ position: 'relative', width: '100vw', height: '100vh' }}>
{/* Full-screen map container */}
<Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
<ServiceMap
ref={mapRef}
{...mapProps}
/>
</Box>

{/* Floating search bar on top */}
<Box sx={{
position: 'absolute',
top: 20,
left: '50%',
transform: 'translateX(-50%)',
width: isMobile ? '90%' : '70%',
zIndex: 10
}}>
{/* On mobile: Just the search bar without the toggle buttons */}
{isMobile ? (
<>
<Paper
elevation={3}
sx={{
borderRadius: 3,
overflow: 'hidden',
height: '50px',
backgroundColor: 'rgba(255, 255, 255, 0.95)',
width: '100%'
}}
>
{/* Search input field */}
<Box sx={{ position: 'relative', height: '100%' }}>
{searchMode === 'autocomplete' ? (
<Autocomplete
onLoad={handleLoad}
options={{
types: ['(regions)'],
componentRestrictions: { country: 'au' }
}}
>
<TextField
fullWidth
variant="standard"
placeholder="Search by suburb or postcode"
inputRef={searchInputRef}
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
InputProps={{
disableUnderline: true,
sx: {
height: '50px',
pl: 2,
'& input': {
padding: 0,
fontSize: '1rem'
}
},
endAdornment: (
<InputAdornment position="end">
{searchTerm && (
<IconButton
onClick={handleClearSearch}
edge="end"
size="small"
>
<ClearIcon fontSize="small" />
</IconButton>
)}
{searchMode === 'autocomplete' && (
<FormControl variant="standard" sx={{ width: 80, mx: 1 }}>
<Select
value={radius}
onChange={handleRadiusChange}
disableUnderline
sx={{
fontSize: '0.9rem',
'& .MuiSelect-select': {
py: 0.5
}
}}
>
<MenuItem value={5}>5 km</MenuItem>
<MenuItem value={10}>10 km</MenuItem>
<MenuItem value={20}>20 km</MenuItem>
<MenuItem value={50}>50 km</MenuItem>
</Select>
</FormControl>
)}
<IconButton color="primary" sx={{ mr: 0.5 }} size="small">
<SearchIcon fontSize="small" />
</IconButton>
</InputAdornment>
)
}}
/>
</Autocomplete>
) : (
<TextField
fullWidth
variant="standard"
placeholder="Search by service name"
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
InputProps={{
disableUnderline: true,
sx: {
height: '50px',
pl: 2,
'& input': {
padding: 0,
fontSize: '1rem'
}
},
endAdornment: (
<InputAdornment position="end">
{searchTerm && (
<IconButton
onClick={handleClearSearch}
edge="end"
size="small"
>
<ClearIcon fontSize="small" />
</IconButton>
)}
<IconButton color="primary" sx={{ mr: 0.5 }} size="small">
<SearchIcon fontSize="small" />
</IconButton>
</InputAdornment>
)
}}
/>
)}
</Box>
</Paper>

{/* Toggle buttons below search bar on mobile */}
<Box
sx={{
display: 'flex',
justifyContent: 'center',
mt: 1.5
}}
>
<Paper
elevation={3}
sx={{
borderRadius: 10,
overflow: 'hidden',
display: 'flex',
backgroundColor: 'rgba(255, 255, 255, 0.95)'
}}
>
<Box
sx={{
display: 'flex',
borderRadius: 10,
overflow: 'hidden',
bgcolor: 'rgba(0, 0, 0, 0.06)',
p: '2px'
}}
>
<Button
size="small"
variant={searchMode === 'autocomplete' ? 'contained' : 'text'}
onClick={handleSearchModeChange}
sx={{
borderRadius: 10,
px: 2,
py: 0.5,
minWidth: 'auto',
fontSize: '0.85rem',
height: 'auto',
textTransform: 'none',
boxShadow: 'none',
color: searchMode === 'autocomplete' ? 'white' : 'rgba(0, 0, 0, 0.6)',
bgcolor: searchMode === 'autocomplete' ? '#C8102E' : 'transparent',
'&:hover': {
bgcolor: searchMode === 'autocomplete' ? '#C8102E' : 'rgba(0, 0, 0, 0.08)',
boxShadow: 'none'
}
}}
>
Postcode
</Button>
<Button
size="small"
variant={searchMode === 'keyword' ? 'contained' : 'text'}
onClick={handleSearchModeChange}
sx={{
borderRadius: 10,
px: 2,
py: 0.5,
minWidth: 'auto',
fontSize: '0.85rem',
height: 'auto',
textTransform: 'none',
boxShadow: 'none',
color: searchMode === 'keyword' ? 'white' : 'rgba(0, 0, 0, 0.6)',
bgcolor: searchMode === 'keyword' ? '#C8102E' : 'transparent',
'&:hover': {
bgcolor: searchMode === 'keyword' ? '#C8102E' : 'rgba(0, 0, 0, 0.08)',
boxShadow: 'none'
}
}}
>
Service
</Button>
</Box>
</Paper>
</Box>
</>
) : (
// Desktop: Original search bar with the toggle buttons
<Paper
elevation={3}
sx={{
borderRadius: 3,
overflow: 'hidden',
display: 'flex',
height: '50px',
backgroundColor: 'rgba(255, 255, 255, 0.95)'
}}
>
{/* Segmented toggle control */}
<Box
sx={{
display: 'flex',
alignItems: 'center',
bgcolor: 'rgba(0, 0, 0, 0.05)',
p: 1,
borderRight: '1px solid rgba(0, 0, 0, 0.1)'
}}
>
<Box
sx={{
display: 'flex',
borderRadius: 10,
overflow: 'hidden',
bgcolor: 'rgba(0, 0, 0, 0.06)',
p: '2px'
}}
>
<Button
size="small"
variant={searchMode === 'autocomplete' ? 'contained' : 'text'}
onClick={handleSearchModeChange}
sx={{
borderRadius: 10,
px: 1.5,
py: 0.5,
minWidth: 'auto',
fontSize: '0.85rem',
height: 'auto',
textTransform: 'none',
boxShadow: 'none',
color: searchMode === 'autocomplete' ? 'white' : 'rgba(0, 0, 0, 0.6)',
bgcolor: searchMode === 'autocomplete' ? '#C8102E' : 'transparent',
'&:hover': {
bgcolor: searchMode === 'autocomplete' ? '#C8102E' : 'rgba(0, 0, 0, 0.08)',
boxShadow: 'none'
}
}}
>
Postcode
</Button>
<Button
size="small"
variant={searchMode === 'keyword' ? 'contained' : 'text'}
onClick={handleSearchModeChange}
sx={{
borderRadius: 10,
px: 1.5,
py: 0.5,
minWidth: 'auto',
fontSize: '0.85rem',
height: 'auto',
textTransform: 'none',
boxShadow: 'none',
color: searchMode === 'keyword' ? 'white' : 'rgba(0, 0, 0, 0.6)',
bgcolor: searchMode === 'keyword' ? '#C8102E' : 'transparent',
'&:hover': {
bgcolor: searchMode === 'keyword' ? '#C8102E' : 'rgba(0, 0, 0, 0.08)',
boxShadow: 'none'
}
}}
>
Service
</Button>
</Box>
</Box>

{/* Search input field */}
<Box sx={{ position: 'relative', flex: 1 }}>
{searchMode === 'autocomplete' ? (
<Autocomplete
onLoad={handleLoad}
options={{
types: ['(regions)'],
componentRestrictions: { country: 'au' }
}}
>
<TextField
fullWidth
variant="standard"
placeholder="Search by suburb or postcode"
inputRef={searchInputRef}
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
InputProps={{
disableUnderline: true,
sx: {
height: '50px',
pl: 2,
'& input': {
padding: 0,
fontSize: '1rem'
}
},
endAdornment: (
<InputAdornment position="end">
{searchTerm && (
<IconButton
onClick={handleClearSearch}
edge="end"
size="small"
>
<ClearIcon fontSize="small" />
</IconButton>
)}
{searchMode === 'autocomplete' && (
<FormControl variant="standard" sx={{ width: 80, mx: 1 }}>
<Select
value={radius}
onChange={handleRadiusChange}
disableUnderline
sx={{
fontSize: '0.9rem',
'& .MuiSelect-select': {
py: 0.5
}
}}
>
<MenuItem value={5}>5 km</MenuItem>
<MenuItem value={10}>10 km</MenuItem>
<MenuItem value={20}>20 km</MenuItem>
<MenuItem value={50}>50 km</MenuItem>
</Select>
</FormControl>
)}
<IconButton color="primary" sx={{ mr: 0.5 }} size="small">
<SearchIcon fontSize="small" />
</IconButton>
</InputAdornment>
)
}}
/>
</Autocomplete>
) : (
<TextField
fullWidth
variant="standard"
placeholder="Search by service name"
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
InputProps={{
disableUnderline: true,
sx: {
height: '50px',
pl: 2,
'& input': {
padding: 0,
fontSize: '1rem'
}
},
endAdornment: (
<InputAdornment position="end">
{searchTerm && (
<IconButton
onClick={handleClearSearch}
edge="end"
size="small"
>
<ClearIcon fontSize="small" />
</IconButton>
)}
<IconButton color="primary" sx={{ mr: 0.5 }} size="small">
<SearchIcon fontSize="small" />
</IconButton>
</InputAdornment>
)
}}
/>
)}
</Box>
</Paper>
)}

{/* List visibility toggle button */}
<Box sx={{ position: 'absolute', left: 0, top: isMobile ? '100px' : '60px', zIndex: 10 }}>
<Button
variant="contained"
startIcon={<FormatListBulletedIcon />}
onClick={toggleList}
sx={{
bgcolor: 'white',
color: '#333',
boxShadow: 2,
borderRadius: 2,
textTransform: 'none',
px: 2,
py: 1,
fontSize: '0.8rem',
'&:hover': {
bgcolor: '#f5f5f5',
},
display: isListOpen ? 'none' : 'flex'
}}
>
Show List
</Button>
</Box>
</Box>

{/* Floating collapsible list on the left */}
<Box sx={{
position: 'absolute',
top: isMobile ? 130 : 85, // Position it lower on mobile to account for the toggle button
left: isMobile ? 0 : '15%', // On mobile, align to left edge for more space
width: isMobile ? '100%' : 300, // Full width on mobile
zIndex: 5,
}}>
<Collapse
in={isListOpen}
timeout={300}
sx={{
transformOrigin: 'top'
}}
>
<Paper
elevation={3}
sx={{
borderRadius: 3,
width: '100%',
height: 'calc(100vh - 150px)', // Adjust height to account for mobile toggle
overflow: 'hidden',
backgroundColor: 'rgba(255, 255, 255, 0.95)',
position: 'relative',
display: 'flex',
flexDirection: 'column'
}}
>
{/* Close button for the list */}
<Box sx={{
position: 'absolute',
top: 10,
right: 10,
zIndex: 1
}}>
<IconButton
size="small"
onClick={toggleList}
sx={{
bgcolor: 'rgba(0, 0, 0, 0.05)',
'&:hover': {
bgcolor: 'rgba(0, 0, 0, 0.1)'
}
}}
>
<CloseIcon fontSize="small" />
</IconButton>
</Box>

<Box
className="store-list-container"
sx={{
p: 2,
pt: 3,
height: '100%',
overflowY: 'auto',
flexGrow: 1
}}
>
{noStoresFound ? (
searchMode === 'autocomplete' ? (
<>
<Typography variant="h6" color="textSecondary" align="center" sx={{ mb: 2 }}>
No services found within the selected radius.
</Typography>
<Typography variant="h6" color="textSecondary" align="center" sx={{ mb: 2 }}>
Nearest services:
</Typography>
{nearestStores.map((store, index) => (
<Box key={index} mb={2} id={`store-${index}`} sx={{
transition: 'transform 0.2s ease',
transform: selectedStore === index ? 'scale(1.02)' : 'scale(1)',
boxShadow: selectedStore === index ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
}}>
<ServiceCard
store={store}

onClick={() => handleStoreClick(store, index)}

showDistance

isSelected={selectedStore === index}

/>
</Box>

))}
</>

) : (
<Typography variant="h6" color="textSecondary" align="center">

No services found with that name. Please try again with a different name.
</Typography>

)

) : (

filteredStores.map((store, index) => (
<Box

key={index}

mb={2}

id={`store-${index}`}

sx={{

transition: 'transform 0.2s ease',

transform: selectedStore === index ? 'scale(1.02)' : 'scale(1)',

boxShadow: selectedStore === index ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',

}}
>
<ServiceCard

store={store}

onClick={() => handleStoreClick(store, index)}

showDistance={false}

isSelected={selectedStore === index}

/>
</Box>

))

)}
</Box>
</Paper>
</Collapse>
</Box>
</Box>
</LoadScript>

);

};

export default React.memo(ServiceList); 