import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Deal} from '../../API';
import {getUrl} from 'aws-amplify/storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useChatContext} from '../../contexts/ChatContext';
import {useNavigation} from '@react-navigation/native';
interface IFeedPost {
  event: Deal;
}

const FeedPost = (props: IFeedPost) => {
  const {chatClient, setCurrentChannel} = useChatContext();

  const dayjs = require('dayjs');
  const relativeTime = require('dayjs/plugin/relativeTime');
  dayjs.extend(relativeTime);
  const {event} = props;

  const navigation = useNavigation();

  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    downloadMedia();
  }, []);

  const downloadMedia = async () => {
    if (event.image) {
      const result = await getUrl({key: event.image});
      console.log(result.url.toString());
      setImageUri(result.url.toString());
    }
  };

  const navigateToChat = async () => {
    const channel = chatClient.channel('livestream', event.id);
    await channel.watch();
    setCurrentChannel(channel);
    navigation.navigate('ChatRoom');
  };

  return (
    <View>
      <Text style={styles.userName}>
        Volunteer Event By: {event.User?.name}
      </Text>
      <Text style={styles.userName}>Event Title: {event.title}</Text>
      <Image source={{uri: imageUri}} style={styles.image} />

      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <Pressable onPress={navigateToChat}>
            <Ionicons
              name="chatbubble-outline"
              size={24}
              style={styles.icon}
              color={'black'}
            />
          </Pressable>

          <Feather
            name="bookmark"
            size={24}
            style={{marginLeft: 'auto'}}
            color={'black'}
          />
        </View>

        {/* Post Description */}

        <Text style={styles.text} numberOfLines={3}>
          {event.description}
        </Text>
        <Text style={styles.text} numberOfLines={3}>
          Location: {event.location}
        </Text>

        {/* Posted date */}
        <Text>{dayjs(event.createdAt).fromNow()}</Text>
      </View>
    </View>
  );
};

export default FeedPost;

const styles = StyleSheet.create({
  userName: {
    fontWeight: '600',
    color: 'black',
    fontSize: 24,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  threeDots: {
    marginLeft: 'auto',
  },
  iconContainer: {
    flexDirection: 'row',

    marginBottom: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  footer: {
    padding: 10,
  },
  bold: {
    fontWeight: '600',
  },
  text: {
    color: 'black',
    lineHeight: 18,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentText: {
    flex: 1,
  },
  location: {
    color: 'grey',
  },
});
