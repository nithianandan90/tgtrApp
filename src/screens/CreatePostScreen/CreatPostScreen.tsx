import {
  Button,
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

const CreatPostScreen = () => {
  type FileParams = {
    image?: string;
  };

  const [fileParams, setFileParams] = useState<FileParams>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [doCreateEvent] = useMutation<
    CreateDealMutation,
    CreateDealMutationVariables
  >(createDeal);

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
      userID: '',
    };

    // if (fileParams?.image) {
    //   const imageKey = await uploadMedia(image);
    //   console.log(imageKey);

    //   input.image = imageKey;
    // }

    // try {
    //   const response = await doCreatePost({
    //     variables: {
    //       input,
    //     },
    //   });
    // } catch (e) {
    //   setIsSubmitting(false);
    // }

    setIsSubmitting(false);
  };

  return (
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
  );
};

export default CreatPostScreen;

const styles = StyleSheet.create({
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
