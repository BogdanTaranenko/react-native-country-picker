import React, { Fragment } from 'react';
import {
  View, TextInput, Image, SectionList, Text, TouchableOpacity, InteractionManager,
} from 'react-native';
import { SearchIcon, CloseIcon, countries, currencyCountries } from './Constants';
import styles from './countrySelectionStyles';

const ItemView = (props) => {
  let textToRender = props.textToRender ? props.textToRender(props.item) : props.item.name
  if (props.showCallingCode) {
    textToRender = textToRender + ` (+${props.item.phone})`
  }
  if (props.showCurrency) {
    textToRender = textToRender + ` (${props.item.currency})`
  }

  return (
    <View style={[styles.itemContainer, props.itemContainerStyles]}>
      <TouchableOpacity style={[styles.itemTextContainer, props.itemTextContainerStyles]} onPress={() => props.onSelect(props.item)}>
        <Text style={[styles.emoji, props.itemEmojiStyles]}>{props.item.emoji}</Text>
        <Text numberOfLines={1} style={[styles.itemText, props.itemTextStyles]}>{textToRender}</Text>
      </TouchableOpacity>
      <View style={styles.itemSeparator} />
    </View>
  );
};

const SectionHeader = params => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionHeader}>{params.title}</Text>
  </View>
);

export default class CountrySelection extends React.Component {

  static defaultProps = {
    showSearch: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      sections: [],
    };
    this.searchInput = null
  }

  componentDidMount () {
    const { shouldFocusOnMount } = this.props
    this.generateSectionData(this.dataSource);
    if (shouldFocusOnMount && this.searchInput) {
      InteractionManager.runAfterInteractions(() => {
        this.searchInput.focus()
      });
    }
  }

  get dataSource () {
    const { showCurrency, countryCodesWhiteList } = this.props
    const dataSource = showCurrency ? currencyCountries: countries
    if (!countryCodesWhiteList || !countryCodesWhiteList.length) {
      return dataSource
    }
    return dataSource.filter(country => countryCodesWhiteList.includes(country.code))
  }

  onChangeSearchText = (text) => {
    const filtered = this.dataSource.filter(country => {
      return (
        country.name.toLowerCase().indexOf(text.toLowerCase()) > - 1 ||
        country.currency.toLowerCase().indexOf(text.toLowerCase()) > - 1
      )
    });
    this.generateSectionData(filtered);
  }


  generateSectionData = (countryList) => {
    const sections = [];
    const sectionHeaders = countryList.map(data => data.name.charAt(0));
    const uniqueHeaders = Array.from(new Set(sectionHeaders));

    uniqueHeaders.forEach((item) => {
      const filtered = countryList.filter(country => country.name.charAt(0) === item);
      sections.push({ title: item, data: filtered });
    });
    this.setState({ sections });
  }

  render() {
    const {
      showSearch,
      searchContainerStyles,
      searchTextInputProps,
      searchTextInputStyles,
      showCallingCode,
      showCurrency,
      onSelect,
      onClose,
      containerStyles,
      renderItem,
      itemContainerStyles,
      itemTextContainerStyles,
      itemEmojiStyles,
      itemTextStyles,
      emptyPlaceholderText,
    } = this.props;
    const { sections } = this.state;

    return (
      <View style={[styles.container, containerStyles]}>
        <View style={[styles.searchContainer, searchContainerStyles]}>
          {showSearch ? (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
              <View style={styles.searchView}>
                <Image source={SearchIcon} style={styles.searchIcon} />
                <TextInput
                  blurOnSubmit={false}
                  ref={(input) => this.searchInput = input}
                  style={[styles.textInput, searchTextInputStyles]}
                  enablesReturnKeyAutomatically
                  onChangeText={text => this.onChangeSearchText(text)}
                  {...searchTextInputProps}
                />
              </View>
              <TouchableOpacity hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }} onPress={onClose}>
                <Image source={CloseIcon} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        {sections && sections.length ? (
          <SectionList
            keyboardShouldPersistTaps='always'
            renderItem={({ item, index, section }) => {
              if (renderItem) return renderItem({ item, index, section })
              return (
                <ItemView
                  item={item}
                  index={index}
                  section={section}
                  onSelect={(item) => onSelect(item)}
                  showCallingCode={showCallingCode}
                  showCurrency={showCurrency}
                  itemContainerStyles={itemContainerStyles}
                  itemTextContainerStyles={itemTextContainerStyles}
                  itemEmojiStyles={itemEmojiStyles}
                  itemTextStyles={itemTextStyles}
                />
              )
            }}
            renderSectionHeader={({ section: { title } }) => (<SectionHeader title={title} />)}
            sections={sections}
            keyExtractor={(item) => item.code}
          />
        ) : (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 30 }}>{emptyPlaceholderText || 'No search results'}</Text>
          </View>
        )}
      </View>
    );
  }
}
