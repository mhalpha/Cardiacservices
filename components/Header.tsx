import { AppBar, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const Header = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#ffffff',
        boxShadow: 'none',
        transition: 'transform 0.5s ease-in-out',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <Toolbar>
        <Typography variant="h4" align="center" sx={{ flexGrow: 1, color: '#C8102E' }}>
          Cardiac Services Directory
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
