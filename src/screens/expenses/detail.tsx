/* eslint-disable react-native/no-inline-styles */

import React, {useContext, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import {Layout, Spacer} from '@Components/usefulComponents';
import {IndexProps} from './index';
import {useNavigation} from '@react-navigation/native';
import theme from '@Config/theme';
import {useKeyboard} from '@Libs/hooks';
import {
  useUpdateExpenseMutation,
  useUpdateWithReceiptMutation,
} from '@Features/expense/expense-api-slice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import {AuthContext} from 'src/providers/mainProvider';
import {launchImageLibrary} from 'react-native-image-picker';
import Settings from '@Config/settings';

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
  const [uploading, setuploading] = useState(false);
  const {item} = initialValues;
  const [itemValue, setItem] = useState(item);
  const {t} = useContext(AuthContext) as any;
  const [updateWithReceipt] = useUpdateWithReceiptMutation();

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

  const handleChoosePhoto = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
      });
      if (result.assets) {
        setuploading(true);
        const photo: any = result?.assets[0];
        console.log('-----inside photo picket', photo);
        const res = createFormData(photo);
        const receiptResult: any = await updateWithReceipt({id, res});
        setuploading(false);
        console.log('--------------------------------', receiptResult);
        setItem(receiptResult.data);
      }
    } catch (e) {
      setuploading(false);
    }
  };

  const createFormData = (photo: {
    uri: any;
    fileName: string;
    type: string;
  }) => {
    const data = new FormData() as any;
    data.append('receipt', {
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      name: photo.fileName,
      type: photo.type,
    });
    return data;
  };

  const {user, comment, id, merchant, amount, receipts} =
    itemValue && itemValue;

  console.log('-->', receipts);

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
        <Text style={styles.title}>{t('header')}</Text>
        <Spacer height={20} />
        <ItemBox title={t('description')} description={t('description_text')} />
        <ItemBox
          title={'Amount'}
          description={`${amount.currency} ${amount.value}`}
        />
        <ItemBox title={t('merchant')} description={merchant} />
        <ItemBox title={'Contact'} description={`${user.first} ${user.last}`} />
        <Spacer height={20} />
        {comment.length > 0 && (
          <ItemBox title={t('comment')} description={comment} />
        )}
        <ScrollView horizontal>
          {receipts &&
            receipts.map(
              (receipt: any, index: React.Key | null | undefined) => {
                return (
                  <View key={index} style={styles.receiptImage}>
                    <Image
                      style={styles.receiptImageView}
                      source={{uri: `${Settings.uri}${receipt.url}`}}
                    />
                  </View>
                );
              },
            )}
        </ScrollView>
        <View style={styles.pressableContainer}>
          <Pressable
            style={({pressed}) => [
              styles.pressable,
              {opacity: pressed ? 0.5 : 1},
            ]}
            onPress={() => setVisible(true)}>
            <Text style={styles.total}>{t('comment')}</Text>
          </Pressable>
          <Pressable
            disabled={uploading}
            style={[styles.pressable, styles.right]}
            onPress={() => handleChoosePhoto()}>
            <Text style={[styles.total, styles.rightText]}>
              {' '}
              {uploading ? 'Uploading' : t('upload')}
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
                  textAlignVertical={'top'}
                  multiline={true}
                />
              </View>
              <Spacer height={5} />
              <Pressable
                style={[styles.send]}
                disabled={loading}
                onPress={() => updateWithComment(id)}>
                <Text style={[styles.total]}>
                  {loading ? 'Sending...' : t('send')}
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
