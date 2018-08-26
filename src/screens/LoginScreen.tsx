// node_modules
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import React from "react";
import { Button, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

// modules
import { loginError, loginSuccess } from "../store/authentication/actions";
import { httpRequest } from "../util";

// components
import {EmailInput} from "../components/EmailInput";
import {Logo} from "../components/Logo";
import { ApplicationState } from "../store";

interface IProp {
    navigation: NavigationScreenProp<any, any>;
}

interface PropsFromState {
    errors: string;
}

interface PropsFromDispatch {
    loginError: typeof loginError;
    loginSuccess: typeof loginSuccess;
}

type AllProps = IProp & PropsFromDispatch & PropsFromState;

export interface ILoginState {
    email: string;
    password: string;
}

class LoginScreen extends React.PureComponent<AllProps, ILoginState> {

    public static navigationOptions = {
        header: <View />,
    };

    constructor(props: AllProps) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };

        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    public render(): React.ReactNode {

        const { errors } = this.props;
        console.log(errors);
        const err = errors ? <Text style={{color: "red"}}>{errors}</Text> : false;

        return (
            <View style={styles.container}>
                <Logo />
                {err}
                <View style={styles.form}>
                    <EmailInput
                        textInputStyle={styles.input}
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
                        onPress={this.handleClick}
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
        this.setState({email: email.trim()});
    }

    private changePassword(password: string): void {
        this.setState({password: password.trim()});
    }

    private handleClick(): void {
        const { loginError, loginSuccess, navigation } = this.props;

        const request: AxiosRequestConfig = {
            method: "POST",
            url: "login",
            data: this.state,
        };

        const onSuccess = (response: AxiosResponse) => {
            loginSuccess(response.data.token);
            navigation.push("Home");
        };

        const onErr = (erro: AxiosError) => {
            if (erro.response) {
                const data = erro.response.data;
                loginError(`${data.message}. ${(data.errors || []).join(",")}`);
                return;
            }
            loginError(erro.message);
        };

        httpRequest(request, onSuccess, onErr);
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

const mapStateToProps = (state: ApplicationState) => ({
    errors: state.authentication.errors,
});
const mapDistpachToProps = (dispach: Dispatch) => bindActionCreators({ loginError, loginSuccess }, dispach);

export default connect(mapStateToProps, mapDistpachToProps)(LoginScreen);
