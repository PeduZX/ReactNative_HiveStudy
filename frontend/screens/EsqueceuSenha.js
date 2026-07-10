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
          <Ionicons name="lock-closed-outline" size={32} color="#8548b8" style={{ marginBottom: 10, borderColor: "#8548b8", borderWidth: 3, borderRadius: 50, padding: 10, boxShadow: '0px 4px 10px rgb(53, 16, 56)'  }} />
          <Text style={styles.titleH1top}>Esqueceu sua senha?</Text>
          <Text style={styles.titleH2top}>
            Sem problemas! Digite o e-mail cadastrado e enviaremos um link para
            você criar uma nova senha.
          </Text>

          <View style={styles.divContainerInput}>
            <Text style={styles.label}>EMAIL</Text>
            <View style={styles.divInsideInput}>
              <Ionicons style={{ marginLeft: 10 }} name="mail-outline" size={24} color="#795696" />
              <TextInput
                style={styles.input}
                placeholder="Seu@gmail.com"
                placeholderTextColor="grey"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={styles.btnEsqueciSenha}>
                <Text style={styles.textLogin}>Enviar link de recuperação</Text>
                <Ionicons style={{rotate: "-20deg", marginBottom: 5}} name="send-outline" size={20} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: "#8d8d8d", marginTop: 10 }}>
                  Voltar para o login
                </Text>
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

  insideContainer: {
    width: "90%",
    backgroundColor: "#522a80",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    gap: 10
  },

  titleH1top: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    fontFamily: "Arial",
  },

  titleH2top:{
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "#c7c7c7",
    marginBottom: 10,
    fontFamily: "Arial",

  },

  form: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 12,
  },

  label: {
    fontSize: 14,
    color: "#c7c7c7",
    fontWeight: "700",
    marginBottom: 4,
    marginLeft: 4,
  },

  input: {
    flex: 1,
    alignSelf: "center",
    width: "90%",
    height: 25,
    height: 25,
    borderRadius: 8,
    fontSize: 15,
    color: "#333",
  },

  divContainerInput: {
    flexDirection: "column",
    alignItems: "start",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  divInsideInput: {
    borderWidth: 2,
    borderColor: "#E0DCED",
    borderTopColor: "#c9c3e0",
    borderLeftColor: "#c9c3e0",
    width: "100%",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  btnEsqueciSenha: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    backgroundColor: "#FFCC00",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 7,
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
>>>>>>> 57323edffca0c2908cc22f85df1f391269f6a3c3
