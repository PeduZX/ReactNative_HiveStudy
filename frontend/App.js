import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import CadastrarUsuario from "./screens/CadastrarUsuario";
import Login from "./screens/Login";
import Chat from "./screens/Chat";
import Perfil from "./screens/Perfil";
import EsquceuSenha from "./screens/EsqueceuSenha";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cadastro" component={CadastrarUsuario} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="EsqueceuSenha" component={EsquceuSenha} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Perfil" component={Perfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
