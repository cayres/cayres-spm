// node_modules
import _ from "lodash";
import React from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { ActionButton } from "react-native-material-ui";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";

import { ApplicationState } from "../store";

import SiteUserCard from "../components/SiteUserCard";
import SiteUserModal, { SUModalState } from "../components/SiteUserModal";

interface IProp {
    navigation: NavigationScreenProp<any, any>;
}

interface PropsFromState {
    token: string;
}

type AllProps = IProp & PropsFromState;

export interface HomeState {
    modalVisible: boolean;
    data: SUModalState[];
}

class HomeScreen extends React.PureComponent<AllProps, HomeState> {

    public static navigationOptions = {
        header: <View />,
    };

    private modal!: SiteUserModal;

    constructor(props: AllProps) {
        super(props);

        this.state = {
            modalVisible: false,
            data: [
                {id: 1, url: "http://facebook.com", user: "rodrigo", password: "123456"},
                {id: 2, url: "http://globo.com", user: "rodrigo", password: "123456"},
            ],
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    public render(): React.ReactNode {

        const { token } = this.props;
        const { data } = this.state;

        return (
            <View style={styles.container}>
                <SiteUserModal
                    ref={(modal) => this.modal = modal!}
                    token={token}
                    handleSave={this.handleSave}
                    handleDelete={this.handleDelete}
                />
                <FlatList
                    data={data}
                    renderItem={({item}) => (
                        <SiteUserCard
                            token={token}
                            url={item.url!}
                            user={item.user!}
                            id={item.id!}
                            password={item.password!}
                            handleEdit={() => this.modal.open(item)}
                            handleDelete={() => this.handleDelete(item.id!)}
                        />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                <ActionButton
                    onPress={() => this.modal.open()}
                    style={{container: {backgroundColor: "#8FC74B"}}}
                />
            </View>
        );
    }

    private handleSave(value: SUModalState) {
        const { data: dataState } = this.state;

        if (_.isEmpty(value.password) || _.isEmpty(value.url) || _.isEmpty(value.user) ) {
            this.modal.open(value);
            return;
        }

        const data = _.cloneDeep(dataState);

        if (data.length === 0) {
            data.push({...value, id: 1});
            this.setState({data});
            return;
        }

        const index = data.findIndex((item) => {
            return item.id === value.id;
        });

        if (index > -1) {
            data.splice(index, 1, value);
            this.setState({data});
            return;
        }

        const maxId = data.reduce((prev, curr) => {
            return prev > curr.id! ? prev : curr.id!;
        }, 0);

        data.push({...value, id: maxId + 1});

        this.setState({data});
    }

    private handleDelete(id: number): void {
        let { data } = this.state;

        data = data.filter((item) => {
            return item.id !== id;
        });

        this.setState({data});
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
