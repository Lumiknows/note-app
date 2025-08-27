// app/note/[id].tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { loadNotes } from "../../utils/storage";
import { Note } from "../../types/Note";

export default function NoteDetail() {
  const { id } = useLocalSearchParams();
  const [note, setNote] = useState<Note | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      const all = await loadNotes();
      const found = all.find((n) => n.id === id);
      setNote(found || null);
    };
    fetch();
  }, [id]);

  if (!note) return <Text style={{ color: "#fff" }}>Note not found</Text>;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.more}>⋮</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e9f3f6", padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  back: { fontSize: 22, color: "#000" },
  more: { fontSize: 22, color: "#000" },
  title: { fontSize: 20, fontWeight: "bold", color: "#000", marginBottom: 15 },
  content: { fontSize: 16, color: "#333", lineHeight: 24 },
});
