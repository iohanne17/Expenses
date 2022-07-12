/* eslint-disable react-native/no-inline-styles */

import React, {useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Layout, Spacer} from '@Components/usefulComponents';
import {IndexProps} from './index';
import {useNavigation} from '@react-navigation/native';
import theme from '@Config/theme';
import {useKeyboard} from '@Libs/hooks';
import {useUpdateExpenseMutation} from '@Features/expense/expense-api-slice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface ItemBoxProps {
  title: string;
  description: string;
}

const ItemBox = ({title, description}: ItemBoxProps) => {
  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.description}>{title}</Text>
      <Spacer height={5} />
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

const DetailScreen = ({onChangePage, initialValues}: IndexProps) => {
  const navigation = useNavigation() as any;
  const [input, setInput] = useState('');
  const [visible, setVisible] = useState(false);
  const height = useKeyboard();
  const [updateExpense] = useUpdateExpenseMutation();
  const [loading, setLoading] = useState(false);
  const {item} = initialValues;
  const [itemValue, setItem] = useState(item);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <Pressable
            style={{paddingRight: 16}}
            onPress={() => {
              onChangePage && onChangePage('main', {});
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

  const updateWithComment = async (id: string) => {
    try {
      setLoading(true);
      if (input) {
        const obj = {
          id,
          comment: input,
        };
        const result = await updateExpense(obj);
        const {data} = result as any;
        console.log('--i am refined--', data);
        setItem(data);
        setLoading(false);
        setVisible(false);
      }
      setLoading(false);
    } catch (e) {
      console.log('error==>', e);
      setLoading(false);
      setVisible(false);
    }
  };

  const {user, comment, id, merchant, amount} = itemValue && itemValue;

  return (
    <Layout>
      <View style={[styles.mainBody]}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{
              uri: 'https://source.unsplash.com/user/c_v_r',
            }}
            style={[styles.image]}
          />
        </View>
        <Spacer height={15} />
        <Text style={styles.title}>{'Beautiful Imagery at Munich'}</Text>
        <Spacer height={20} />
        <ItemBox
          title={'Description'}
          description={
            'This item can be purchased by free will. It is duely give by the store owner.'
          }
        />
        <ItemBox
          title={'Amount'}
          description={`${amount.currency} ${amount.value}`}
        />
        <ItemBox title={'Merchant'} description={merchant} />
        <ItemBox title={'Contact'} description={`${user.first} ${user.last}`} />
        <Spacer height={20} />
        {comment.length > 0 && (
          <ItemBox title={'Comment'} description={comment} />
        )}
        <View style={styles.pressableContainer}>
          <Pressable
            style={({pressed}) => [
              styles.pressable,
              {opacity: pressed ? 0.5 : 1},
            ]}
            onPress={() => setVisible(true)}>
            <Text style={styles.total}>Comment</Text>
          </Pressable>
          <Pressable style={[styles.pressable, styles.right]}>
            <Text style={[styles.total, styles.rightText]}>
              {' '}
              Upload Receipt
            </Text>
          </Pressable>
        </View>
      </View>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <Pressable style={{flex: 1}} onPress={() => setVisible(false)} />
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View
              style={{
                width: '100%',
                backgroundColor: theme.colors.white,
                alignItems: 'center',
                padding: 16,
              }}>
              <Text style={styles.comment}>Add your comment</Text>
              <Spacer height={12} />
              <View style={styles.inputWrapper}>
                <TextInput
                  value={input}
                  onChangeText={val => setInput(val)}
                  style={styles.textInput}
                />
              </View>
              <Spacer height={5} />
              <Pressable
                style={[styles.send]}
                disabled={loading}
                onPress={() => updateWithComment(id)}>
                <Text style={[styles.total]}>
                  {loading ? 'Sending...' : 'Send'}
                </Text>
              </Pressable>
              <Spacer height={20 + height} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </Layout>
  );
};
export default DetailScreen;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: theme.colors.textGray,
    borderRadius: 25,
    paddingLeft: 8,
  },
  mainBody: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.layouts.horizontalPadding,
  },
  descriptionContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 5,
    borderBottomColor: theme.colors.textGray,
    paddingVertical: 10,
  },
  textInput: {
    flex: 1,
    height: 48,
  },
  comment: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    textTransform: 'capitalize',
    color: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 24,
    textTransform: 'capitalize',
    color: 'black',
  },
  description: {
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'none',
    color: 'black',
    opacity: 0.7,
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '400',
    textTransform: 'none',
    color: theme.colors.textGray,
    lineHeight: 18,
  },
  total: {
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'none',
    color: 'white',
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  pressable: {
    borderRadius: 25,
    padding: 16,
    marginHorizontal: 10,
    backgroundColor: theme.colors.blue,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  right: {
    backgroundColor: theme.colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.blue,
  },
  rightText: {
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'none',
    color: theme.colors.black,
  },
  send: {
    borderRadius: 25,
    backgroundColor: theme.colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 16,
    width: '100%',
  },
});
