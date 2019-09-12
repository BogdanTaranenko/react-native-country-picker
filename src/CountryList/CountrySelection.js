import React from 'react';
import {
  View, TextInput, Image, SectionList, Text, TouchableOpacity,
} from 'react-native';
import { SearchIcon, countries } from './Constants';
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
    this.generateSectionData(countries);
    if (shouldFocusOnMount && this.searchInput) this.searchInput.focus()
  }

  onChangeSearchText = (text) => {
    const filtered = countries.filter(country => country.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
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
      containerStyles,
      renderItem,
      itemContainerStyles,
      itemTextContainerStyles,
      itemEmojiStyles,
      itemTextStyles,
    } = this.props;
    const { sections } = this.state;

    return (
      <View style={[styles.container, containerStyles]}>
        <View style={[styles.searchContainer, searchContainerStyles]}>
          {showSearch ? (
            <View style={styles.searchView}>
              <Image source={SearchIcon} style={styles.searchIcon} />
              <TextInput
                ref={(input) => this.searchInput = input}
                style={[styles.textInput, searchTextInputStyles]}
                placeholder='Search'
                placeholderTextColor="#2d2926"
                enablesReturnKeyAutomatically
                clearButtonMode="while-editing"
                onChangeText={text => this.onChangeSearchText(text)}
                {...searchTextInputProps}
              />
            </View>
          ) : null}
        </View>
        <SectionList
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
      </View>
    );
  }
}
