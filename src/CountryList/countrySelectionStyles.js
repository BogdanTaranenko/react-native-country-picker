import { StyleSheet } from 'react-native';

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
    flexDirection: 'row',
    backgroundColor: '#bdbdbd30',
    borderWidth: 0,
    borderRadius: 6,
    margin: 20,
    alignItems: 'center',
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 10,
  },
  textInput: {
    flex: 1,
  },
  sectionContainer: {
    height: 36,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
  },
  sectionHeader: {
    marginLeft: 20,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2d292670',
  },
  itemContainer: {
    height: 45,
    backgroundColor: '#ffffff',
    justifyContent: 'flex-end',
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#444444',
    flex: 1,
  },
  itemSeparator: {
    height: 1,
    marginLeft: 10,
    backgroundColor: '#bdbdbd30',
    marginBottom: 0,
  },
  emoji: {
    marginLeft: 10,
    marginRight: 5
  },
});
