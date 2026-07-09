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

export default function Home({ navigation }) {
  const [navbar, setNavbar] = useState(false);

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
            <Text
              style={{ fontSize: 13, fontWeight: "bold", color: "#7C3AED" }}
            >
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
            <Text style={styles.cardTitle}>Plataforma Colaborativa</Text>
            <Text style={styles.cardDescription}>
              Aprenda com conteúdos de qualidade.
            </Text>
          </View>

          <View style={styles.card}>
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/PeduZX/HiveStudyClub_Ts/refs/heads/main/frontend/src/assets/icons/cards/4.png",
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
                uri: "https://raw.githubusercontent.com/PeduZX/HiveStudyClub_Ts/refs/heads/main/frontend/src/assets/icons/cards/5.png",
              }}
              style={styles.cardImage}
            />
            <Text style={styles.cardTitle}>Plataforma Colaborativa</Text>
            <Text style={styles.cardDescription}>
              Aprenda com conteúdos de qualidade.
            </Text>
          </View>
        </View>



        <View>

        </View>


            {navbar == true && (
            <View style={styles.navbar}>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{fontSize: 16, }} >Login</Text>
              </TouchableOpacity>

              <TouchableOpacity  onPress={() => navigation.navigate("Chat")}>
                <Text style={{fontSize: 16, }} >Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
                <Text style={{fontSize: 16, }}  >Perfil</Text>
              </TouchableOpacity>
            </View>
          )}

        <View style={styles.footer}>
          <TouchableOpacity style={styles.btnLogin}>
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
  },

  navbar: {
    position: "absolute",
    flex: 1,
    justifyContent: "space-between",
    top: 60,
    right: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 30,
    zIndex: 999,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
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
    fontSize: 26,
    fontWeight: "800",
    color: "white",
    lineHeight: 32,
    marginBottom: 10,
  },

  titleSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 18,
    marginBottom: 20,
  },

  btnCadastro: {
    alignSelf: "flex-start",
    backgroundColor: "#FFCC00",
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 10,
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
    gap: 10,
  },

  card: {
    width: "47%",
    backgroundColor: "white",
    borderRadius: 14,
    padding: 14,
    gap: 6,
  },

  cardImage: {
    width: 40,
    height: 40,
    marginBottom: 4,
  },

  cardTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1a1a1a",
  },

  cardDescription: {
    fontSize: 10,
    color: "#666",
    lineHeight: 14,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: "63%",
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
