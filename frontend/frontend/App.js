import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  Linking,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem('url_history');
      if (stored) setHistory(JSON.parse(stored));
    } catch (err) {
      console.error('Failed to load history:', err);
    }
  };

  const saveToHistory = async (shortUrl) => {
    try {
      const newHistory = [shortUrl, ...history].slice(0, 5);
      setHistory(newHistory);
      await AsyncStorage.setItem('url_history', JSON.stringify(newHistory));
    } catch (err) {
      console.error('Failed to save to history:', err);
    }
  };

  const handleShorten = async () => {
    try {
      const response = await axios.post('http://192.168.85.13:8000/api/shorten/', { original_url: url });
      const short = response.data.short_url;
      setShortUrl(short);
      saveToHistory(short);
      setUrl('');
    } catch (err) {
      console.error('Error occurred:', err);
      alert(`Failed to shorten URL: ${err.message || err}`);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        ListHeaderComponent={
          <View style={styles.topSection}>
            <Text style={styles.title}>Smart URL Shortener</Text>

            <TextInput
              placeholder="Paste your long URL here"
              value={url}
              onChangeText={setUrl}
              style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={handleShorten}>
              <Text style={styles.buttonText}>Shorten URL</Text>
            </TouchableOpacity>

            {shortUrl ? (
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Latest Shortened URL:</Text>
                <Text style={styles.link} onPress={() => Linking.openURL(shortUrl)}>
                  {shortUrl}
                </Text>
              </View>
            ) : null}

            <Text style={styles.heading}>Recent (Last 5)</Text>
          </View>
        }
        contentContainerStyle={styles.container}
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => Linking.openURL(item)}>
            <Text style={styles.cardText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: '#f0f4f7',
    paddingBottom: 40
  },
  topSection: {
    paddingTop: 60
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1e1e2d'
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
    borderColor: '#d1d1d1',
    borderWidth: 1
  },
  button: {
    backgroundColor: '#0066ff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  resultCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#cde',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  resultLabel: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 16,
    color: '#333'
  },
  link: {
    color: '#0066cc',
    fontSize: 16
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#0066ff',
    elevation: 2
  },
  cardText: {
    fontSize: 15,
    color: '#333'
  }
});
