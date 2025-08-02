
// React Native Chat Component
import React, { useState } from 'react';
import { View, TextInput, ScrollView, Text, TouchableOpacity } from 'react-native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = { text: inputText, sender: 'user', timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Call backend API
      const response = await fetch('http://your-backend-url/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: inputText,
          location: await getCurrentLocation() 
        })
      });

      const data = await response.json();

      // Add bot response
      const botMessage = { text: data.response, sender: 'bot', timestamp: Date.now() };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error:', error);
    }

    setInputText('');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ScrollView style={{ flex: 1 }}>
        {messages.map((message, index) => (
          <View key={index} style={{
            alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: message.sender === 'user' ? '#007AFF' : '#E5E5EA',
            padding: 10,
            margin: 5,
            borderRadius: 10
          }}>
            <Text style={{ color: message.sender === 'user' ? 'white' : 'black' }}>
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, padding: 10, marginRight: 10, borderRadius: 5 }}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          multiline
        />
        <TouchableOpacity onPress={sendMessage}>
          <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
