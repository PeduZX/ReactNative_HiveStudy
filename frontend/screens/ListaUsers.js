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



export default function ListaUsers({ navigation }) {

    const [buscarUsuarios, setBuscarUsuarios] = useState([]);

    async function listarUsuarios() {

        try{

            const resposta = await fetch(`http//localhost:3000/buscarUser`)
            const data = await resposta.json();
            setUsuarios(data);

        } catch(erro) {
            alert("Erro ao buscar os usuários", erro);
        }

    }


    return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
        <View>
            <TouchableOpacity style={styles.botao} onPress={buscarUsuarios}>
                <Text style={styles.textBotao}>
                    Buscar Usuários
                </Text>
            </TouchableOpacity>
        </View>
      
        { usuarios.map((usuario) => 
            <View style={styles.card} key={usuario.id}>
                <Text>Nome: {usuario.nome}</Text>
                <Text>Email: {usuario.email}</Text>
            </View>
        )

        }

        </ScrollView>
      </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
    },

    botao:{
        backgroundColor: "#007AFF",
        padding: 12,
        borderRadius: 5,
        marginBottom: 20,
    },

    textBotao: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },

});