// components/SearchableDropdown.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';

const SearchableDropdown = ({
  items = [],
  placeholder = "Select an item...",
  searchPlaceholder = "Search...",
  onValueChange,
  value,
  multiple = false,
  disabled = false,
  containerStyle = {},
  dropdownStyle = {},
  textStyle = {},
  maxHeight = 200,
  showSearch = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item =>
        item.label.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  const handleSelectItem = (selectedItem) => {
    if (multiple) {
      let newValue = value ? [...value] : [];
      const existingIndex = newValue.findIndex(v => v === selectedItem.value);
      
      if (existingIndex > -1) {
        newValue.splice(existingIndex, 1);
      } else {
        newValue.push(selectedItem.value);
      }
      
      if (onValueChange) {
        onValueChange(newValue);
      }
    } else {
      if (onValueChange) {
        onValueChange(selectedItem.value);
      }
      setIsOpen(false);
      setSearchText('');
      setFilteredItems(items);
    }
  };

  const getDisplayText = () => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return placeholder;
    }

    if (multiple) {
      const selectedItems = items.filter(item => value.includes(item.value));
      if (selectedItems.length === 0) return placeholder;
      if (selectedItems.length === 1) return selectedItems[0].label;
      return `${selectedItems.length} items selected`;
    } else {
      const selectedItem = items.find(item => item.value === value);
      return selectedItem ? selectedItem.label : placeholder;
    }
  };

  const isItemSelected = (itemValue) => {
    if (multiple) {
      return value && value.includes(itemValue);
    }
    return value === itemValue;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        isItemSelected(item.value) && styles.selectedItem
      ]}
      onPress={() => handleSelectItem(item)}
    >
      <Text style={[
        styles.itemText,
        isItemSelected(item.value) && styles.selectedItemText
      ]}>
        {item.label}
      </Text>
      {multiple && isItemSelected(item.value) && (
        <Text style={styles.checkmark}>✓</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[styles.selector, disabled && styles.disabled, dropdownStyle]}
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
      >
        <Text style={[
          styles.selectorText,
          (!value || (Array.isArray(value) && value.length === 0)) && styles.placeholderText,
          textStyle
        ]}>
          {getDisplayText()}
        </Text>
        <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.modalContent}>
            {showSearch && (
              <TextInput
                style={styles.searchInput}
                placeholder={searchPlaceholder}
                value={searchText}
                onChangeText={handleSearch}
                autoFocus
              />
            )}
            
            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.value.toString()}
              style={[styles.list, { maxHeight }]}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            />
            
            {multiple && (
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => {
                  setIsOpen(false);
                  setSearchText('');
                  setFilteredItems(items);
                }}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 50,
    backgroundColor: '#fff',
  },
  disabled: {
    backgroundColor: '#F3F4F6',
    opacity: 0.6,
  },
  selectorText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  arrow: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 20,
    maxWidth: Dimensions.get('window').width - 40,
    minWidth: 280,
    maxHeight: Dimensions.get('window').height * 0.7,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
  },
  list: {
    flexGrow: 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  selectedItem: {
    backgroundColor: '#EBF8FF',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  selectedItemText: {
    color: '#1D4ED8',
    fontWeight: '500',
  },
  checkmark: {
    color: '#1D4ED8',
    fontWeight: 'bold',
    fontSize: 16,
  },
  doneButton: {
    backgroundColor: '#1D4ED8',
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SearchableDropdown;