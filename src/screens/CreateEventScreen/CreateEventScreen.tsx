import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {useMutation} from '@apollo/client';
import {createDeal} from './queries';
import {
  CreateDealInput,
  CreateDealMutation,
  CreateDealMutationVariables,
} from '../../API';
import Button from '../../components/Button/Button';
import {v4 as uuidv4} from 'uuid';
import {useAuthContext} from '../../contexts/AuthContext';
import {uploadData} from 'aws-amplify/storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {CreateNavigationProp} from '../../types/navigation';

import {useChatContext} from '../../contexts/ChatContext';
import {ChannelList} from 'stream-chat-react-native';
import {StreamChat, Channel} from 'stream-chat';
const CreateEventScreen = () => {
  const {startChatRoom, chatClient} = useChatContext();

  type FileParams = {
    image?: string;
  };

  const [fileParams, setFileParams] = useState<FileParams>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigation<CreateNavigationProp>();

  const [doCreateEvent] = useMutation<
    CreateDealMutation,
    CreateDealMutationVariables
  >(createDeal);

  const {userId} = useAuthContext();

  const openImageGallery = () => {
    launchImageLibrary(
      {mediaType: 'photo', selectionLimit: 1},
      ({didCancel, errorCode, errorMessage, assets}) => {
        const params: {image?: string; images?: string[]; video?: string} = {};

        if (!didCancel && !errorCode && assets && assets.length > 0) {
          if (assets.length === 1) {
            params.image = assets[0].uri;
          }

          setFileParams(params);
        }
      },
    );
  };

  const resetState = () => {
    setFileParams({});
    setTitle('');
    setDescription('');
    setLocation('');
    setIsSubmitting(false);
  };

  const submit = async () => {
    //upload the media files to S3 and get the key

    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    const input: CreateDealInput = {
      description,
      location,
      title,
      image: undefined,
      userID: userId,
    };

    if (fileParams?.image) {
      const imageKey = await uploadMedia(fileParams.image);
      console.log(imageKey);

      input.image = imageKey;
    }

    try {
      const response = await doCreateEvent({
        variables: {
          input,
        },
      });
      console.log('success creating event', response);

      if (response?.data?.createDeal?.title) {
        console.log('arrived here', response?.data?.createDeal?.title);
        await startChatRoom(
          response?.data?.createDeal?.id,
          response?.data?.createDeal?.title,
        );
      }

      resetState();
      navigation.navigate('TabOne');
    } catch (e) {
      setIsSubmitting(false);
    }

    setIsSubmitting(false);
  };

  const uploadMedia = async (uri: string) => {
    // get the blob of file from uri
    const response = await fetch(uri);
    const blob = await response.blob();

    const uriParts = uri.split('.');

    const extension = uriParts[uriParts.length - 1];
    // upload the file to S3

    // const s3Response = await Storage.put(`${uuidv4()}.${extension}`, blob, {
    //   progressCallback(newProgress) {
    //     setProgress(newProgress.loaded / newProgress.total);
    //   },
    // });

    // return s3Response.key;

    try {
      const result = await uploadData({
        key: `${uuidv4()}.${extension}`,
        data: blob,
        options: {
          accessLevel: 'guest', // defaults to `guest` but can be 'private' | 'protected' | 'guest'
        },
      }).result;
      console.log('Succeeded: ', result);
      return result.key;
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.root}>
      <View>
        {fileParams && (
          <Image
            source={{uri: fileParams.image}}
            style={styles.image}
            resizeMode={'contain'}
          />
        )}

        <Pressable onPress={openImageGallery}>
          <Text>Add Image</Text>
          <MaterialIcons name="photo-library" size={30} color={'black'} />
        </Pressable>
        <TextInput
          placeholder="Description..."
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Title..."
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          placeholder="Location..."
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />
        <Button
          text={isSubmitting ? 'Submitting...' : 'Submit'}
          onPress={submit}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CreateEventScreen;

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  input: {
    alignSelf: 'stretch',
    marginVertical: 10,
    backgroundColor: 'white',
  },
});
