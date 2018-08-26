import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { ApplicationState } from "../store";
import { loginError, loginSuccess } from "../store/authentication/actions";

import {EmailInput, isValidEmail} from "../components/EmailInput";
import {Logo} from "../components/Logo";
import {isValidPassword, PasswordCreator} from "../components/PasswordCreator";
import { httpRequest } from "../util";

export interface IRegisterState {
    name: string;
    email: string;
    password: string;
}

interface RegisterProps {
    navigation: NavigationScreenProp<any, any>;
}

interface PropsFromState {
    errors: string;
}

interface PropsFromDispatch {
    loginError: typeof loginError;
    loginSuccess: typeof loginSuccess;
}

interface ErroResponse {
    type?: string;
    message: string;
    errors?: any;
}

type AllProps = RegisterProps & PropsFromDispatch & PropsFromState;

class RegisterScreen extends React.PureComponent<AllProps, IRegisterState> {

    public static navigationOptions = {
        title: "CRIAR CONTA",
    };

    constructor(props: AllProps) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
        };

        this.changeName = this.changeName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    public render(): React.ReactNode {
        const { email, name, password } = this.state;
        const  {errors} = this.props;
        const disabled = !(isValidEmail(email) && isValidPassword(password) && name.trim() !== "");

        const err = errors ? <Text style={{color: "red", width: 300}}>{errors}</Text> : false;

        return (
            <View style={styles.container}>
                <Logo />
                {err}
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        value={name}
                        onChangeText={this.changeName}
                    />
                    <EmailInput
                        textInputStyle={styles.input}
                        value={email}
                        onChangeText={this.changeEmail}
                    />
                    <PasswordCreator
                        textInputStyle={styles.input}
                        value={password}
                        onChangeText={this.changePassword}
                    />
                </View>
                <Button
                    title="Registrar"
                    onPress={this.handleClick}
                    color="#2F4E78"
                    accessibilityLabel="Registrar"
                    disabled={disabled}
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

    private handleClick() {
        const { loginError, loginSuccess, navigation } = this.props;

        const request: AxiosRequestConfig = {
            method: "POST",
            url: "register",
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
            }
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
    },
    textWithButton: {
        flexDirection: "row",
    },
});

const mapStateToProps = (state: ApplicationState) => ({
    errors: state.authentication.errors,
});
const mapDistpachToProps = (dispach: Dispatch) => bindActionCreators({ loginError, loginSuccess }, dispach);

export default connect(mapStateToProps, mapDistpachToProps)(RegisterScreen);
