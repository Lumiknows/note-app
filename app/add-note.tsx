import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { saveNotes, loadNotes } from "../utils/storage";
import { Note } from "../types/Note";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    const existingNotes: Note[] = await loadNotes();
    const newNote: Note = { 
      id: Date.now().toString(), 
      title, 
      content 
    };
    await saveNotes([...existingNotes, newNote]);
    router.back(); // go back to Home
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Content"
        placeholderTextColor="#999"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#111" },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
  },
});
