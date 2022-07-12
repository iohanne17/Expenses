/* eslint-disable react-native/no-inline-styles */

import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, View, FlatList, TextInput, Pressable} from 'react-native';
import {Layout, EmptyList, ItemComponent} from '@Components/usefulComponents';
import {IndexProps} from './index';
import {useDebounce} from '@Libs/hooks';
import Fuse from 'fuse.js';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import theme from '@Config/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ListScreen = ({onChangePage, data = []}: IndexProps) => {
  const [filteredData, setFilteredData] = useState(data);
  const [searchInput, setSearchInput] = useState('');
  const navigation = useNavigation() as any;
  const debouncedSearchInput = useDebounce(searchInput, 10);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <Pressable
            style={{paddingRight: 16}}
            onPress={() => {
              onChangePage && onChangePage('lang', {});
            }}>
            <MaterialCommunityIcons
              size={24}
              name={'chevron-left'}
              color={theme.colors.black}
            />
          </Pressable>
        );
      },
    });
  }, [navigation, onChangePage]);

  const getOptions = useCallback((input: any) => {
    const fuse = new Fuse(filteredData, {
      keys: ['user.first', 'user.last', 'id', 'merchant'],
      includeScore: true,
      useExtendedSearch: true,
    });

    if (_.isEmpty(input)) {
      setFilteredData(data);
      return;
    }

    const res = fuse.search(`'${input}`).map(elem => elem.item); // items that include the particular phrase
    setFilteredData(res);
  }, []);

  useEffect(() => {
    if (debouncedSearchInput) {
      getOptions(debouncedSearchInput);
    }
  }, [debouncedSearchInput, getOptions]);

  const onInputChanged = (val: string) => {
    setSearchInput(val);
  };

  const onItemPress = (item: any) => {
    onChangePage && onChangePage('detail', {item});
  };

  return (
    <Layout>
      <View style={[styles.mainBody]}>
        <FlatList
          data={filteredData}
          extraData={{filteredData}}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item?.id} + "-todo`}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  backgroundColor: theme.colors.backgroundGray,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: theme.colors.borderColor,
                  flexDirection: 'row',
                  borderRadius: 25,
                  paddingLeft: 10,
                }}>
                <TextInput
                  value={searchInput}
                  onChangeText={onInputChanged}
                  placeholder="Search"
                  autoFocus={true}
                  style={styles.textInput}
                />
              </View>
            );
          }}
          ListEmptyComponent={() => {
            return <EmptyList />;
          }}
          renderItem={({item}) => {
            return <ItemComponent item={item} onItemPress={onItemPress} />;
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
    paddingHorizontal: theme.layouts.horizontalPadding,
  },
  textInput: {
    flex: 1,
    height: 48,
  },
});
