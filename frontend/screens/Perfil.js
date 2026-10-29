import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { API_URL } from "../config/api";

export default function Perfil({ navigation, route }) {
  const [navbar, setNavbar] = useState(false);
  const [user, setUser] = useState(route?.params?.user || null);
  const [nome, setNome] = useState(route?.params?.user?.nome || "");
  const [senha, setSenha] = useState("");
  const [pontos, setPontos] = useState(route?.params?.user?.pontos || 0);
  const [salvando, setSalvando] = useState(false);

   const goTo = (screen) => {
    setNavbar(false);
    navigation.navigate(screen, route?.params?.user ? { user: route.params.user } : undefined);
  };

  useEffect(() => {
    const usuarioDaRota = route?.params?.user;
    if (usuarioDaRota) {
      setUser(usuarioDaRota);
      setNome(usuarioDaRota.nome || "");
      setPontos(usuarioDaRota.pontos || 0);
    }
  }, [route?.params?.user]);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`${API_URL}/exibirPontos?userId=${encodeURIComponent(user.id)}`)
      .then(async (resposta) => {
        const dados = await resposta.json();
        if (!resposta.ok)
          throw new Error(dados.mensagem || "Erro ao buscar pontos");
        const usuarioPontos = dados.pontos?.[0]?.pontos ?? 0;
        setPontos(usuarioPontos);
      })
      .catch((erro) =>
        console.warn("Não foi possível carregar os pontos:", erro),
      );
  }, [user?.id]);

  function avisar(titulo, mensagem) {
    if (Platform.OS === "web") window.alert(`${titulo}: ${mensagem}`);
    else Alert.alert(titulo, mensagem);
  }

  async function escolherFoto() {
    if (!user?.id) {
      avisar("Entre na sua conta", "Faça login antes de editar seu perfil.");
      return;
    }
    try {
      const escolha = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.75,
        base64: true,
      });
      if (escolha.canceled) return;
      const foto = escolha.assets?.[0];
      if (
        !foto?.base64 ||
        !["image/jpeg", "image/png", "image/webp"].includes(foto.mimeType)
      ) {
        avisar("Foto incompatível", "Escolha uma imagem JPEG, PNG ou WebP.");
        return;
      }
      if (foto.fileSize > 4 * 1024 * 1024) {
        avisar("Arquivo grande", "Escolha uma foto com até 4 MB.");
        return;
      }
      const resposta = await fetch(`${API_URL}/editarUsers/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fotoPerfil: `data:${foto.mimeType};base64,${foto.base64}`,
        }),
      });
      const dados = await resposta.json();
      if (!resposta.ok)
        throw new Error(dados.mensagem || "Não foi possível salvar a foto.");
      setUser((atual) => ({ ...atual, fotoPerfil: dados.fotoPerfil }));
      avisar("Foto atualizada", "Sua foto de perfil foi salva.");
    } catch (erro) {
      avisar(
        "Erro",
        erro.message || "Não foi possível selecionar ou enviar a foto.",
      );
    }
  }

  async function removerFoto() {
    if (!user?.id || !user?.fotoPerfil) return;
    try {
      const resposta = await fetch(`${API_URL}/editarUsers/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fotoPerfil: null }),
      });
      const dados = await resposta.json();
      if (!resposta.ok)
        throw new Error(dados.mensagem || "Não foi possível remover a foto.");
      setUser((atual) => ({ ...atual, fotoPerfil: null }));
      avisar("Foto removida", "A foto de perfil foi removida.");
    } catch (erro) {
      avisar("Erro", erro.message || "Não foi possível remover a foto.");
    }
  }

  async function salvarPerfil() {
    if (!user?.id) {
      avisar("Entre na sua conta", "Faça login antes de editar seu perfil.");
      return;
    }
    const alteracoes = {};
    if (nome.trim() && nome.trim() !== user.nome) alteracoes.nome = nome.trim();
    if (senha) alteracoes.senha = senha;
    if (!Object.keys(alteracoes).length) {
      avisar("Nada para salvar", "Altere o nome ou informe uma nova senha.");
      return;
    }
    setSalvando(true);
    try {
      const resposta = await fetch(`${API_URL}/editarUsers/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alteracoes),
      });
      const dados = await resposta.json();
      if (!resposta.ok)
        throw new Error(
          dados.mensagem || "Não foi possível atualizar o perfil.",
        );
      setUser((atual) => ({ ...atual, nome: alteracoes.nome || atual.nome }));
      setSenha("");
      avisar("Perfil atualizado", dados.mensagem);
    } catch (erro) {
      avisar("Erro", erro.message || "Não foi possível atualizar o perfil.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            source={{
              uri: "https://raw.githubusercontent.com/PeduZX/HiveStudyClub_Ts/refs/heads/main/frontend/src/assets/logo/logo.png",
            }}
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 13, fontWeight: "bold", color: "#7C3AED" }}>
            {`Hive\nStudy Club`}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setNavbar(!navbar)}>
          <Ionicons name="menu-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.avatarCard}>
          <View style={styles.avatarWrapper}>
            {user?.fotoPerfil ? (
              <Image
                source={{ uri: `${API_URL}${user.fotoPerfil}` }}
                style={styles.avatarImg}
              />
            ) : (
              <View style={[styles.avatarImg, styles.avatarPlaceholder]}>
                <Ionicons name="person" size={40} color="#7C3AED" />
              </View>
            )}
            <TouchableOpacity
              style={styles.avatarBadge}
              onPress={escolherFoto}
              accessibilityLabel="Adicionar foto de perfil"
            >
              <Ionicons name="camera-outline" size={16} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.avatarDelete}
              onPress={removerFoto}
              accessibilityLabel="Remover foto de perfil"
            >
              <Ionicons name="trash-outline" size={14} color="white" />
            </TouchableOpacity>
          </View>

          <Text style={styles.profileName}>
            {user?.nome || "Entre para ver seu perfil"}
          </Text>
          <Text style={styles.profileEmail}>{user?.email || ""}</Text>

          <View style={styles.profileTag}>
            <Ionicons name="sparkles-outline" size={14} color="#7C3AED" />
            <Text style={styles.profileTagText}>Membro ativo</Text>
          </View>
        </View>

        <View style={styles.editCard}>
          <View style={styles.editCardTitleRow}>
            <Ionicons name="create-outline" size={16} color="#333" />
            <Text style={styles.editCardTitle}>Editar Perfil</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder={user?.nome || "Seu nome completo"}
              placeholderTextColor="#999"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Nova senha</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#999"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          <TouchableOpacity
            style={styles.btnSave}
            onPress={salvarPerfil}
            disabled={salvando}
          >
            <Ionicons name="save-outline" size={18} color="white" />
            <Text style={styles.btnSaveText}>
              {salvando ? "Salvando..." : "Salvar alterações"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => navigation.navigate("Login")}
          >
            <Ionicons name="log-out-outline" size={18} color="#D85A30" />
            <Text style={styles.logoutBtnText}>Sair</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Seu Progresso</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIconWrap, { backgroundColor: "#FAEEDA" }]}>
              <Ionicons name="trophy" size={22} color="#BA7517" />
            </View>
            <Text style={styles.statValue}>
              {Number(pontos).toLocaleString("pt-BR")}
            </Text>
            <Text style={styles.statLabel}>Pontos totais</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconWrap, { backgroundColor: "#EEEDFE" }]}>
              <Ionicons name="book-outline" size={22} color="#534AB7" />
            </View>
            <Text style={styles.statValue}>38</Text>
            <Text style={styles.statLabel}>Sessões de estudo</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconWrap, { backgroundColor: "#EAF3DE" }]}>
              <Ionicons name="flame-outline" size={22} color="#3B6D11" />
            </View>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Dias seguidos</Text>
          </View>
        </View>

        <Text style={styles.sectionTitleSmall}>Conquistas</Text>

        <View style={styles.achievementsGrid}>
          <View style={styles.achievementCard}>
            <View
              style={[styles.achievementIcon, { backgroundColor: "#FAEEDA" }]}
            >
              <Ionicons name="trophy" size={20} color="#BA7517" />
            </View>
            <Text style={styles.achievementName}>Primeira vitória</Text>
            <Text style={styles.achievementDesc}>Completou sua 1ª sessão</Text>
          </View>

          <View style={styles.achievementCard}>
            <View
              style={[styles.achievementIcon, { backgroundColor: "#EEEDFE" }]}
            >
              <Ionicons name="flame" size={20} color="#7F77DD" />
            </View>
            <Text style={styles.achievementName}>Em chamas</Text>
            <Text style={styles.achievementDesc}>7 dias seguidos</Text>
          </View>

          <View style={styles.achievementCard}>
            <View
              style={[styles.achievementIcon, { backgroundColor: "#EAF3DE" }]}
            >
              <Ionicons name="people" size={20} color="#34d399" />
            </View>
            <Text style={styles.achievementName}>Colaborador</Text>
            <Text style={styles.achievementDesc}>Entrou em 3 grupos</Text>
          </View>

          <View style={[styles.achievementCard, styles.achievementLocked]}>
            <View
              style={[styles.achievementIcon, { backgroundColor: "#F1EFE8" }]}
            >
              <Ionicons name="lock-closed-outline" size={20} color="#888780" />
            </View>
            <Text style={styles.achievementName}>Mestre do hive</Text>
            <Text style={styles.achievementDesc}>Alcance 5.000 pts</Text>
          </View>
        </View>

        <View style={styles.activityCard}>
          <View style={styles.activityCardTitleRow}>
            <Ionicons name="time-outline" size={16} color="#BA7517" />
            <Text style={styles.activityCardTitle}>Atividade recente</Text>
          </View>

          <View style={styles.activityItem}>
            <View style={[styles.activityDot, { backgroundColor: "#FAEEDA" }]}>
              <Ionicons name="trophy-outline" size={14} color="#BA7517" />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityText}>
                Você ganhou <Text style={styles.bold}>+50 pontos</Text> no
                desafio semanal
              </Text>
              <Text style={styles.activityTime}>Há 2 horas</Text>
            </View>
          </View>

          <View style={styles.activityDivider} />

          <View style={styles.activityItem}>
            <View style={[styles.activityDot, { backgroundColor: "#EEEDFE" }]}>
              <Ionicons name="people-outline" size={14} color="#534AB7" />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityText}>
                Entrou no grupo{" "}
                <Text style={styles.bold}>Matemática Avançada</Text>
              </Text>
              <Text style={styles.activityTime}>Ontem</Text>
            </View>
          </View>

          <View style={styles.activityDivider} />

          <View style={styles.activityItem}>
            <View style={[styles.activityDot, { backgroundColor: "#EAF3DE" }]}>
              <Ionicons name="book-outline" size={14} color="#3B6D11" />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityText}>
                Completou <Text style={styles.bold}>sessão de estudo</Text> de
                45 min
              </Text>
              <Text style={styles.activityTime}>Há 2 dias</Text>
            </View>
          </View>
        </View>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#6B21A8",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
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

  container: {
    padding: 16,
    marginTop: 40,
    paddingBottom: 40,
  },

  avatarCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
  },

  avatarWrapper: {
    position: "relative",
    marginBottom: 12,
  },

  avatarImg: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#EEEDFE",
  },

  avatarPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },

  avatarBadge: {
    position: "absolute",
    bottom: 0,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#7C3AED",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
  },

  avatarDelete: {
    position: "absolute",
    bottom: 0,
    left: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#D85A30",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
  },

  profileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },

  profileEmail: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },

  profileTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#EEEDFE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },

  profileTagText: {
    fontSize: 12,
    color: "#534AB7",
    fontWeight: "500",
  },

  editCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },

  editCardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },

  editCardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  fieldGroup: {
    marginBottom: 14,
  },

  label: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#F1EFE8",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
  },

  btnSave: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#7C3AED",
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 6,
  },

  btnSaveText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    marginTop: 8,
  },

  logoutBtnText: {
    color: "#D85A30",
    fontSize: 14,
    fontWeight: "500",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    marginBottom: 16,
  },

  sectionTitleSmall: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 12,
  },

  statsGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },

  statCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
  },

  statIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  statLabel: {
    fontSize: 11,
    color: "#888",
    textAlign: "center",
    marginTop: 2,
  },

  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },

  achievementCard: {
    width: "47%",
    backgroundColor: "white",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
  },

  achievementLocked: {
    opacity: 0.6,
  },

  achievementIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  achievementName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },

  achievementDesc: {
    fontSize: 10,
    color: "#999",
    textAlign: "center",
    marginTop: 2,
  },

  activityCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 18,
  },

  activityCardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 14,
  },

  activityCardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  activityItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },

  activityDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  activityInfo: {
    flex: 1,
  },

  activityText: {
    fontSize: 13,
    color: "#333",
    lineHeight: 18,
  },

  bold: {
    fontWeight: "700",
  },

  activityTime: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },

  activityDivider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 12,
  },
});
