import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Landing() {
  const router = useRouter();

  const workspaces = ["Office", "School", "Chore", "To-Do", "+ Custom"];

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          source={require("../assets/images/profile.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.welcome}>Welcome back!</Text>
      </View>

      <Text style={styles.title}>Choose Your Workspace</Text>

      <View style={styles.grid}>
        {workspaces.map((space) => (
          <TouchableOpacity
            key={space}
            style={styles.card}
            onPress={() => router.push(`/home?workspace=${space}`)}
          >
            <Text style={styles.cardText}>{space}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e9f3f6", padding: 20 },
  profile: { alignItems: "center", marginBottom: 30 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  welcome: { fontSize: 16, fontWeight: "600", color: "#333" },
  title: { fontSize: 22, fontWeight: "bold", color: "#111", marginBottom: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    width: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  cardText: { fontSize: 16, fontWeight: "600", color: "#333" },
});
