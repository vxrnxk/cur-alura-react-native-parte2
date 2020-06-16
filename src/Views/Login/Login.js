import React, {Fragment , useState} from 'react';
import {
  Text,
  TextInput,
  Button,
  View,
  Platform

} from "react-native";
import AsyncStorage from "@react-native-community/async-storage"
import estilo from "./estilo"
import efetuarLogin from '../../api/login';

const Login = ({ navigation }) => {

const [usuario, setUsuario] = useState("");
const [senha, setSenha] = useState("");
const [mensagemErro, setMensagemErro] = useState("")

  const tentarLogar = async ()=> {
    try{
      const token = await efetuarLogin(usuario, senha);
      await AsyncStorage.setItem("instalura_token", token);
      //Ir para tela de Feed
      navigation.replace("Feed",{ nome : usuario })

    }catch(erro){
      setMensagemErro(erro.message)
    }
   
  }
  
  return (
    <Fragment>
      <View style={estilo.container}>
        <TextInput 
        style={estilo.inputs}
         placeholder="Usuário"
         onChangeText={texto => setUsuario(texto)}
         />
         <TextInput 
         style={estilo.inputs}
         placeholder="Senha"
         secureTextEntry={true}
         onChangeText={texto => setSenha(texto)}
         />
         <Text>{mensagemErro}</Text>
      </View>

      <View style={estilo.botaoView}>
        <Button title="Entrar" onPress={tentarLogar}/>
      </View>
      

    </Fragment>
    

  )
};

Login.navigationOptions = () => {
  const opcoes = {
    title:"Login"
  }
  if(Platform.OS == "android"){
    opcoes.header = null
  }
  

  return opcoes;
}
export default Login;
