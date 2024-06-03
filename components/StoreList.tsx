import React, { useRef, useState, useEffect } from 'react';
import { Box, TextField, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent, Typography, Grid, Container, ToggleButton, ToggleButtonGroup, IconButton, InputAdornment } from '@mui/material';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import ClearIcon from '@mui/icons-material/Clear';
import StoreCard from './StoreCard';
import StoreMap from './StoreMap';

const libraries: ('places')[] = ['places']; // Declare the libraries array as a mutable array

const calculateDistance = (lat: number, lon: number, lat2: number, lon2: number) => {
  const toRad = (value: number) => value * Math.PI / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat);
  const dLon = toRad(lon2 - lon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const initialCenter = { lat: -25.2744, lng: 133.7751 }; // Center of Australia
const initialZoom = 4; // Zoom level to show the full Australia

const StoreList = () => {
  const mapRef = useRef<any>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [radius, setRadius] = useState(10);
  const [filteredStores, setFilteredStores] = useState([]);
  const [nearestStores, setNearestStores] = useState([]);
  const [allStores, setAllStores] = useState([]);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [noStoresFound, setNoStoresFound] = useState(false);
  const [searchMode, setSearchMode] = useState<'autocomplete' | 'keyword'>('autocomplete');
  const [selectedStore, setSelectedStore] = useState<null | number>(null);

  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(initialZoom);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('/api/stores');
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        setAllStores(data);
        setFilteredStores(data);
        setNearestStores(data);
        setDataLoaded(true); // Set dataLoaded flag to true after data is loaded
      } catch (error) {
        console.error('Error fetching store data:', error);
      }
    };

    fetchStores();
  }, []);

  useEffect(() => {
    if (autocomplete && dataLoaded) {
      const place = autocomplete.getPlace();
      if (place && place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        filterStoresByRadius(lat, lng, radius);
        setMapCenter({ lat, lng });
        setZoom(14);
      }
    }
  }, [autocomplete, dataLoaded, radius]);

  const filterStoresByRadius = (lat: number, lng: number, radius: number) => {
    const storesWithDistance = allStores.map(store => ({
      ...store,
      distance: calculateDistance(lat, lng, parseFloat(store.lat), parseFloat(store.lng))
    }));

    const storesWithinRadius = storesWithDistance.filter(store => store.distance <= radius).sort((a, b) => a.distance - b.distance);
    const nearestStoresSorted = storesWithDistance.sort((a, b) => a.distance - b.distance).slice(0, 5); // Top 5 nearest stores

    setFilteredStores(storesWithinRadius);
    setNearestStores(nearestStoresSorted);
    setNoStoresFound(storesWithinRadius.length === 0);

    // Calculate bounds
    if (storesWithinRadius.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      storesWithinRadius.forEach(store => {
        bounds.extend(new google.maps.LatLng(parseFloat(store.lat), parseFloat(store.lng)));
      });
      if (mapRef.current) {
        mapRef.current.fitBounds(bounds);
      }
    }
  };

  useEffect(() => {
    if (autocomplete) {
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          filterStoresByRadius(lat, lng, radius);
          setMapCenter({ lat, lng });
          setZoom(14);
        }
      });
    }
  }, [autocomplete, radius]);

  const handleStoreClick = (store: any, index: number) => {
    if (mapRef.current) {
      mapRef.current.handleStoreClick(store);
      setMapCenter({ lat: parseFloat(store.lat), lng: parseFloat(store.lng) });
      setZoom(14);
      setSelectedStore(index);
      document.getElementById(`store-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleMapMarkerClick = (store: any, index: number) => {
    setSelectedStore(index);
    document.getElementById(`store-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleInfoWindowClose = () => {
    setSelectedStore(null);
    document.querySelector('.MuiGrid-root')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = () => {
    if (searchMode === 'autocomplete' && autocomplete) {
      const place = autocomplete.getPlace();
      if (place && place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        filterStoresByRadius(lat, lng, radius);
        setMapCenter({ lat, lng });
        setZoom(14);
      }
    } else if (searchMode === 'keyword') {
      const filtered = allStores.map(store => ({
        ...store,
        distance: calculateDistance(mapCenter.lat, mapCenter.lng, parseFloat(store.lat), parseFloat(store.lng))
      })).filter(store =>
        store.centre_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStores(filtered);
      setNoStoresFound(filtered.length === 0);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredStores(allStores);
    setMapCenter(initialCenter);
    setZoom(initialZoom);
    setNoStoresFound(false);
    setSelectedStore(null);
    document.querySelector('.MuiGrid-root')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const handleRadiusChange = (e: SelectChangeEvent<number>) => {
    const newRadius = Number(e.target.value);
    setRadius(newRadius);
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place && place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        filterStoresByRadius(lat, lng, newRadius);
      }
    }
  };

  const handleSearchModeChange = (event: React.MouseEvent<HTMLElement>, newMode: 'autocomplete' | 'keyword') => {
    if (newMode !== null) {
      setSearchMode(newMode);
    }
  };

  useEffect(() => {
    if (searchMode === 'keyword') {
      const filtered = allStores.map(store => ({
        ...store,
        distance: calculateDistance(mapCenter.lat, mapCenter.lng, parseFloat(store.lat), parseFloat(store.lng))
      })).filter(store =>
        store.centre_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStores(filtered);
      setNoStoresFound(filtered.length === 0);
    }
  }, [searchTerm, searchMode]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyANKF35eBMMoclISsuMZ95Gdgt3EtkF6mI"
      libraries={libraries}
      loadingElement={<div>Loading...</div>}
      onLoad={() => setScriptLoaded(true)}
      onError={(e) => console.error('Error loading Google Maps API:', e)}
    >
      {scriptLoaded && dataLoaded && (
        <Container sx={{ overflow: 'hidden', height: '100vh', maxWidth: '100% !important' }}>
          <Grid container height="100vh" wrap="nowrap" direction={{ xs: 'column', md: 'row' }}>
            <Grid item xs={12} md={3} display="flex" flexDirection="column" overflow="auto" borderRight={{ md: '1px solid #ddd' }} sx={{ p: 2, order: { xs: 2, md: 1 } }}>
              <Box mb={2} display="flex" justifyContent="center">
                <ToggleButtonGroup
                  value={searchMode}
                  exclusive
                  onChange={handleSearchModeChange}
                  aria-label="search mode"
                  sx={{
                    overflow: 'hidden',
                    '& .MuiToggleButton-root': {
                      transition: 'all 0.3s',
                    },
                    '& .Mui-selected': {
                      backgroundColor: '#C8102E !important',
                      color: 'white !important',
                      '&:hover': {
                        backgroundColor: '#C8102E',
                      },
                    },
                  }}
                >
                  <ToggleButton value="autocomplete" aria-label="search by autocomplete">
                    Postcode
                  </ToggleButton>
                  <ToggleButton value="keyword" aria-label="search by keyword">
                    Keyword
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Box mb={2} width="100%">
                {searchMode === 'autocomplete' ? (
                  <Autocomplete onLoad={handleLoad}>
                    <TextField
                      fullWidth
                      InputProps={{
                        sx: { borderRadius: 10 },
                        endAdornment: searchTerm ? (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClearSearch}>
                              <ClearIcon />
                            </IconButton>
                          </InputAdornment>
                        ) : null,
                      }}
                      placeholder="Search by name or postcode"
                      inputRef={searchInputRef}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Autocomplete>
                ) : (
                  <TextField
                    fullWidth
                    InputProps={{
                      sx: { borderRadius: 10 },
                      endAdornment: searchTerm ? (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClearSearch}>
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>
                      ) : null,
                    }}
                    placeholder="Search by keyword"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                )}
              </Box>
              {searchMode === 'autocomplete' && (
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Radius</InputLabel>
                  <Select
                    value={radius}
                    onChange={handleRadiusChange}
                  >
                    <MenuItem value={5}>5 km</MenuItem>
                    <MenuItem value={10}>10 km</MenuItem>
                    <MenuItem value={20}>20 km</MenuItem>
                    <MenuItem value={50}>50 km</MenuItem>
                  </Select>
                </FormControl>
              )}
              {noStoresFound ? (
                searchMode === 'autocomplete' ? (
                  <>
                    <Typography variant="h6" color="textSecondary" align="center">
                      No services found within the selected radius.
                    </Typography>
                    <Typography variant="h6" color="textSecondary" align="center">
                      Nearest services:
                    </Typography>
                    {nearestStores.map((store, index) => (
                      <Box key={index} mb={2} id={`store-${index}`} className={selectedStore === index ? 'highlight' : ''}>
                        <StoreCard store={store} onClick={() => handleStoreClick(store, index)} showDistance />
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
                  <Box key={index} mb={2} id={`store-${index}`} className={selectedStore === index ? 'highlight' : ''}>
                    <StoreCard store={store} onClick={() => handleStoreClick(store, index)} showDistance={false} />
                  </Box>
                ))
              )}
            </Grid>
            <Grid item xs={12} md={9} sx={{ height: { xs: '50vh', md: '100vh' }, order: { xs: 1, md: 2 } }}>
              <StoreMap ref={mapRef} stores={filteredStores} nearestStores={nearestStores} center={mapCenter} zoom={zoom} showNearestMarkers={noStoresFound && searchMode === 'autocomplete'} onMarkerClick={handleMapMarkerClick} onInfoWindowClose={handleInfoWindowClose} />
            </Grid>
          </Grid>
        </Container>
      )}
    </LoadScript>
  );
};

export default StoreList;
