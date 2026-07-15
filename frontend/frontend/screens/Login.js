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
  const [password, setPassword] = useState("");



  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.backUser}>
          <Ionicons name="person-outline" size={40} color="black" />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            marginBottom: 30,
            color: "white",
          }}
        >
         
         Bem Vindo de volta!
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "400",
            color: "white",
          }}
        >
         
         Login
        </Text>

        <View style={styles.InsideContainer}>
          <View style={styles.form}>

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

            <Text style={styles.label}>SENHA</Text>
            <View style={styles.divInsideInput}>
              <Ionicons name="lock-closed-outline" size={24} color="#6B21A8" />
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="••••••••••••"
                placeholderTextColor="grey"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={styles.btnLogin}>
                <Text style={styles.textLogin}>Entar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("EsqueceuSenha")}>
                <Text style={{ marginTop: 7, color: "grey" }}>
                Esqueceu sua senha?
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

  InsideContainer: {
    width: "100%",
    height: "70%",
    backgroundColor: "white",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 60,
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
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

  backUser: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFCC00",
    borderRadius: 50,
    width: 90,
    height: 90,
    marginBottom: 25,
  },

  textLogin: {
    color: "black",
    fontWeight: "600",
    fontSize: 14,
  },

  btnLogin: {
    backgroundColor: "#FFCC00",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 7,
  },

  btnLoginText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1a1a1a",
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
  const [password, setPassword] = useState("");



  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.backUser}>
          <Ionicons name="person-outline" size={40} color="black" />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            marginBottom: 30,
            color: "white",
          }}
        >
         
         Bem Vindo de volta!
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "400",
            color: "white",
          }}
        >
         
         Login
        </Text>

        <View style={styles.InsideContainer}>
          <View style={styles.form}>

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

            <Text style={styles.label}>SENHA</Text>
            <View style={styles.divInsideInput}>
              <Ionicons name="lock-closed-outline" size={24} color="#6B21A8" />
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="••••••••••••"
                placeholderTextColor="grey"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={styles.btnLogin}>
                <Text style={styles.textLogin}>Entar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("EsqueceuSenha")}>
                <Text style={{ marginTop: 7, color: "grey" }}>
                Esqueceu sua senha?
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

  InsideContainer: {
    width: "100%",
    height: "70%",
    backgroundColor: "white",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 60,
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
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

  backUser: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFCC00",
    borderRadius: 50,
    width: 90,
    height: 90,
    marginBottom: 25,
  },

  textLogin: {
    color: "black",
    fontWeight: "600",
    fontSize: 14,
  },

  btnLogin: {
    backgroundColor: "#FFCC00",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 7,
  },

  btnLoginText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1a1a1a",
  },

});
>>>>>>> 57323edffca0c2908cc22f85df1f391269f6a3c3
