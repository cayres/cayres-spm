import React from "react";
import { Image, Modal, StyleSheet, TextInput, View } from "react-native";
import { Button } from "react-native-material-ui";

interface SUModalProps {
    token: string;
    data?: SUModalState;
    handleSave: (value: SUModalState) => void;
    handleDelete: (id: number) => void;
}

export interface SUModalState {
    url?: string;
    user?: string;
    password?: string;
    id?: number;
}

interface ModalState {
    security: boolean;
    visible: boolean;
}

const INITIAL_STATE: SUModalState = {
    url: "",
    password: "",
    user: "",
    id: 0,
};

class SiteUserModal extends React.PureComponent<SUModalProps, SUModalState & ModalState> {

    constructor(props: SUModalProps) {
        super(props);
        this.state = {
            ...INITIAL_STATE,
            security: true,
            visible: false,
        };

        this.changeSecurity = this.changeSecurity.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    public render() {
        const { token } = this.props;
        const { password, url, user, security, visible } = this.state;

        const site = url!.indexOf("://") > -1 ? url!.split("://")[1] : url;

        return (
            <Modal animationType="slide" visible={visible} onRequestClose={() => this.close()}>
                <View style={styles.container}>
                    <Image source={{
                        uri: `https://dev.people.com.ai/mobile/api/v2/logo/${site ? site : "unknow"}`,
                        method: "GET",
                        headers: {
                            Authorization: token,
                        },
                    }} style={styles.image} />
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder={"Site"}
                            value={url}
                            key="site"
                            autoCapitalize="none"
                            onChangeText={(text) => this.setState({url: text.trim()})}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={"User"}
                            value={user}
                            onChangeText={(text) => this.setState({user: text})}
                        />
                        <View style={styles.buttonView}>
                            <TextInput
                                style={[styles.input, { width: 240 }]}
                                placeholder={"Password"}
                                secureTextEntry={security}
                                value={password}
                                onChangeText={(text) => this.setState({password: text})}
                            />
                            <Button onPress={this.changeSecurity} text="" icon={security ? "visibility" : "visibility-off"} />
                        </View>
                    </View>
                    <View style={styles.buttonView}>
                        <Button onPress={() => this.close()} text="" icon="arrow-back" />
                        <Button accent onPress={this.onClickDelete} text="" icon="delete" />
                        <Button onPress={this.onClickSave} text="" icon="done" style={{text: {color: "#8FC74B"}}} />
                    </View>
                </View>
            </Modal>
        );
    }

    public open(value?: SUModalState) {
        this.setState({visible: true, ...value});
    }

    public close() {
        this.setState({visible: false, ...INITIAL_STATE});
    }

    private changeSecurity() {
        const { security } = this.state;
        this.setState({security: !security});
    }

    private onClickSave(): void {
        const { security, visible, ...value} = this.state;
        const { handleSave } = this.props;
        this.close();
        handleSave(value);
    }

    private onClickDelete(): void {
        const { id } = this.state;
        const { handleDelete } = this.props;
        this.close();
        handleDelete(id!);
    }
}

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
    image: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    buttonView: {
        flexDirection: "row",
        alignItems: "baseline",
    },
});

export default SiteUserModal;
