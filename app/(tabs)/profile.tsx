import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const userProfile = {
  username: 'John Deo',
  profilePicture: 'https://via.placeholder.com/150', 
  posts: 1487,
  followers: 898,
  following: 1310,
  name: ' Karangangwa',
  bio: 'A farmer  📸 #visitRwanda #35mm 📷\nSF, CA\nwww.Karangwa.net',
  gallery: [
   
    { id: '1', url: 'https://via.placeholder.com/300' },
    { id: '2', url: 'https://via.placeholder.com/300' },
    { id: '3', url: 'https://via.placeholder.com/300' },
    { id: '4', url: 'https://via.placeholder.com/300' },
    { id: '5', url: 'https://via.placeholder.com/300' },
    { id: '6', url: 'https://via.placeholder.com/300' },
  ],
};

const ProfileScreen = () => {
  const renderGalleryItem = ({ item }: { item: { id: string; url: string } }) => (
    <Image source={{ uri: item.url }} style={styles.galleryImage} />
  );

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: userProfile.profilePicture }}
          style={styles.profileImage}
        />
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{userProfile.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{userProfile.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{userProfile.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      {/* Name and Bio */}
      <Text style={styles.name}>{userProfile.name}</Text>
      <Text style={styles.bio}>{userProfile.bio}</Text>
      <TouchableOpacity style={styles.editProfileButton}>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Gallery */}
      <FlatList
        data={userProfile.gallery}
        keyExtractor={(item) => item.id}
        renderItem={renderGalleryItem}
        numColumns={3}
        contentContainerStyle={styles.galleryContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,

  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 10,
  },
  bio: {
    fontSize: 14,
    color: '#555',
    marginHorizontal: 20,
    marginTop: 5,
  },
  editProfileButton: {
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCC',
    alignItems: 'center',
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  galleryContainer: {
    paddingHorizontal: 2,
    paddingTop: 10,
  },
  galleryImage: {
    width: '33.33%',
    aspectRatio: 1,
    margin: 1,
  },
});

export default ProfileScreen;
