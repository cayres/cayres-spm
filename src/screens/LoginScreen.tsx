import React from "react";
import { Button, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import {Logo} from "../components/Logo";

interface IProp {
    navigation: NavigationScreenProp<any, any>;
}

export interface ILoginState {
    email: string;
    password: string;
}

export class LoginScreen extends React.PureComponent<IProp, ILoginState> {

    public static navigationOptions = {
        header: <View />,
    };

    constructor(props: IProp) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };

        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    public render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <Logo />
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        value={this.state.email}
                        onChangeText={this.changeEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={this.changePassword}
                    />
                    <Button
                        title="Entrar"
                        onPress={() => console.log("Entrar...")}
                        color="#2F4E78"
                        accessibilityLabel="Entrar"
                    />
                </View>
                <View style={styles.textWithButton}>
                    <Text>Ainda não possui cadastro?</Text>
                    <TouchableHighlight
                        style={styles.textButton}
                        onPress={() => this.props.navigation.navigate("Register")}
                        underlayColor="#FFFFFF"
                    >
                        <Text style={{color: "#8FC74B" }}> Crie sua conta.</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    private changeEmail(email: string): void {
        this.setState({email});
    }

    private changePassword(password: string): void {
        this.setState({password});
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
        marginBottom: 10,
    },
    textWithButton: {
        flexDirection: "row",
    },
    textButton: {

    },
  });
