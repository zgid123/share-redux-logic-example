import * as React from 'react';

import { FC, useCallback, useEffect } from 'react';
import { useDispatch } from '@share-redux/redux-common';
import { useNavigation } from '@react-navigation/native';
import { ListRenderItem, SafeAreaView } from 'react-native';
import { clearAuth } from '@share-redux/redux-common/lib/common/auth/slice';
import { Layout, Text, List, ListItem, Button } from '@ui-kitten/components';
import { useRetrieveAuthProfile } from '@share-redux/redux-common/lib/common/auth/selectors';

import Preloader from 'components/atoms/Preloader';
import { fetchProducts } from 'store/products/slice';
import { combine } from 'utils/formatter/formatString';
import { IProductProps } from 'store/products/slice.interface';
import {
  useRetrieveProducts,
  useRetrieveLoadingState,
} from 'store/products/selectors';

const Home: FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const products = useRetrieveProducts();
  const loadingState = useRetrieveLoadingState();
  const profile = useRetrieveAuthProfile();

  const logout = useCallback(() => {
    dispatch(clearAuth());
    navigation.navigate('Home');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingState === 'loading') {
    return <Preloader />;
  }

  const renderItem: ListRenderItem<IProductProps> = ({ item }) => (
    <ListItem title={item.name} description={item.detail} />
  );

  return (
    <SafeAreaView>
      <Layout>
        <Text>Hello {combine(profile.firstName, profile.lastName)}</Text>
        <Button onPress={logout}>Logout</Button>
        <List data={products} renderItem={renderItem} />
      </Layout>
    </SafeAreaView>
  );
};

export default Home;
