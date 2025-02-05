import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockStories = [
  { id: '1', username: 'john_doe', profilePicture: 'https://via.placeholder.com/50' },
  { id: '2', username: 'jane_smith', profilePicture: 'https://via.placeholder.com/50' },
  { id: '3', username: 'alex_p', profilePicture: 'https://via.placeholder.com/50' },
];

const mockPosts = [
  {
    id: '1',
    username: 'john_doe',
    profilePicture: 'https://via.placeholder.com/50',
    image: 'https://via.placeholder.com/300',
    caption: 'A beautiful day in the mountains 🌄',
    likes: 124,
    comments: 5,
    liked:false,
  },
  {
    id: '2',
    username: 'jane_smith',
    profilePicture: 'https://via.placeholder.com/50',
    image: 'https://via.placeholder.com/300',
    caption: 'Delicious food at the cafe 🍴',
    likes: 98,
    comments: 12,
    liked:false,
  },
];

const PostScreen: React.FC = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [modalVisible, setModalVisible] = useState(false);
  const [newStory, setNewStory] = useState('');

  const addStory = () => {
    if (newStory) {
      mockStories.push({
        id: (mockStories.length + 1).toString(),
        username: `User_${mockStories.length + 1}`,
        profilePicture: 'https://via.placeholder.com/50',
      });
      setNewStory('');
      setModalVisible(false);
    }
  };

  const toggleLike = (id: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? { ...post, likes: post.likes + (post.liked ? -1 : 1), liked: !post.liked }
          : post
      )
    );
  };

  const renderPost = ({ item }: { item: typeof mockPosts[0] }) => (
    <View style={styles.postContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: item.profilePicture }} style={styles.profilePicture} />
        <Text style={styles.username}>{item.username}</Text>
      </View>

      {/* Post Image */}
      <Image source={{ uri: item.image }} style={styles.postImage} />

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => toggleLike(item.id)}>
          <Ionicons
            name={item.liked ? 'heart' : 'heart-outline'}
            size={24}
            color={item.liked ? 'red' : '#000'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionIcon}>
          <Ionicons name="chatbubble-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="paper-plane-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Likes and Caption */}
      <Text style={styles.likes}>{item.likes} likes</Text>
      <Text style={styles.caption}>
        <Text style={styles.username}>{item.username} </Text>
        {item.caption}
      </Text>

      {/* Comments */}
      <TouchableOpacity>
        <Text style={styles.viewComments}>View all {item.comments} comments</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>AgriConnect</Text>
      <FlatList
        ListHeaderComponent={
          <View style={styles.storiesContainer}>
            {/* Add Story */}
            <TouchableOpacity style={styles.addPostButton} onPress={() => setModalVisible(true)}>
              <View style={styles.profileStory}>
                <Ionicons name="add-circle" size={24} color="white" style={styles.addIcon} />
              </View>
              <Text style={styles.addPostText}>Add Story</Text>
            </TouchableOpacity>

            {/* Stories */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {mockStories.map((story) => (
                <TouchableOpacity key={story.id} style={styles.storyContainer}>
                  <Image source={{ uri: story.profilePicture }} style={styles.storyImage} />
                  <Text style={styles.storyUsername}>{story.username}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        }
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.container}
      />

      {/* Add Story Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Enter story details"
              style={styles.input}
              value={newStory}
              onChangeText={setNewStory}
            />
            <Button title="Add Story" onPress={addStory} />
            <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  title:{
fontSize:30,
fontWeight: 'bold',
color:'#2a7530',
marginRight:50,

  },
  container: { 
    backgroundColor: '#F5F5F5', 
    paddingBottom: 20,
    marginTop:20,

  
  },


  storiesContainer: { 
    flexDirection: 'row', 
    alignItems: 'center',},
  addPostButton: { 
    alignItems: 'center',
     marginHorizontal: 10 },
  addPostText: { 
    fontSize: 12, 
    color: '#4CAF50',  },
  profileStory: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  addIcon: {
     position: 'absolute', 
    bottom: -4 },

  storyContainer: { 
    alignItems: 'center',
     marginHorizontal: 10 
    },
  storyImage: { 
    width: 60, 
    height: 60,
     borderRadius: 30, 
     borderWidth: 2, 
     borderColor: '#4CAF50' },
  storyUsername: { 
    fontSize: 12, 
    marginTop: 5, 
    textAlign: 'center' },

   postContainer: {
    marginTop:20,
    marginBottom: 20,
     backgroundColor: '#FFF', 
     borderRadius: 10,
     overflow: 'hidden' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10 },
  profilePicture: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginRight: 10 },
  username: { 
    fontWeight: 'bold',
     fontSize: 14 },
  postImage: { 
    width: '100%',
     height: 300 },
  actions: { 
    flexDirection: 'row',
     padding: 10 },
  actionIcon: { 
    marginHorizontal: 10
   },
  likes: {
     fontWeight: 'bold', 
     marginHorizontal: 10,
      marginTop: 5 },
  caption: { 
    marginHorizontal: 10,
     marginTop: 5 },
  viewComments: { 
    marginHorizontal: 10, 
    marginTop: 5,
     color: '#888' },
  modalContainer: {
     flex: 1,
     justifyContent: 'center',
      alignItems: 'center',
       backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { 
    backgroundColor: 'white',
     padding: 20, borderRadius: 10,
      width: '80%' },
  input: { 
    borderBottomWidth: 1,
     borderBottomColor: '#CCC',
      marginBottom: 10, padding: 5 },
});

export default PostScreen;
