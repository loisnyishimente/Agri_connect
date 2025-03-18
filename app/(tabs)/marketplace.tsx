import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  category: string;
  seller: string;
};

const MarketPlaceScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      title: 'Organic Tomato Seeds',
      description: 'High-quality organic tomato seeds for your farm.',
      price: '$10.00',
      imageUrl: 'https://via.placeholder.com/100',
      category: 'Seeds',
      seller: 'AgriSeeds Co.',
    },
    {
      id: '2',
      title: 'Tractor - Model X',
      description: 'Efficient tractor for large-scale farming.',
      price: '$25,000.00',
      imageUrl: 'https://via.placeholder.com/100',
      category: 'Equipment',
      seller: 'FarmTech Equipment',
    },
    {
      id: '3',
      title: 'NPK Fertilizer',
      description: 'Balanced NPK fertilizer for optimal crop growth.',
      price: '$30.00',
      imageUrl: 'https://via.placeholder.com/100',
      category: 'Fertilizers',
      seller: 'AgriFert Ltd.',
    },
    // More products here...
  ]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      setProducts([
        // Reset to original list if search is cleared
        {
          id: '1',
          title: 'Organic Tomato Seeds',
          description: 'High-quality organic tomato seeds for your farm.',
          price: '$10.00',
          imageUrl: 'https://via.placeholder.com/100',
          category: 'Seeds',
          seller: 'AgriSeeds Co.',
        },
        {
          id: '2',
          title: 'Tractor - Model X',
          description: 'Efficient tractor for large-scale farming.',
          price: '$25,000.00',
          imageUrl: 'https://via.placeholder.com/100',
          category: 'Equipment',
          seller: 'FarmTech Equipment',
        },
        {
          id: '3',
          title: 'NPK Fertilizer',
          description: 'Balanced NPK fertilizer for optimal crop growth.',
          price: '$30.00',
          imageUrl: 'https://via.placeholder.com/100',
          category: 'Fertilizers',
          seller: 'AgriFert Ltd.',
        },
      ]);
    }
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.productSeller}>Seller: {item.seller}</Text>
        <TouchableOpacity
          style={styles.viewDetailsButton}
          onPress={() => {
            // Handle view product details, could navigate to a new screen
            alert(`Viewing details of ${item.title}`);
          }}
        >
          <Text style={styles.viewDetailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Marketplace</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for products..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.categoryButton} onPress={() => handleSearch('Seeds')}>
          <Text style={styles.categoryButtonText}>Seeds</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton} onPress={() => handleSearch('Equipment')}>
          <Text style={styles.categoryButtonText}>Equipment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton} onPress={() => handleSearch('Fertilizers')}>
          <Text style={styles.categoryButtonText}>Fertilizers</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  categoryButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  productList: {
    marginBottom: 20,
  },
  productItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 5,
  },
  productSeller: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 10,
  },
  viewDetailsButton: {
    marginTop: 15,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewDetailsButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default MarketPlaceScreen;
