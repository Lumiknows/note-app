import AsyncStorage from "@react-native-async-storage/async-storage";
import { Note } from "../types/Note";

const NOTES_KEY = "NOTES_APP";

export const saveNotes = async (notes: Note[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(notes);
    await AsyncStorage.setItem(NOTES_KEY, jsonValue);
  } catch (e) {
    console.error("Error saving notes", e);
  }
};

export const loadNotes = async (): Promise<Note[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(NOTES_KEY);
    return jsonValue != null ? (JSON.parse(jsonValue) as Note[]) : [];
  } catch (e) {
    console.error("Error loading notes", e);
    return [];
  }
};
