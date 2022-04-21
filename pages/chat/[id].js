import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components"
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";

const Chat = ( {chat, messages }) => {
    const [user] = useAuthState(auth);

  return (
    <Container>
        <Head>
            <title>Chat with {getRecipientEmail(chat.users, user)}</title>
        </Head>
        <Sidebar/>
        <ChatContainer>
            <ChatScreen chat={chat} messages={messages} />
        </ChatContainer>
    </Container>
  );
}

export default Chat;

export async function getServerSideProps(context){ /*Server side rendering of chat*/
    const ref = db.collection("chats").doc(context.query.id);

    // prep the messages on the server
    const messageRes = await ref
        .collection("messages")
        .orderBy("timestamp", "asc")
        .get();

        const messages = messageRes.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })).map(messages => ({
            messages,
            timestamp: messages.timestamp.toDate().getTime(),
        }));

    // prep the chats
    const chatRes = await ref.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data(),
    }

    // {console.log(chat, messages)}
    // props coming from server before page renders locally
    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat,

        }
    }
} 

const Container = styled.div`
    display: flex;
`;

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh;

    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; /*for IE and EDGE*/
    scrollbar-width: none; /*for firefox*/
`;