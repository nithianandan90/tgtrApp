import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FeedPost from '../../components/FeedPost/FeedPost';
import {useQuery} from '@apollo/client';
import {listDeals} from './queries';
import {ListDealsQuery, ListDealsQueryVariables} from '../../API';

const HomeScreen = () => {
  const {data, loading, error, refetch} = useQuery<
    ListDealsQuery,
    ListDealsQueryVariables
  >(listDeals);

  console.log(JSON.stringify(data, null, 2));

  const events = (data?.listDeals?.items || []).filter(item => !item?._deleted);
  console.log(events);

  return (
    <View>
      <FlatList
        data={events}
        renderItem={({item}) => item && <FeedPost event={item} />}
        onRefresh={() => refetch()}
        refreshing={loading}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
