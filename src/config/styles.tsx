/**
 * Global styles object for storing reusable styles
 */
import {StyleSheet} from 'react-native';
import theme from './theme';

interface Props {
  layoutStyles: any;
  buttonStyles: any;
  textStyles: any;
  formStyles: any;
}

const buttonStyles = StyleSheet.create({
  container: {
    paddingVertical: theme.layouts.verticalPadding / 2,
    paddingHorizontal: theme.layouts.horizontalPadding,
    backgroundColor: theme.colors.white,
  },
  button: {
    width: theme.buttons.width,
    height: 54,
    backgroundColor: theme.buttons.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.buttons.horizontalPadding,
    paddingVertical: theme.buttons.verticalPadding,
    borderRadius: 2,
  },
  text: {
    color: theme.buttons.textColor,
    textAlign: 'left',
    letterSpacing: theme.buttons.letterSpacing,
    textTransform: 'none',
    fontFamily: theme.fontFamily.sans.bold,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallButton: {
    padding: 8,
    paddingHorizontal: 16,
    // marginRight: 4,
    backgroundColor: theme.colors.backgroundGray,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 54,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    borderColor: theme.colors.backgroundGray,
  },

  smallButtonText: {
    fontSize: theme.fontSizes.small,
    // letterSpacing: 0.5,
    color: theme.colors.black,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: theme.fontFamily.sans.medium,
  },

  circularButton: {
    padding: 8,
    // marginRight: 4,
    backgroundColor: theme.colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 54,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    borderColor: theme.colors.backgroundGray,
  },

  pill: {
    // marginRight: 4,
    backgroundColor: theme.colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    borderColor: theme.colors.backgroundGray,
    borderRadius: 4,
    marginRight: 10,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  darkButtonStyle: {
    width: undefined,
    paddingHorizontal: 24,
    alignSelf: 'center',
    borderRadius: 54,
  },
  lightButtonStyle: {
    width: undefined,
    paddingHorizontal: 20,
    alignSelf: 'center',
    borderRadius: 54,
    backgroundColor: theme.colors.backgroundGray,
    borderColor: theme.colors.backgroundGray,
    borderWidth: StyleSheet.hairlineWidth,
  },
  lightButtonTextStyle: {
    color: theme.colors.black,
    fontFamily: theme.fontFamily.sans.bold,
    fontSize: theme.fontSizes.small,
  },
});

const textStyles = StyleSheet.create({
  header: {
    fontFamily: theme.fontFamily.sans.extraBold,
    fontSize: theme.fontSizes.xLarge,
    lineHeight: theme.fontSizes.xLarge * 1.2,
    color: theme.colors.text,
    letterSpacing: -0.8,
  },
  headerDescription: {
    fontFamily: theme.fontFamily.sans.regular,
    fontSize: theme.fontSizes.large * 0.65,
    // textTransform: "uppercase",
    lineHeight: theme.fontSizes.large,
    color: theme.colors.textGray,
  },
  subHeader: {
    fontFamily: theme.fontFamily.sans.bold,
    fontSize: theme.fontSizes.large,
    // textTransform: "uppercase",
    lineHeight: theme.fontSizes.large * 1.25,
    color: theme.colors.text,
  },
  headerTitle: {
    color: theme.colors.black,
    fontFamily: theme.fontFamily.sans.bold,
    lineHeight: 20,
    // letterSpacing: 1,
    textTransform: 'capitalize',
  },
  smallHeader: {
    fontFamily: theme.fontFamily.sans.bold,
    fontSize: theme.fontSizes.large * 0.75,
    // textTransform: "uppercase",
    lineHeight: theme.fontSizes.large,
    color: theme.colors.text,
  },
  largeCaption: {
    fontFamily: theme.fontFamily.sans.regular,
    fontSize: theme.fontSizes.large,
    color: theme.colors.textGray,
  },
  smallCaption: {
    fontFamily: theme.fontFamily.sans.medium,
    fontSize: theme.fontSizes.small * 0.9,
    letterSpacing: 0.75,
    color: theme.colors.primary,
    textTransform: 'uppercase',
    // opacity: 0.75,
  },
  description: {
    fontFamily: theme.fontFamily.sans.regular,
    fontSize: theme.fontSizes.small,
    lineHeight: theme.fontSizes.small * 1.4,
    color: theme.colors.textGray,
    letterSpacing: 0.125,
  },
  link: {
    fontFamily: theme.fontFamily.sans.medium,
    fontSize: theme.fontSizes.small,
    lineHeight: theme.fontSizes.small * 1.4,
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
  caption: {
    color: theme.colors.black,
    fontSize: theme.fontSizes.small,
    fontFamily: theme.fontFamily.sans.medium,
    lineHeight: 20,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  default: {
    color: theme.colors.black,
    fontSize: theme.fontSizes.medium,
    fontFamily: theme.fontFamily.sans.medium,
    lineHeight: theme.fontSizes.medium * 1.4,
  },
  bold: {
    fontFamily: theme.fontFamily.sans.bold,
  },
  leftAlign: {
    textAlign: 'left',
  },
  rightAlign: {
    textAlign: 'right',
  },
  centerAlign: {
    textAlign: 'center',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
});

const formStyles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    position: 'relative',
    minHeight: theme.layouts.inputFieldHeight + 20,
  },
  wrapperStyle: {
    width: '100%',
    marginBottom: 4,
    position: 'relative',
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  fieldColumn: {
    flex: 1,
  },
  inputStyle: {
    height: theme.fields.inputHeight,
    fontFamily: theme.fontFamily.sans.medium,
    fontSize: theme.fields.inputFontSize,
    borderBottomWidth: StyleSheet.hairlineWidth,
    color: theme.colors.black,
    backgroundColor: theme.colors.white,
    borderBottomColor: theme.colors.borderGray,
    width: '100%',
    borderRadius: 0,
    paddingHorizontal: 0,
  },
  labelStyle: {
    textTransform: 'uppercase',
    position: 'absolute',
    color: theme.colors.black,
    fontFamily: theme.fontFamily.sans.medium,
    fontSize: theme.fields.inputLabelSize,
    letterSpacing: 0.5,
    display: 'none',
    zIndex: 10,
    marginTop: -6,
    backgroundColor: theme.colors.white,
    width: '100%',
  },
  visibleLabelStyle: {
    textTransform: 'uppercase',
    color: theme.colors.textGray,
    fontFamily: theme.fontFamily.sans.medium,
    fontSize: theme.fields.inputLabelSize,
    letterSpacing: 0.5,
    zIndex: 10,
    marginTop: -6,
    backgroundColor: theme.colors.white,
    width: '100%',
  },
  errorMessageStyle: {
    fontFamily: theme.fontFamily.sans.regular,
    fontSize: theme.fontSizes.small * 0.8,
    color: theme.colors.red,
    marginBottom: 8,
  },
  maskStyle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  largeText: {
    fontSize: theme.fontSizes.xxLarge,
    fontFamily: theme.fontFamily.sans.extraBold,
    lineHeight: theme.fontSizes.xxLarge * 1.5,
    flexWrap: 'nowrap',
    textAlign: 'center',
  },
  separatorStyle: {
    height: StyleSheet.hairlineWidth,
    borderColor: theme.colors.borderGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginLeft: theme.layouts.horizontalPadding,
  },
  listStyle: {},
  listItemStyle: {
    paddingHorizontal: theme.layouts.horizontalPadding,
    paddingVertical: theme.layouts.verticalPadding / 1.5,
    flex: 1,
  },
  listItemTitleStyle: {
    fontFamily: theme.fontFamily.sans.medium,
    fontSize: theme.fontSizes.medium,
    color: theme.colors.black,
  },
  listItemCaptionStyle: {
    fontFamily: theme.fontFamily.sans.regular,
    fontSize: theme.fontSizes.small,
    lineHeight: theme.fontSizes.small * 1.4,
    color: theme.colors.textGray,
    marginTop: 6,
    letterSpacing: 0.25,
  },
  modalPageStyle: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  modalHeaderStyle: {
    // flex: 1,
    height: theme.layouts.headerHeight,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapperStyle: {
    backgroundColor: theme.colors.white,
    borderBottomColor: theme.colors.borderGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: theme.layouts.verticalPadding / 2,
    paddingHorizontal: theme.layouts.horizontalPadding,
  },
  searchInputStyle: {
    height: theme.fields.inputHeight - 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.lightGray,
    fontFamily: theme.fontFamily.sans.regular,
    fontSize: theme.fontSizes.medium,
    color: theme.colors.black,
    borderRadius: 24,
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: theme.layouts.horizontalPadding,
  },
  modalTitleStyle: {
    color: theme.colors.black,
    fontFamily: theme.fontFamily.sans.bold,
    lineHeight: 20,
    // letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  cancelTextStyle: {
    position: 'absolute',
    right: 0,
  },
});

const layoutStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  container: {
    paddingHorizontal: theme.layouts.horizontalPadding,
  },
  page: {
    flex: 1,
    paddingHorizontal: theme.layouts.horizontalPadding,
    backgroundColor: theme.colors.background,
  },
  scrollPage: {
    justifyContent: 'flex-start',
    paddingHorizontal: theme.layouts.horizontalPadding,
    minHeight: '100%',
    paddingVertical: theme.layouts.verticalPadding / 2,
    backgroundColor: theme.colors.background,
    // borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.borderGray,
  },
  header: {
    height: theme.layouts.headerHeight,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.borderGray,
  },
  headerContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 4,
  },
  backgroundButton: {
    minWidth: theme.layouts.iconSize * 2,
    // height: theme.layouts.headerHeight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 24,
    backgroundColor: theme.colors.lightGray,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: theme.layouts.iconSize * 2,
    height: theme.layouts.headerHeight,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightPosition: {
    position: 'absolute',
    right: 0,
  },
  leftPosition: {
    position: 'absolute',
    left: 0,
  },
  clickSection: {
    // backgroundColor: theme.colors.backgroundGray,
    // paddingHorizontal: theme.layouts.horizontalPadding,
    paddingVertical: theme.layouts.verticalPadding / 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: theme.colors.borderGray,
  },
  shadedClickSection: {
    backgroundColor: theme.colors.backgroundGray,
    paddingHorizontal: theme.layouts.horizontalPadding,
    borderBottomWidth: 0,
  },
  borderedClickSection: {
    paddingHorizontal: theme.layouts.horizontalPadding,
    borderWidth: 1,
  },
  horizontalClickRow: {
    paddingTop: theme.layouts.verticalPadding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: -theme.layouts.horizontalPadding / 2,
  },
  horizontalClickSection: {
    borderWidth: 1,
    borderColor: theme.colors.borderGray,
    flex: 1,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedClickSection: {
    borderWidth: 2,
    borderColor: theme.colors.black,
  },
  cardImage: {
    width: 32,
    height: 32,
  },
  smallCardImage: {
    width: 24,
    height: 24,
  },
  iconRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    borderColor: theme.colors.borderGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

const styles: Props = {
  layoutStyles,
  buttonStyles,
  textStyles,
  formStyles,
};

export default styles;
