import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import { loadNotes, saveNotes } from "../utils/storage";
import { Note } from "@/types/Note";

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Load saved notes on mount
  useEffect(() => {
    (async () => {
      const saved = await loadNotes();
      setNotes(saved);
    })();
  }, []);

  // Persist whenever notes change
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = () => {
    if (!title.trim()) return;
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      body,
    };
    setNotes((prev) => [...prev, newNote]);
    setTitle("");
    setBody("");
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0b0f17", padding: 16 }}>
      {/* Notes list */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteBody}>{item.body}</Text>
          </View>
        )}
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Modal for new note */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalSafe}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>New Note</Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.editor}>
            <TextInput
              style={styles.inputTitle}
              placeholder="Title"
              placeholderTextColor="#6b7280"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.inputBody}
              placeholder="Write your note..."
              placeholderTextColor="#6b7280"
              value={body}
              onChangeText={setBody}
              multiline
            />
            <TouchableOpacity style={[styles.modalBtn, styles.saveBtn]} onPress={addNote}>
              <Text style={[styles.modalBtnText, styles.saveBtnText]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  noteCard: {
    backgroundColor: "#111827",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  noteTitle: { color: "#e5e7eb", fontSize: 18, fontWeight: "700" },
  noteBody: { color: "#cbd5e1", fontSize: 14, marginTop: 4 },

  fab: {
    position: "absolute",
    right: 18,
    bottom: 28,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196F3",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  fabText: {
    color: "#fff",
    fontSize: 28,
    lineHeight: 28,
    fontWeight: "800",
    marginTop: -2,
  },

  modalSafe: { flex: 1, backgroundColor: "#0b0f17" },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#1f2937",
  },
  modalTitle: { color: "#e5e7eb", fontSize: 18, fontWeight: "700" },
  modalBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#111827",
  },
  modalBtnText: { color: "#cbd5e1", fontWeight: "700" },
  saveBtn: { backgroundColor: "#2196F3", marginTop: 20 },
  saveBtnText: { color: "#fff" },
  editor: { padding: 14 },
  inputTitle: {
    color: "#e5e7eb",
    fontSize: 18,
    fontWeight: "700",
    padding: 12,
    backgroundColor: "#111827",
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#1f2937",
  },
  inputBody: {
    color: "#e5e7eb",
    fontSize: 16,
    padding: 12,
    height: 300,
    backgroundColor: "#111827",
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#1f2937",
  },
});
