import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const API_BASE = process.env.EXPO_PUBLIC_API_BASE || 'http://10.0.2.2:4000';

export default function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((r) => r.json())
      .then(setProducts)
      .catch((e) => setError(String(e)));
  }, []);

  if (error) return <SafeAreaView><Text style={{ padding: 16 }}>Error: {error}</Text></SafeAreaView>;

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 12 }}>
            {item.image_url && (
              <Image source={{ uri: item.image_url }} style={{ width: '100%', height: 160, borderRadius: 8 }} />
            )}
            <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 8 }}>{item.name}</Text>
            <Text style={{ color: '#555', marginVertical: 4 }}>{item.description}</Text>
            <Text style={{ fontWeight: '600' }}>฿{(item.price_cents/100).toFixed(2)}</Text>
            <TouchableOpacity style={{ marginTop: 8, padding: 10, borderRadius: 8, borderWidth: 1, alignSelf: 'flex-start' }}>
              <Text>Add to cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
