/* eslint-disable react-native/no-inline-styles */
/**
 * layouts.js
 * Layout components for the entire application.
 */
import React, {Fragment, ReactNode, ReactElement} from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  ActivityIndicator,
  ViewStyle,
  StyleProp,
  TextStyle,
  SafeAreaView,
  Image,
  ImageStyle,
} from 'react-native';
import theme from '@Config/theme';
import globalStyles from '@Config/styles';
import {format, parseISO} from 'date-fns';

const IMG_SIZE = 50;

interface LayoutProps {
  style?: any;
  children: ReactNode | ReactElement | JSX.Element;
}
interface ButtonProps {
  buttonStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  children: ReactNode | ReactElement | JSX.Element;
  onPress: (...args: any) => void;
  disabled?: boolean;
  isLoading?: boolean;
}
interface SpacerProps {
  width?: number;
  height?: number;
  styles?: StyleProp<ViewStyle>;
}

export interface ItemProps {
  item: any;
  onItemPress: (item: any) => void;
  customPressableStyle?: StyleProp<ViewStyle>;
  customeInnerViewStyle?: StyleProp<ViewStyle>;
  customImageWrapper?: StyleProp<ViewStyle>;
  customImageStyle?: StyleProp<ImageStyle>;
  customCommentStyle?: TextStyle;
  customMerchantStyle?: TextStyle;
  customAmountContainerStyle?: StyleProp<ViewStyle>;
  customAmountStyle?: StyleProp<TextStyle>;
}

export interface EmptyListProps {
  title?: string;
  customEmptyView?: ViewStyle;
  customEmptyText?: TextStyle;
}

const Layout = ({style, children}: LayoutProps) => {
  const layoutStyle = StyleSheet.compose(globalStyles.layoutStyles.page, style);

  return (
    <SafeAreaView style={layoutStyle}>
      <Fragment>{children}</Fragment>
    </SafeAreaView>
  );
};

const Button = ({
  buttonStyles = {},
  textStyles = {},
  children,
  onPress,
  disabled,
  isLoading,
  ...props
}: ButtonProps) => {
  const buttonStyle = StyleSheet.compose(
    {...globalStyles.buttonStyles.button, backgroundColor: theme.colors.blue},
    buttonStyles,
  );
  const textStyle = StyleSheet.compose(
    globalStyles.buttonStyles.text,
    textStyles,
  );
  const content =
    typeof children === 'string' ? (
      <Text style={textStyle}>{children}</Text>
    ) : (
      children
    );
  const disabledStyle = disabled ? {opacity: 0.25} : {};

  const _onPress = () => {
    if (!disabled) {
      onPress && onPress();
    }
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={_onPress}
      style={[buttonStyle, disabledStyle]}
      {...props}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={theme.colors.white} />
      ) : (
        content
      )}
    </Pressable>
  );
};

const Spacer = ({styles = {}, width, height, ...props}: SpacerProps) => {
  return <View style={[styles, {width, height}]} {...props} />;
};

const Loading = ({}) => {
  return (
    <Layout style={[globalStyles.layoutStyles.wrapper, styles.layout]}>
      <ActivityIndicator
        color={theme.colors.primary}
        size={'large'}
        animating={true}
      />
    </Layout>
  );
};

const ErrorMessage = ({}) => {
  return (
    <Layout style={[globalStyles.layoutStyles.wrapper, styles.layout]}>
      <Text style={[globalStyles.textStyles.smallCaption]}>
        {' '}
        Error Fetching data{' '}
      </Text>
    </Layout>
  );
};

const EmptyList = ({
  title = 'Your expense list is empty',
  customEmptyView,
  customEmptyText,
}: EmptyListProps) => {
  return (
    <View style={[styles.emptyView, customEmptyView]}>
      <Text style={[styles.empty, customEmptyText]}>{title}</Text>
    </View>
  );
};

const ItemComponent = ({
  item,
  onItemPress,
  customPressableStyle,
  customeInnerViewStyle,
  customImageWrapper,
  customImageStyle,
  customCommentStyle,
  customMerchantStyle,
  customAmountContainerStyle,
  customAmountStyle,
}: ItemProps) => {
  const {user, comment, date, id, merchant, index, amount} = item;
  return (
    <Pressable
      style={[styles.itemPressable, customPressableStyle]}
      onPress={() => onItemPress && onItemPress(item)}
      key={`${index}${id}`}>
      <View style={[styles.itemPressableInner, customeInnerViewStyle]}>
        <View style={[styles.imageWrapper, customImageWrapper]}>
          <Image
            source={{
              uri: 'https://source.unsplash.com/user/c_v_r',
            }}
            style={[styles.image, customImageStyle]}
          />
        </View>
        <Spacer width={10} />
        <View style={{flex: 1}}>
          <Text>
            {user.first} {user.last}
          </Text>
          <Text style={[styles.comment, customCommentStyle]}>{comment}</Text>
          <Spacer height={10} />
          <Text
            style={[
              styles.merchant,
              customMerchantStyle,
            ]}>{`Sold by ${merchant}`}</Text>
        </View>
        <View style={[styles.amountContainer, customAmountContainerStyle]}>
          <Text
            style={[
              styles.amount,
              customAmountStyle,
            ]}>{`${amount.currency}${amount.value}`}</Text>
          <Text style={styles.date}>
            {format(parseISO(date), 'MMM d').toUpperCase()}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  emptyView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 8,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingStyle: {
    flexDirection: 'row',
  },
  empty: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  image: {
    height: IMG_SIZE,
    width: IMG_SIZE,
    borderRadius: IMG_SIZE / 2,
    resizeMode: 'cover',
  },
  imageWrapper: {
    height: IMG_SIZE,
    width: IMG_SIZE,
    borderRadius: IMG_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemPressable: {
    marginVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.borderGray,
    paddingBottom: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 18,
    textTransform: 'capitalize',
  },
  merchant: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 12,
    color: theme.colors.black,
    textTransform: 'capitalize',
  },
  comment: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: theme.colors.textGray,
    textTransform: 'none',
  },
  amount: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 12,
    color: theme.colors.black,
    textTransform: 'uppercase',
  },
  itemPressableInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountContainer: {
    alignSelf: 'flex-start',
    paddingTop: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 58,
  },
  date: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 18,
    color: theme.colors.textGray,
    textTransform: 'uppercase',
  },
});

export {
  Layout,
  Button,
  Spacer,
  Loading,
  ErrorMessage,
  EmptyList,
  ItemComponent,
};
