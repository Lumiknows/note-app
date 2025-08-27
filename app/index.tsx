// app/index.tsx (Home Screen)
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { useRouter } from "expo-router";
import { loadNotes } from "../utils/storage";
import { Note } from "../types/Note";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      const saved = await loadNotes();
      setNotes(saved);
    };
    const interval = setInterval(fetchNotes, 1000); // auto-refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/profile.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.title}>Milende</Text>
        <TouchableOpacity style={styles.menuBtn}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tabActive}>
          <Text style={styles.tabTextActive}>All (20)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Important</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Bookmarked</Text>
        </TouchableOpacity>
      </View>

      {/* Notes */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.noteCard}
            onPress={() => router.push(`/note/${item.id}`)}
          >
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteContent} numberOfLines={3}>
              {item.content}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add-note")}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d0d0d", padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold", flex: 1 },
  menuBtn: { padding: 6 },
  menuText: { color: "#fff", fontSize: 22 },
  tabs: { flexDirection: "row", marginBottom: 20 },
  tab: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, marginRight: 10 },
  tabActive: { backgroundColor: "#fff", borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12 },
  tabText: { color: "#aaa" },
  tabTextActive: { color: "#000", fontWeight: "bold" },
  noteCard: { backgroundColor: "#222", padding: 15, borderRadius: 12, marginBottom: 12 },
  noteTitle: { color: "#fff", fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  noteContent: { color: "#aaa" },
  fab: { position: "absolute", bottom: 20, right: 20, backgroundColor: "#fff", width: 60, height: 60, borderRadius: 30, alignItems: "center", justifyContent: "center" },
  fabText: { fontSize: 28, fontWeight: "bold", color: "#000" },
});
