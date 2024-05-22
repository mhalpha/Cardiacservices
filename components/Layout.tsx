
import { FC, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        {children}
      </Container>
    </>
  );
};

export default Layout;
