
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Home({ navigation }) {
  const [navbar, setNavbar] = useState(false);

  const goTo = (screen) => {
    setNavbar(false);
    navigation.navigate(screen);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.containerHome}
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
            <Text style={{ fontSize: 13, fontWeight: "bold", color: "#7C3AED" }}>
              {`Hive\nStudy Club`}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setNavbar(!navbar)}>
            <Ionicons name="menu-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.titleSection}>
          <View style={styles.titleBadge}>
            <Text style={styles.titleBadgeText}>HIVE STUDY CLUB</Text>
          </View>
          <Text style={styles.title}>Entre em nosso{"\n"}clube de estudo!</Text>
          <Text style={styles.titleSubtitle}>
            Conecte-se com outros estudantes, evolua junto e alcance seus
            objetivos.
          </Text>
          <TouchableOpacity
            style={styles.btnCadastro}
            onPress={() => navigation.navigate("Cadastro")}
          >
            <Text style={styles.btnCadastroText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerCards}>
          <View style={styles.card}>
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/PeduZX/HiveStudyClub_Ts/refs/heads/main/frontend/src/assets/icons/cards/2.png",
              }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Plataforma Colaborativa</Text>
            <Text style={styles.cardDescription}>
              Aprenda com conteúdos de qualidade.
            </Text>
          </View>

          <View style={styles.card}>
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/PeduZX/HiveStudyClub_Ts/refs/heads/main/frontend/src/assets/icons/cards/3.png",
              }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Mentoria Personalizada</Text>
            <Text style={styles.cardDescription}>
              Tire dúvidas com quem já passou pelo mesmo desafio.
            </Text>
          </View>

          <View style={styles.card}>
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/PeduZX/HiveStudyClub_Ts/refs/heads/main/frontend/src/assets/icons/cards/4.png",
              }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Grupos de Estudo</Text>
            <Text style={styles.cardDescription}>
              Estude em grupo e mantenha o foco nos seus objetivos.
            </Text>
          </View>

          <View style={styles.card}>
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/PeduZX/HiveStudyClub_Ts/refs/heads/main/frontend/src/assets/icons/cards/5.png",
              }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Acompanhamento</Text>
            <Text style={styles.cardDescription}>
              Acompanhe sua evolução com métricas simples.
            </Text>
          </View>
        </View>
<View style={{ flex: 1, alignItems: "center", width: "100%", paddingHorizontal: 24 }}>
  <Image
    style={{ borderRadius: 16, width: "85%", height: 200, marginTop: 60 }}
    source={{
      uri: "https://raw.githubusercontent.com/PeduZX/ReactNative_HiveStudy/refs/heads/master/frontend/frontend/assets/fotoHome.png",
    }}
  />

  <Text
    style={{
      fontSize: 20,
      fontWeight: "700",
      color: "white",
      textAlign: "center",
      marginTop: 28,
      lineHeight: 26,
    }}
  >
    Conecte-se com outros estudantes, evolua junto e alcance seus objetivos.
  </Text>

  <Text
    style={{
      fontSize: 14,
      fontWeight: "400",
      color: "rgba(255,255,255,0.75)",
      textAlign: "center",
      marginTop: 10,
      lineHeight: 20,
    }}
  >
    Junte-se a uma comunidade de estudantes e cresça juntos.
  </Text>
</View>

        {navbar && (
          <View style={styles.navbar}>
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

        <View style={styles.footer}>
          <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.btnLoginText}>Login</Text>
          </TouchableOpacity>
          <Ionicons name="logo-facebook" size={24} color="#9036B3" />
          <Ionicons name="logo-instagram" size={24} color="#9036B3" />
          <Ionicons name="logo-linkedin" size={24} color="#9036B3" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerHome: {
    flexGrow: 1,
    backgroundColor: "#6B21A8",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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

  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 24,
  },

  titleBadge: {
    alignSelf: "flex-start",
    borderWidth: 1.5,
    borderColor: "#FFCC00",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 14,
  },

  titleBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFCC00",
    letterSpacing: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "white",
    lineHeight: 34,
    marginBottom: 12,
  },

  titleSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 19,
    marginBottom: 22,
  },

  btnCadastro: {
    alignSelf: "flex-start",
    backgroundColor: "#FFCC00",
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  btnCadastroText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1a1a1a",
  },

  containerCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 14,
    gap: 12,
  },

  card: {
    width: "47%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    gap: 6,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },

  cardImage: {
    width: 40,
    height: 40,
    marginBottom: 6,
  },

  cardTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1a1a1a",
  },

  cardDescription: {
    fontSize: 10.5,
    color: "#666",
    lineHeight: 15,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginTop: 20,
  },

  btnLogin: {
    backgroundColor: "#FFCC00",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 7,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  btnLoginText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1a1a1a",
  },
});
