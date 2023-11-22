import {createContext, useContext, useEffect, useState} from 'react';
import {StreamChat, Channel} from 'stream-chat';
import {useAuthContext} from './AuthContext';
import {OverlayProvider, Chat} from 'stream-chat-react-native';
import {ActivityIndicator} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

type ChatContextType = {
  currentChannel?: Channel;
};

export const ChatContext = createContext<ChatContextType>({
  currentChannel: undefined,
});

const ChatContextProvider = ({children}: {children: React.ReactNode}) => {
  const {userAttributes} = useAuthContext();

  const [chatClient, setChatClient] = useState<StreamChat>();
  const [currentChannel, setCurrentChannel] = useState<Channel>();

  console.log('attributes chat context', chatClient);

  useEffect(() => {
    const initChat = async () => {
      if (!userAttributes) {
        return;
      } else if (!userAttributes.sub) {
        return;
      }
      const client = StreamChat.getInstance('ebj4kzbc3uy5');

      console.log('client', client);

      // get information about the authenticated user

      // connect the user to the stream chat
      // in production mode, cant user devToken. Need to generate token in backend. Check documentation
      await client.connectUser(
        {
          id: userAttributes?.sub,
          name: userAttributes.name,
          image:
            'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg',
        },
        client.devToken(userAttributes.sub),
      );

      setChatClient(client);

      const globalChannel = client.channel('livestream', 'global', {
        name: 'SubangChat',
        image:
          'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
      });

      await globalChannel.watch();
    };

    initChat();
  }, []);

  useEffect(() => {
    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, []);

  // const createChat = async chatName => {
  //   console.log('arrived at createChat');

  //   try {
  //     if (!chatClient) {
  //       console.log('no chat client');
  //       return;
  //     }
  //     const globalChannel = chatClient.channel('livestream', 'newchat', {
  //       name: chatName,
  //       image:
  //         'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
  //     });

  //     console.log('global channel', globalChannel);
  //     await globalChannel.create();

  //     await globalChannel.watch();
  //   } catch (e) {
  //     console.log('error', e);
  //   }
  // };

  console.log('chat client', chatClient);

  const startChatRoom = async (roomID, roomName) => {
    if (!chatClient) {
      return;
    }
    console.log('starting a chat room');
    const newChannel = chatClient?.channel('livestream', roomID, {
      name: roomName,
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
    });
    const response = await newChannel.create();
  };

  const value = {
    chatClient,
    currentChannel,
    setCurrentChannel,
    startChatRoom,
  };

  if (!chatClient) {
    return <ActivityIndicator />;
  }

  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
      </Chat>
    </OverlayProvider>
  );
};

export const useChatContext = () => useContext(ChatContext);

export default ChatContextProvider;
