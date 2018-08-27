// node_modules
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import React from "react";
import { Platform , StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
// @ts-ignore
import FingerprintScanner from "react-native-fingerprint-scanner";
import * as Keychain from "react-native-keychain";
import { UserCredentials } from "react-native-keychain";
import { Button } from "react-native-material-ui";
// @ts-ignore
import RNSecureKeyStore from "react-native-secure-key-store";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

// modules
import { loginError, loginSuccess } from "../store/authentication/actions";
import { httpRequest } from "../util";

// components
import {EmailInput} from "../components/EmailInput";
import FingerprintModal from "../components/FingerprintModal";
import {Logo} from "../components/Logo";
import { ApplicationState } from "../store";

interface Prop {
    navigation: NavigationScreenProp<any, any>;
}

interface PropsFromState {
    errors: string;
}

interface PropsFromDispatch {
    loginError: typeof loginError;
    loginSuccess: typeof loginSuccess;
}

type AllProps = Prop & PropsFromDispatch & PropsFromState;

export interface ILoginState {
    email: string;
    password: string;
}

export interface FingerState {
    showFingerprintPopup: boolean;
}

class LoginScreen extends React.PureComponent<AllProps, ILoginState & FingerState> {

    public static navigationOptions = {
        header: <View />,
    };

    constructor(props: AllProps) {
        super(props);

        this.state = {
            email: "",
            password: "",
            showFingerprintPopup: false,
        };

        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.login = this.login.bind(this);
        this.scannerRelease = this.scannerRelease.bind(this);
    }

    public componentDidMount() {
        FingerprintScanner.isSensorAvailable().then(() => {
            Keychain.getGenericPassword()
                .then((credentials) => {

                    if (!credentials) {
                        return;
                    }

                    this.setState({showFingerprintPopup: true}, () => {
                        const {username, password} = credentials as UserCredentials;
                        FingerprintScanner
                            .authenticate({ onAttempt: (erro: any) => alert(erro.message)})
                            .then(() => {
                                this.setState({showFingerprintPopup: false});
                                this.login(username, password);
                            })
                            .catch((error: any) => {
                                alert(error.message);
                            });
                    });

                })
                .catch((error: any) => {
                    alert(error.message);
                });

        }).catch(() => {
            this.setState({showFingerprintPopup: false});
        });
    }

    public componentWillUnmount() {
        this.scannerRelease();
    }

    public render(): React.ReactNode {

        const { errors } = this.props;
        const { showFingerprintPopup } = this.state;
        console.log(errors);
        const err = errors ? <Text style={{color: "red"}}>{errors}</Text> : false;

        return (
            <View style={styles.container}>
                <Logo />
                <FingerprintModal visible={showFingerprintPopup} onRequestClose={this.scannerRelease} />
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
                        text="Entrar"
                        onPress={this.handleClick}
                        style={ {container: {backgroundColor: "#2F4E78"}, text: {color: "#FFFFFF"}}}
                    />
                </View>
                <View style={styles.textWithButton}>
                    <Text>Ainda não possui cadastro?</Text>
                    <TouchableHighlight
                        onPress={() => this.props.navigation.navigate("Register")}
                        underlayColor="#FFFFFF"
                    >
                        <Text style={{color: "#8FC74B" }}> Crie sua conta.</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    private scannerRelease() {
        if (Platform.OS === "android") {
            FingerprintScanner.release();
        }
        this.setState({showFingerprintPopup: false});
    }

    private changeEmail(email: string): void {
        this.setState({email: email.trim()});
    }

    private changePassword(password: string): void {
        this.setState({password: password.trim()});
    }

    private handleClick(): void {
        const {email, password} = this.state;
        this.login(email, password);
    }

    private login(email: string, password: string): void {
        const { loginError, loginSuccess, navigation } = this.props;

        const request: AxiosRequestConfig = {
            method: "POST",
            url: "login",
            data: {email, password},
        };

        const onSuccess = async (response: AxiosResponse) => {
            console.log(Keychain);

            try {
                const genericPassword = await Keychain.getGenericPassword();
                if (!genericPassword) {
                    const saved = await Keychain.setGenericPassword(email, password);
                    console.log(saved);
                    if (saved) {
                        FingerprintScanner.isSensorAvailable().then(() => {

                            const genericPassword = Keychain.getGenericPassword();
                            if (!genericPassword) {
                                return;
                            }
                            FingerprintScanner
                            .authenticate({ onAttempt: (erro: any) => alert(erro.message)})
                            .then(() => {
                                this.setState({showFingerprintPopup: false});
                                loginSuccess(response.data.token, email);
                                this.props.navigation.push("Home");
                            })
                            .catch((error: any) => {
                                alert(error.message);
                            });
                        }).catch(() => {
                            this.setState({showFingerprintPopup: false});
                        });
                        this.setState({showFingerprintPopup: true});
                        return;
                    }
                }
                loginSuccess(response.data.token, email);
                navigation.push("Home");

            } catch (error) {
                alert(error.message);
            }
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
});

const mapStateToProps = (state: ApplicationState) => ({
    errors: state.authentication.errors,
});
const mapDistpachToProps = (dispach: Dispatch) => bindActionCreators({ loginError, loginSuccess }, dispach);

export default connect(mapStateToProps, mapDistpachToProps)(LoginScreen);
