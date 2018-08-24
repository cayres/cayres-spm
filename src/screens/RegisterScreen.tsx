import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import {Logo} from "../components/Logo";
import {isValidPassword, PasswordCreator} from "../components/PasswordCreator";

export interface IRegisterState {
    name: string;
    email: string;
    password: string;
}

interface IRegisterProps {
    navigation: NavigationScreenProp<any, any>;
}

export class RegisterScreen extends React.PureComponent<IRegisterProps, IRegisterState> {

    public static navigationOptions = {
        title: "CRIAR CONTA",
    };

    constructor(props: IRegisterProps) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
        };

        this.changeName = this.changeName.bind(this);
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
                        placeholder="Nome"
                        value={this.state.name}
                        onChangeText={this.changeName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        value={this.state.email}
                        onChangeText={this.changeEmail}
                    />
                    <PasswordCreator
                        textInputStyle={styles.input}
                        value={this.state.password}
                        onChangeText={this.changePassword}
                    />
                </View>
                <Button
                    title="Registrar"
                    onPress={() => console.log("Entrar...")}
                    color="#2F4E78"
                    accessibilityLabel="Registrar"
                />
            </View>
        );
    }

    private changePassword(password: string): void {
        this.setState({password});
    }

    private changeName(name: string): void {
        this.setState({name});
    }

    private changeEmail(email: string): void {
        this.setState({email});
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
