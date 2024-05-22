
import { NextPage } from 'next';
import Layout from '../components/Layout';
import StoreList from '../components/StoreList';

const Home: NextPage = () => {
  return (
    <Layout>
      <StoreList />
    </Layout>
  );
};

export default Home;
