import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { Note } from "../types/Note";

type Props = { notes: Note[] };

export default function NoteList({ notes }: Props) {
  if (notes.length === 0) {
    return <Text style={styles.empty}>No notes yet</Text>;
  }

  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.note}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.content}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  empty: { color: "#aaa", textAlign: "center", marginTop: 20 },
  note: { padding: 12, backgroundColor: "#222", marginVertical: 6, borderRadius: 6 },
  title: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  content: { color: "#ccc", marginTop: 4 },
});
