import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { API_URL, WS_URL } from "../config/api";

const SALA = "geral";


export default function Chat({ navigation, route }) {
  const user = route?.params?.user;
  const [navbar, setNavbar] = useState(false);
  const [texto, setTexto] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [status, setStatus] = useState("Conectando...");
  const [carregando, setCarregando] = useState(true);
  const socketRef = useRef(null);
  const listaRef = useRef(null);

   const goTo = (screen) => {
    setNavbar(false);
    navigation.navigate(screen, route?.params?.user ? { user: route.params.user } : undefined);
  };

  useEffect(() => {
    let ativo = true;
    fetch(`${API_URL}/mensagens/${encodeURIComponent(SALA)}`)
      .then(async (resposta) => {
        const dados = await resposta.json();
        if (!resposta.ok)
          throw new Error(
            dados.mensagem || "Não foi possível carregar as mensagens.",
          );
        if (ativo) setMensagens(dados.mensagens || []);
      })
      .catch((erro) => {
        if (ativo) setStatus("Não foi possível carregar o histórico");
        console.warn("Falha ao carregar mensagens:", erro);
      })
      .finally(() => ativo && setCarregando(false));

    const socket = new WebSocket(WS_URL);
    socketRef.current = socket;
    socket.onopen = () => ativo && setStatus("Conectado");
    socket.onmessage = (evento) => {
      try {
        const mensagem = JSON.parse(evento.data);
        if (mensagem.sala !== SALA) return;
        setMensagens((atuais) => [
          ...atuais,
          { ...mensagem, id: `${mensagem.time}-${Math.random()}` },
        ]);
      } catch (erro) {
        console.warn("Mensagem recebida em formato inválido:", erro);
      }
    };
    socket.onerror = () => ativo && setStatus("Falha na conexão do chat");
    socket.onclose = () => ativo && setStatus("Desconectado");

    return () => {
      ativo = false;
      socket.close();
      socketRef.current = null;
    };
  }, []);

  function enviarMensagem() {
    const mensagem = texto.trim();
    if (!mensagem) return;
    if (!user?.id) {
      Alert.alert(
        "Entre na sua conta",
        "Faça login para enviar mensagens no chat.",
      );
      return;
    }
    const socket = socketRef.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      Alert.alert(
        "Chat desconectado",
        "Aguarde a conexão com o servidor e tente novamente.",
      );
      return;
    }
    socket.send(
      JSON.stringify({ text: mensagem, sala: SALA, users_id: user.id }),
    );
    setTexto("");
  }

  function renderMensagem({ item }) {
    const autor = item.sender || item.nome || "Estudante";
    return (
      <View style={styles.messageCard}>
        <Text style={styles.sender}>{autor}</Text>
        <Text style={styles.messageText}>{item.text || item.texto}</Text>
        {!!item.time && (
          <Text style={styles.time}>
            {new Date(item.time).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        )}
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <View style={styles.brand}>
          <Image
            source={{
              uri: "https://raw.githubusercontent.com/PeduZX/HiveStudyClub_Ts/refs/heads/main/frontend/src/assets/logo/logo.png",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brandText}>Hive{"\n"}Study Club</Text>
        </View>
        <TouchableOpacity
          onPress={() => setNavbar(!navbar)}
          accessibilityLabel="Abrir menu"
        >
          <Ionicons name="menu-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleRow}>
        <View>
          <Text style={styles.title}>Chat geral</Text>
          <Text style={styles.connection}>{status}</Text>
        </View>
        <Text style={styles.userName}>{user?.nome || "Visitante"}</Text>
      </View>

      {carregando ? (
        <View style={styles.loading}>
          <ActivityIndicator color="#6B21A8" />
          <Text style={styles.emptyText}>Carregando conversa...</Text>
        </View>
      ) : mensagens.length === 0 ? (
        <View style={styles.loading}>
          <Text style={styles.emptyText}>
            Ainda não há mensagens. Comece a conversa!
          </Text>
        </View>
      ) : (
        <FlatList
          ref={listaRef}
          style={styles.messages}
          contentContainerStyle={styles.messagesContent}
          data={mensagens}
          keyExtractor={(item, index) =>
            String(item.id || item.id_mensagem || index)
          }
          renderItem={renderMensagem}
          onContentSizeChange={() =>
            listaRef.current?.scrollToEnd({ animated: true })
          }
        />
      )}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Escreva uma mensagem..."
          placeholderTextColor="#777"
          value={texto}
          onChangeText={setTexto}
          onSubmitEditing={enviarMensagem}
          returnKeyType="send"
          maxLength={500}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={enviarMensagem}
          accessibilityLabel="Enviar mensagem"
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {navbar && (
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => goTo("Home")}>
            <Text style={{ fontSize: 16 }}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => goTo("Login")}>
            <Text style={{ fontSize: 16 }}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => goTo("Chat")}>
            <Text style={{ fontSize: 16 }}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => goTo("Perfil")}>
            <Text style={{ fontSize: 16 }}>Perfil</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F7F4FA" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#6B21A8",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 10 },
  logo: { width: 50, height: 50 },
  brandText: { fontSize: 13, fontWeight: "bold", color: "white" },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  title: { fontSize: 20, fontWeight: "700", color: "#34213F" },
  connection: { fontSize: 12, color: "#666", marginTop: 3 },
  userName: { fontSize: 13, color: "#6B21A8", fontWeight: "600" },
  messages: { flex: 1 },
  messagesContent: { padding: 14, gap: 10 },
  messageCard: {
    alignSelf: "flex-start",
    maxWidth: "90%",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 14,
    elevation: 1,
  },
  sender: {
    fontSize: 12,
    color: "#6B21A8",
    fontWeight: "700",
    marginBottom: 4,
  },
  messageText: { fontSize: 15, color: "#222" },
  time: { fontSize: 10, color: "#888", textAlign: "right", marginTop: 5 },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 24,
  },
  emptyText: { color: "#666", textAlign: "center" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E9E3EE",
  },
  input: {
    flex: 1,
    minHeight: 44,
    backgroundColor: "#F0EDF2",
    borderRadius: 22,
    paddingHorizontal: 16,
    color: "#222",
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#6B21A8",
    alignItems: "center",
    justifyContent: "center",
  },
navbar: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    gap: 14,
    zIndex: 999,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  navItem: { fontSize: 16, color: "#222" },
});
