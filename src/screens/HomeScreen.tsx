// node_modules
import React from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { ActionButton } from "react-native-material-ui";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";

import { ApplicationState } from "../store";

import SiteUserCard from "../components/SiteUserCard";

interface IProp {
    navigation: NavigationScreenProp<any, any>;
}

interface PropsFromState {
    token: string;
}

type AllProps = IProp & PropsFromState;

export interface HomeState {
    modalVisible: boolean;
}

class HomeScreen extends React.PureComponent<AllProps, HomeState> {

    public static navigationOptions = {
        header: <View />,
    };

    constructor(props: AllProps) {
        super(props);

        this.state = {
            modalVisible: false,
        };

        this.setModalVisible = this.setModalVisible.bind(this);
    }

    public render(): React.ReactNode {

        const { token } = this.props;

        return (
            <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    alert("Modal has been closed.");
                }}>
                <View style={{marginTop: 22}}>
                    <View>
                    <Text>Hello World!</Text>

                    <TouchableHighlight
                        onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <Text>Hide Modal</Text>
                    </TouchableHighlight>
                    </View>
                </View>
            </Modal>

                <FlatList
                    data={[
                        {url: "http://facebook.com", user: "rodrigo"},
                        {url: "http://globo.com", user: "rodrigo"},
                        {url: "http://playboy.com", user: "rodrigo"},
                        {url: "http://uol.com.br", user: "rodrigo"},
                        {url: "http://metro1.com.br", user: "rodrigo"},
                        {url: "http://g1.com.br", user: "rodrigo"},
                        {url: "http://atarde.com.br", user: "rodrigo"},
                        {url: "http://terra.com.br", user: "rodrigo"},
                        {url: "https://github.io", user: "rodrigo"},
                        {url: "http://gmail.com", user: "rodrigo"},
                    ]}
                    renderItem={({item}) => <SiteUserCard token={token} url={item.url} user={item.user} />}
                />
                <ActionButton
                    onPress={() => this.setModalVisible(true)}
                    style={{container: {backgroundColor: "#8FC74B"}}}
                />
            </View>
        );
    }

    private setModalVisible(visible: boolean ): void {
        this.setState({modalVisible: visible});
    }
}

// styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const mapStateToProps = (state: ApplicationState) => ({
    token: state.authentication.token,
});

// const mapDistpachToProps = (dispach: Dispatch) => bindActionCreators({ loginError, loginSuccess }, dispach);

export default connect(mapStateToProps, undefined)(HomeScreen);
