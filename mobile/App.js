import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import io from 'socket.io-client';

const App = () => {

  const [text, setText] = useState("")
  const [texts, setTexts] = useState([])
  const socket = io("http://192.168.122.1:3000");

  function getSocket()
  {
    return socket;
  }

  useEffect(() => {
    getSocket()
    

    socket.on("chat message", msg => {
      setTexts(prevState => [...prevState, msg])
    })
  }, [])

  const submitChatMessage = () => {
      socket.emit("chat message", text)
      setText("")
  }

  return (
    <View>
      <TextInput
        style={{height: 40, borderWidth: 2}}
        autoCorrect={false}
        onSubmitEditing={ () => submitChatMessage()}
        onChangeText={v => setText(v)}
        value={text}
      />
      <Text>{texts.map((item) => {
        return(
          <Text  style={{position: "absolute"}}> {item} </Text>
        )
      })}</Text>
    </View>
  );
};



const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
