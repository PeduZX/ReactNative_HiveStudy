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

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.insideContainer}>
          <Ionicons name="person-outline" size={40} color="black" />
          <Text>Esqueceu sua senha?</Text>
          <Text>
            Sem problemas! Digite o e-mail cadastrado e enviaremos um link para
            você criar uma nova senha.
          </Text>

          <View style={styles.divInsideInput}>
            <Text style={styles.label}>EMAIL</Text>
            <View style={styles.divInsideInput}>
              <Ionicons name="mail-outline" size={24} color="#6B21A8" />
              <TextInput
                style={styles.input}
                placeholder="Seu@gmail.com"
                placeholderTextColor="grey"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={styles.btnLogin}>
                <Text style={styles.textLogin}>Entar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6B21A8",
  },

  form: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 12,
  },

  label: {
    fontSize: 14,
    color: "#6B21A8",
    fontWeight: "700",
    marginBottom: 4,
    marginLeft: 4,
  },

  input: {
    flex: 1,
    height: 25,
    marginBottom: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 15,
    color: "#333",
  },

  divInsideInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f0f9",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: "#E0DCED",
    borderTopColor: "#c9c3e0",
    borderLeftColor: "#c9c3e0",
  },
  btnLogin: {
    backgroundColor: "#FFCC00",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 7,
  },
});
