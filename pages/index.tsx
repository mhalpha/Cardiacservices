
import { NextPage } from 'next';
import Layout from '../components/Layout';
import ServiceList from '../components/ServiceList';

const Home: NextPage = () => {
  return (
    <Layout>
      <ServiceList />
    </Layout>
  );
};

export default Home;
