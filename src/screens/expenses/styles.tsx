import {StyleSheet} from 'react-native';
import theme from '@Config/theme';

const styles = StyleSheet.create({
  receiptImageView: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  receiptImage: {
    width: 80,
    height: 80,
    marginHorizontal: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: theme.colors.borderGray,
    borderRadius: 10,
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
  total: {
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'none',
    color: 'white',
  },
  textInput: {
    flex: 1,
    height: 80,
    textAlignVertical: 'top',
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

export default styles;
