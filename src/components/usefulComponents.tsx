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
} from 'react-native';
import theme from '@Config/theme';
import globalStyles from '@Config/styles';

const IMG_SIZE = 40;

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
}

export interface EmptyListProps {
  title?: string;
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

const EmptyList = ({title = 'Your expense list is empty'}: EmptyListProps) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <Text style={styles.empty}>{title}</Text>
    </View>
  );
};

const ItemComponent = ({item, onItemPress}: ItemProps) => {
  const {user, comment, date, category, id, merchant, index} = item;
  console.log('--', user);
  return (
    <Pressable
      onPress={() => onItemPress && onItemPress(item)}
      key={`${index}${id}`}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: 'https://source.unsplash.com/user/c_v_r',
            }}
            style={[styles.image]}
          />
        </View>
        <View>
          <Text>{`Purchased from ${merchant}`}</Text>
          <Text>{date}</Text>
          <Text>{comment}</Text>
          <Text>{category}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
  imageWrapper: {
    height: IMG_SIZE,
    width: IMG_SIZE,
    borderRadius: IMG_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
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
