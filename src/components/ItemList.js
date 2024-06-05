import React, { useState, useEffect } from 'react';
import { apis, fetchWeatherForCities, fetchDataFromApi, fetchDogImages, fetchData } from '../services/api';
import { Container, Grid, Card, CardContent, Typography, Button, TextField } from '@mui/material';
import SearchBar from './SearchBar';

const ItemList = ({ apiType }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    const getData = async () => {
      let apiConfig;
      let fetchedData = [];

      if (apiType === 'weather') {
        apiConfig = apis.weather;
        fetchedData = await fetchWeatherForCities(apiConfig);
      } else if (apiType === 'jsonPlaceholder') {
        apiConfig = apis.jsonPlaceholder;
        fetchedData = await fetchDataFromApi(apiConfig);
      } else if (apiType === 'dogAPI') {
        fetchedData = await fetchDogImages();
      }

      console.log(`Fetched data for ${apiType}:`, fetchedData);
      setData(fetchedData);
    };
    getData();
  }, [apiType]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCityChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCitySearch = async () => {
    if (apiType === 'weather' && searchTerm) {
      const apiConfig = { ...apis.weather, queryParams: { ...apis.weather.queryParams, q: searchTerm } };
      const cityWeatherData = await fetchData(apiConfig.endpoint, apiConfig.queryParams);
      setData(cityWeatherData ? [cityWeatherData] : []);
    }
  };

  const filteredData = data.filter(item =>
    apiType === 'weather'
      ? item.name?.toLowerCase().includes(searchTerm.toLowerCase())
      : apiType === 'jsonPlaceholder'
        ? item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter by name
          item.username?.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter by username
          item.email?.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by email
        : true // Dog API data doesn't require filtering
  );

  // Only paginate dog images, display all items for other types
  const paginatedData = apiType === 'dogAPI'
    ? filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : filteredData;

  return (
    <Container className="container" maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        {apiType === 'weather' ? 'Weather Data' : apiType === 'jsonPlaceholder' ? 'Posts' : 'Dog Images'}
      </Typography>
      {(apiType === 'weather' || apiType === 'jsonPlaceholder') && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {apiType === 'weather' ? (
            <>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Enter city"
                value={searchTerm}
                onChange={handleCityChange}
              />
              <Button variant="contained" color="primary" onClick={handleCitySearch}>
                Search
              </Button>
            </>
          ) : (
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          )}
        </div>
      )}
      <Grid container spacing={3}>
        {paginatedData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id || index}>
            <Card className="card">
              <CardContent>
                {apiType === 'weather' && (
                  <>
                    <Typography variant="h6">
                      {item.name}, {item.sys?.country}
                    </Typography>
                    <Typography variant="body2">
                      Temperature: {item.main?.temp}°C
                    </Typography>
                    <Typography variant="body2">
                      Weather: {item.weather?.[0]?.description}
                    </Typography>
                  </>
                )}
                {apiType === 'jsonPlaceholder' && (
  <>
    <Typography variant="h6">
      {item.name} {/* Display user's name */}
    </Typography>
    <Typography variant="body2">
      {item.username} - {item.email} {/* Display username and email */}
    </Typography>
  </>
)}
                {apiType === 'dogAPI' && (
                  <>
                    <img src={item.url} alt="Dog" style={{ width: '100%' }} />
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {apiType === 'dogAPI' && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button onClick={() => setCurrentPage(currentPage > 0 ? currentPage - 1 : 0)} disabled={currentPage === 0}>
            Previous
          </Button>
          <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={(currentPage + 1) * itemsPerPage >= filteredData.length}>
            Next
          </Button>
        </div>
      )}
    </Container>
  );
};

export default ItemList;
