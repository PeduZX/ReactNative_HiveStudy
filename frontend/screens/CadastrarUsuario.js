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
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { API_URL } from "../config/api";

const Stack = createNativeStackNavigator();

export default function Cadastro({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serMentorado, setSerMentorado] = useState("Ciências Humanas");
  const [mentorar, setMentorar] = useState("Ciências Humanas");
  const [respostaAwait, setRespostaAwait] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  function onChangeDate(event, selectedDate) {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  }

  function onChangeDateWeb(event) {
    const value = event.target.value;
    if (value) {
      setBirthDate(new Date(value + "T00:00:00"));
    } else {
      setBirthDate(null);
    }
  }

  async function cadastroUser() {
    try {
      if (!name.trim() || !email.trim() || !password || !birthDate) {
        Alert.alert("Atenção", "Preencha nome, email, senha e data de nascimento.");
        return null;
      }
      const resposta = await fetch(`${API_URL}/cadastrarUsers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: name.trim(),
          email: email.trim().toLowerCase(),
          senha: password,
          data_nasc: birthDate.toISOString().split("T")[0],
        }),
      });
      const data = await resposta.json();
      if (!resposta.ok) {
        Alert.alert("Não foi possível cadastrar", data.mensagem || "Tente novamente.");
        return null;
      }
      return data;
    } catch (error) {
      Alert.alert("Erro", "Falha ao conectar com a API");
      console.log(error);
      return null;
    }
  }

  async function cadastrarFuncoesUser(usersId) {
    try {
      const resposta = await fetch(`${API_URL}/cadastrarAreas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeAreaMentorar: mentorar,
          nomeAreaMentorado: serMentorado,
          users_id: usersId,
        }),
      });
      const data = await resposta.json();
      if (!resposta.ok) {
        Alert.alert("Cadastro parcial", data.mensagem || "Não foi possível salvar as áreas.");
        return false;
      }
      return true;
    } catch (error) {
      Alert.alert("Erro", "Falha ao conectar com a API");
      console.log(error);
      return false;
    }
  }

  async function finalizarCadastro() {
    const usuario = await cadastroUser();
    if (!usuario) return;
    const areasSalvas = await cadastrarFuncoesUser(usuario.id);
    if (!areasSalvas) return;
    Alert.alert("Sucesso", usuario.mensagem);
    setRespostaAwait(usuario.mensagem);
    setTimeout(() => setRespostaAwait(""), 5000);
    setName("");
    setEmail("");
    setPassword("");
    setBirthDate(null);
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
          Crie seu usuário
        </Text>

        <View style={styles.InsideContainer}>
          <View style={styles.form}>
            <Text style={styles.label}>NOME</Text>
            <View style={styles.divInsideInput}>
              <Ionicons name="person-outline" size={20} color="#6B21A8" />
              <TextInput
                placeholder="Seu nome completo"
                placeholderTextColor="grey"
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </View>

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

            <Text style={styles.label}>DATA DE NASCIMENTO</Text>

            {Platform.OS === "web" ? (
              <View style={styles.divInsideInput}>
                <Ionicons name="calendar-outline" size={20} color="#6B21A8" />
                <input
                  type="date"
                  value={birthDate ? birthDate.toISOString().split("T")[0] : ""}
                  onChange={onChangeDateWeb}
                  max={new Date().toISOString().split("T")[0]}
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: 15,
                    color: "#333",
                    paddingVertical: 5,
                  }}
                />
              </View>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => setShowPicker(true)}
                  style={styles.divInsideInput}
                >
                  <Ionicons name="calendar-outline" size={20} color="#6B21A8" />
                  <Text
                    style={[
                      styles.input,
                      !birthDate && { color: "grey" },
                    ]}
                  >
                    {birthDate
                      ? birthDate.toLocaleDateString("pt-BR")
                      : "Selecione sua data de nascimento"}
                  </Text>
                </TouchableOpacity>

                {showPicker && (
                  <DateTimePicker
                    value={birthDate || new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={onChangeDate}
                    maximumDate={new Date()}
                  />
                )}
              </>
            )}

            <View style={styles.formPicker}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6B21A8",
                  fontWeight: "700",
                  marginBottom: 4,
                  marginLeft: 4,
                  fontFamily: "Arial",
                  marginTop: 20,
                }}
              >
                ÁREAS DE MENTORIA
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <View style={styles.pickerColumn}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#6B21A8",
                      fontWeight: "600",
                      marginBottom: 4,
                      marginLeft: 4,
                      fontFamily: "Arial",
                      marginTop: 20,
                    }}
                  >
                    Ser Mentorado
                  </Text>
                  <Picker
                    style={styles.inputPicker}
                    itemStyle={styles.pickerItemIOS}
                    selectedValue={serMentorado}
                    onValueChange={(itemValue) => setSerMentorado(itemValue)}
                    mode="dropdown"
                  >
                    <Picker.Item label="Ciências Humanas" value="CH" />
                    <Picker.Item label="Ciências da Natureza" value="CN" />
                    <Picker.Item label="Linguagens" value="Linguagens" />
                    <Picker.Item label="Exatas" value="Exatas" />
                  </Picker>
                </View>
                <View style={styles.pickerColumn}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#6B21A8",
                      fontWeight: "600",
                      marginBottom: 4,
                      marginLeft: 4,
                      fontFamily: "Arial",
                      marginTop: 20,
                    }}
                  >
                    Mentorar
                  </Text>
                  <Picker
                    style={styles.inputPicker}
                    itemStyle={styles.pickerItemIOS}
                    selectedValue={mentorar}
                    onValueChange={(itemValue) => setMentorar(itemValue)}
                    mode="dropdown"
                  >
                    <Picker.Item label="Ciências Humanas" value="CH" />
                    <Picker.Item label="Ciências da Natureza" value="CN" />
                    <Picker.Item label="Linguagens" value="Linguagens" />
                    <Picker.Item label="Exatas" value="Exatas" />
                  </Picker>
                </View>
              </View>
            </View>

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={finalizarCadastro} style={styles.btnLogin}>
                <Text style={styles.textLogin}>Cadastre-se</Text>
              </TouchableOpacity>

              <Text onPress={() => navigation.navigate("Login")} style={{ marginTop: 7, color: "grey" }}>
                Já tem conta?
              </Text>
            </View>
          </View>

          {respostaAwait && (
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                marginTop: 30,
                color: "green",
              }}
            >
              {respostaAwait}
            </Text>
          )}
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
    height: "80%",
    backgroundColor: "white",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
     borderColor: "#E0DCED",
    borderTopColor: "#c9c3e0",
    borderLeftColor: "#c9c3e0",
    marginTop: 80,
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
    marginTop: 20,
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

  pickerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  pickerColumn: {
    flex: 1,
    flexDirection: "column",
    height: Platform.OS === "ios" ? 220 : 90,
  },

  result: {
    marginTop: 20,
    fontSize: 16,
  },

  inputPicker: {
    flex: 1,
    gap: 8,
    color: "#333",
    height: Platform.OS === "ios" ? 180 : 40,
    fontSize: 15,
    marginBottom: 5,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    borderColor: "#E0DCED",
    borderTopColor: "#c9c3e0",
    backgroundColor: "#f3f0f9",
    borderLeftColor: "#c9c3e0",
  },

  pickerItemIOS: {
    fontSize: 15,
    color: "#333",
    height: 180,
  },
});
