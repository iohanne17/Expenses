/* eslint-disable react-native/no-inline-styles */

import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, View, FlatList, TextInput} from 'react-native';
import {Layout, EmptyList, ItemComponent} from '@Components/usefulComponents';
import {IndexProps} from './index';
import {useDebounce} from '@Libs/hooks';
import Fuse from 'fuse.js';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import theme from '@Config/theme';

const ListScreen = ({onChangePage, data = []}: IndexProps) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const navigation = useNavigation() as any;
  const debouncedSearchInput = useDebounce(searchInput, 10);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false, // applied here
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: theme.colors.white,
      },
      title: '',
      headerLeft: null,
    });
  }, [navigation]);

  const getOptions = useCallback(
    ({searchInput: input = ''}) => {
      const fuse = new Fuse(data, {
        keys: ['name', 'id'],
        includeScore: true,
        useExtendedSearch: true,
      });

      if (_.isEmpty(input)) {
        setFilteredData(data);
        return;
      }

      const res = fuse.search(`'${input}`).map(elem => elem.item); // items that include the particular phrase
      setFilteredData(res);
    },
    [data],
  );

  // useEffect(() => {
  //   setFilteredData(data);
  // }, [data]);

  useEffect(() => {
    if (debouncedSearchInput) {
      getOptions({searchInput: debouncedSearchInput});
    } else {
      setFilteredData(data);
    }
  }, [debouncedSearchInput, getOptions, data]);

  const onInputChanged = (val: string) => {
    setSearchInput(val);
  };

  const onItemPress = (item: any) => {
    onChangePage && onChangePage('detail', {item});
  };

  if (!filteredData || _.isEmpty(filteredData)) {
    return <EmptyList />;
  }

  return (
    <Layout style={styles.mainBody}>
      <View style={[styles.mainBody, {marginTop: 80, paddingHorizontal: 16}]}>
        <FlatList
          data={[]}
          extraData={{filteredData}}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item?.id} + "-todo`}
          ListHeaderComponent={() => {
            return (
              <View>
                <TextInput
                  value={searchInput}
                  onChangeText={onInputChanged}
                  style={{flex: 1, height: 48}}
                />
              </View>
            );
          }}
          ListEmptyComponent={() => {
            return <EmptyList />;
          }}
          renderItem={({item, index}) => {
            return (
              <ItemComponent
                item={item}
                index={index}
                onItemPress={onItemPress}
              />
            );
          }}
        />
      </View>
    </Layout>
  );
};
export default ListScreen;

const styles = StyleSheet.create({
  mainBody: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 18,
    textTransform: 'capitalize',
    color: 'white',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    textTransform: 'none',
    color: 'white',
  },
  price: {
    fontSize: 14,
    fontWeight: '400',
    textTransform: 'none',
    color: 'white',
    lineHeight: 18,
  },
  total: {
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'none',
    color: 'white',
  },
  item: {
    justifyContent: 'center',
    // alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'white',
    padding: 10,
    marginBottom: 8,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    resizeMode: 'cover',
    marginRight: 6,
  },
  pressable: {
    backgroundColor: 'white',
    borderRadius: 21,
    padding: 4,
    marginRight: 10,
  },
  pressableText: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
});
