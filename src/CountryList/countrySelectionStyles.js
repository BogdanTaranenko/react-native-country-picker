import { I18nManager, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    height: 83,
    backgroundColor: '#f4f4f4',
  },
  searchView: {
    flex: 1,
    height: '50%',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: '#bdbdbd30',
    borderWidth: 0,
    borderRadius: 6,
    margin: 20,
    ...(!I18nManager.isRTL ? { marginRight: 0 } : { marginLeft: 0 }),
    alignItems: 'center',
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 10,
    position: 'absolute',
  },
  closeIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 15,
  },
  textInput: {
    ...(!I18nManager.isRTL ? { flex: 1 } : {}),
    paddingHorizontal: 36,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  sectionContainer: {
    height: 36,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
  },
  sectionHeader: {
    marginHorizontal: 20,
    fontSize: 15,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontWeight: 'bold',
    color: '#2d292670',
  },
  itemContainer: {
    height: 45,
    justifyContent: I18nManager.isRTL ? 'flex-start' : 'flex-start',
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#444444',
    // textAlign: 'left',
  },
  itemSeparator: {
    height: 1,
    marginLeft: 10,
    backgroundColor: '#bdbdbd30',
    marginBottom: 0,
  },
  emoji: {
    marginLeft: 10,
    marginRight: 10
  },
});
