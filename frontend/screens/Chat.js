<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function Chat({ navigation }) {
  const [navbar, setNavbar] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/PeduZX/HiveStudyClub_Ts/refs/heads/main/frontend/src/assets/logo/logo.png",
              }}
              style={{ width: 50, height: 50 }}
              resizeMode="contain"
            />
            <Text style={{ fontSize: 13, fontWeight: "bold", color: "white" }}>
              {`Hive\nStudy Club`}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setNavbar(!navbar)}>
            <Ionicons name="menu-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.containerMain}>
          <Image
            source={{
              uri: "https://raw.githubusercontent.com/PeduZX/ReactNativeHIVE/refs/heads/master/assets/Gemini_Generated_Image_xgj9dkxgj9dkxgj9.png",
            }}
            style={styles.imagemBackground}
          />

          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.asideInput}>
              <Ionicons name="add-outline" size={25} color="white" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Seu@gmail.com"
              placeholderTextColor="grey"
            />
            <TouchableOpacity style={styles.asideInput}>
              <Ionicons name="send-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {navbar == true && (
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ fontSize: 16 }}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            <Text style={{ fontSize: 16 }}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
            <Text style={{ fontSize: 16 }}>Perfil</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#6B21A8",
  },

  navbar: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    zIndex: 999,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },

  imagemBackground: {
    width: "100%",
    height: "90%",
  },

  containerMain: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },

  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    fontSize: 15,
    color: "#333",
    backgroundColor: "#CFCFCF",
  },

  inputRow: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  asideInput: {
    backgroundColor: "#6B21A8",
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});
=======
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function Chat({ navigation }) {
  const [navbar, setNavbar] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/PeduZX/HiveStudyClub_Ts/refs/heads/main/frontend/src/assets/logo/logo.png",
              }}
              style={{ width: 50, height: 50 }}
              resizeMode="contain"
            />
            <Text style={{ fontSize: 13, fontWeight: "bold", color: "white" }}>
              {`Hive\nStudy Club`}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setNavbar(!navbar)}>
            <Ionicons name="menu-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.containerMain}>
          <Image
            source={{
              uri: "https://raw.githubusercontent.com/PeduZX/ReactNativeHIVE/refs/heads/master/assets/Gemini_Generated_Image_xgj9dkxgj9dkxgj9.png",
            }}
            style={styles.imagemBackground}
          />

          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.asideInput}>
              <Ionicons name="add-outline" size={25} color="white" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Seu@gmail.com"
              placeholderTextColor="grey"
            />
            <TouchableOpacity style={styles.asideInput}>
              <Ionicons name="send-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {navbar == true && (
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ fontSize: 16 }}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            <Text style={{ fontSize: 16 }}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
            <Text style={{ fontSize: 16 }}>Perfil</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#6B21A8",
  },

  navbar: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    zIndex: 999,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },

  imagemBackground: {
    width: "100%",
    height: "90%",
  },

  containerMain: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },

  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    fontSize: 15,
    color: "#333",
    backgroundColor: "#CFCFCF",
  },

  inputRow: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  asideInput: {
    backgroundColor: "#6B21A8",
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});
>>>>>>> 57323edffca0c2908cc22f85df1f391269f6a3c3
