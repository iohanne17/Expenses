/* eslint-disable react-native/no-inline-styles */

import React, {useContext, useLayoutEffect} from 'react';
import {View, Text, Pressable} from 'react-native';
import {Layout} from '@Components/usefulComponents';
import {IndexProps} from './index';
import theme from '@Config/theme';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from 'src/providers/mainProvider';
import styles from './styles';

const LanguageScreen = ({onChangePage}: IndexProps) => {
  const navigation = useNavigation() as any;
  const {currentLanguage, changeLanguage, t} = useContext(AuthContext) as any;

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

  const switchLanguage = () => {
    if (currentLanguage === 'en') {
      changeLanguage('fr');
    } else {
      changeLanguage('en');
    }
  };

  const lang = currentLanguage === 'en' ? 'English' : 'French';

  return (
    <Layout>
      <View style={[styles.mainBody]}>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={styles.title}> {t('select')}</Text>
          <Text
            style={
              styles.descriptionText
            }>{`Your current lanugage is ${lang}`}</Text>
          <View style={styles.pressableContainer}>
            <Pressable
              style={({pressed}) => [
                styles.pressable,
                {opacity: pressed ? 0.5 : 1},
              ]}
              onPress={() => switchLanguage()}>
              <Text style={styles.total}>Change Language</Text>
            </Pressable>
            <Pressable
              style={[styles.pressable, styles.right]}
              onPress={() => onChangePage && onChangePage('main')}>
              <Text style={[styles.total, styles.rightText]}> Proceed</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Layout>
  );
};
export default LanguageScreen;
