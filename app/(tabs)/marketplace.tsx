import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ImageSourcePropType,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import tomatoSeeds from '../../Images/successtory.png';
import tractor from '../../Images/successtory.png';
import npkFertilizer from '../../Images/successtory.png';

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string | ImageSourcePropType;
  category: string;
  seller: string;
};

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Organic Tomato Seeds',
    description: 'High-quality organic tomato seeds for your farm.',
    price: '$10.00',
    imageUrl: tomatoSeeds,
    category: 'Seeds',
    seller: 'AgriSeeds Co.',
  },
  {
    id: '2',
    title: 'Tractor - Model X',
    description: 'Efficient tractor for large-scale farming.',
    price: '$25,000.00',
    imageUrl: tractor,
    category: 'Equipment',
    seller: 'FarmTech Equipment',
  },
  {
    id: '3',
    title: 'NPK Fertilizer',
    description: 'Balanced NPK fertilizer for optimal crop growth.',
    price: '$30.00',
    imageUrl: npkFertilizer,
    category: 'Fertilizers',
    seller: 'AgriFert Ltd.',
  },
];

const STORAGE_KEY = 'marketplace_products';

const MarketPlaceScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [newProduct, setNewProduct] = useState<Product>({
    id: '',
    title: '',
    description: '',
    price: '',
    imageUrl: tomatoSeeds, // Use default image or allow URI upload
    category: '',
    seller: '',
  });

  // Load products from storage
  useEffect(() => {
    const loadProducts = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProducts(JSON.parse(stored));
      } else {
        setProducts(DEFAULT_PRODUCTS);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      }
    };
    loadProducts();
  }, []);

  // Save to storage
  const saveProducts = async (updated: Product[]) => {
    setProducts(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleAddProduct = async () => {
    const newId = String(products.length + 1);
    const updatedProducts = [...products, { ...newProduct, id: newId }];
    await saveProducts(updatedProducts);
    setNewProduct({
      id: '',
      title: '',
      description: '',
      price: '',
      imageUrl: tomatoSeeds,
      category: '',
      seller: '',
    });
    setIsModalVisible(false);
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <Image
        source={typeof item.imageUrl === 'string' ? { uri: item.imageUrl } : item.imageUrl}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.productSeller}>Seller: {item.seller}</Text>
        <TouchableOpacity style={styles.viewDetailsButton} onPress={() => handleViewDetails(item)}>
          <Text style={styles.viewDetailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marketplace</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search for products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
      />

      <TouchableOpacity style={styles.addProductButton} onPress={() => {
        setSelectedProduct(null);
        setIsModalVisible(true);
      }}>
        <Text style={styles.addProductButtonText}>Add Product</Text>
      </TouchableOpacity>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Modal visible={isModalVisible} animationType="slide" onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Image
              source={typeof selectedProduct.imageUrl === 'string' ? { uri: selectedProduct.imageUrl } : selectedProduct.imageUrl}
              style={styles.productImage}
            />
            <Text style={styles.productTitle}>{selectedProduct.title}</Text>
            <Text style={styles.productDescription}>{selectedProduct.description}</Text>
            <Text style={styles.productPrice}>{selectedProduct.price}</Text>
            <Text style={styles.productSeller}>Seller: {selectedProduct.seller}</Text>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {/* Add Product Modal */}
      {!selectedProduct && (
        <Modal visible={isModalVisible} animationType="slide" onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Product</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newProduct.title}
              onChangeText={(text) => setNewProduct({ ...newProduct, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newProduct.description}
              onChangeText={(text) => setNewProduct({ ...newProduct, description: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={newProduct.price}
              onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={newProduct.category}
              onChangeText={(text) => setNewProduct({ ...newProduct, category: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Seller"
              value={newProduct.seller}
              onChangeText={(text) => setNewProduct({ ...newProduct, seller: text })}
            />

            <TouchableOpacity style={styles.addProductButton} onPress={handleAddProduct}>
              <Text style={styles.addProductButtonText}>Add Product</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeModalButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeModalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  searchInput: { height: 40, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingLeft: 10, marginBottom: 20 },
  productList: { paddingBottom: 20 },
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
  productImage: { width: 100, height: 100, borderRadius: 8, marginRight: 15 },
  productInfo: { flex: 1 },
  productTitle: { fontSize: 18, fontWeight: 'bold' },
  productDescription: { fontSize: 14, color: '#555', marginTop: 5 },
  productPrice: { fontSize: 16, color: '#026338', marginTop: 5 },
  productSeller: { fontSize: 12, color: '#aaa', marginTop: 10 },
  viewDetailsButton: {
    marginTop: 15,
    backgroundColor: '#026338',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewDetailsButtonText: { color: '#fff', fontSize: 14 },
  addProductButton: {
    backgroundColor: '#026338',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addProductButtonText: { color: '#fff', fontSize: 14 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
    width: '100%',
    color: '#000',
    backgroundColor: '#fff',
  },
  closeModalButton: {
    marginTop: 10,
    backgroundColor: '#026338',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeModalButtonText: { color: '#fff', fontSize: 14 },
});

export default MarketPlaceScreen;
