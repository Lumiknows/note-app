// app/home.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import NoteList from "../components/NoteList";
import { loadNotes } from "../utils/storage";
import { Note } from "../types/Note";

export default function Home() {
  const { workspace } = useLocalSearchParams();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const storedNotes = await loadNotes();
      setNotes(storedNotes);
    };
    fetchNotes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workspace} Workspace</Text>
      <NoteList notes={notes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 15 },
});
