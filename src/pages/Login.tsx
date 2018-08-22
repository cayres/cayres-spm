import React from "react";
import { Button, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";

import {Logo} from "../components/Logo";

interface IState {
    login: string;
    senha: string;
}

export class Login extends React.PureComponent<{}, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            login: "",
            senha: "",
        };

        this.changeLogin = this.changeLogin.bind(this);
        this.changeSenha = this.changeSenha.bind(this);
    }

    public render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <Logo />
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Login"
                        value={this.state.login}
                        onChangeText={this.changeLogin}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        secureTextEntry={true}
                        value={this.state.senha}
                        onChangeText={this.changeSenha}
                    />
                    <View style={styles.textWithButton}>
                        <Text>Ainda não possui cadastro?</Text>
                        <TouchableHighlight
                            style={styles.textButton}
                            onPress={() => alert("teste")}
                            underlayColor="#FFFFFF"
                        >
                            <Text style={{color: "#8FC74B" }}> Clique aqui!</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <Button
                    title="Entrar"
                    onPress={() => console.log("Entrar...")}
                    color="#2F4E78"
                />
            </View>
        );
    }

    private changeLogin(login: string): void {
        this.setState({login});
    }

    private changeSenha(senha: string): void {
        this.setState({senha});
    }
}

// styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
    },
    form: {
        alignItems: "center",
        alignSelf: "center",
    },
    input: {
        width: 300,
        maxHeight: 50,
        color: "#2F4E78",
    },
    textWithButton: {
        flexDirection: "row",
    },
    textButton: {

    },
  });
