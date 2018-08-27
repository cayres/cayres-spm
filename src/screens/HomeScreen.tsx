// node_modules
import _ from "lodash";
import React from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { ActionButton } from "react-native-material-ui";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { ApplicationState } from "../store";

import { addInfo, changeInfo, fechList, removeInfo } from "../store/passwords/actions";

import SiteUserCard from "../components/SiteUserCard";
import SiteUserModal, { SUModalState } from "../components/SiteUserModal";
import { SiteUserPassword } from "../store/passwords";
import { getSecurityPasswordList } from "../util";

interface IProp {
    navigation: NavigationScreenProp<any, any>;
}

interface PropsFromState {
    token: string;
    data: SiteUserPassword[];
    email: string;
}

interface Actions {
    addInfo: typeof addInfo;
    changeInfo: typeof changeInfo;
    removeInfo: typeof removeInfo;
    fechList: typeof fechList;
}

type AllProps = IProp & PropsFromState & Actions;

export interface HomeState {
    modalVisible: boolean;
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
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    public componentDidMount() {
        getSecurityPasswordList().then((value) => {
            this.props.fechList(value);
        });

    }

    public render(): React.ReactNode {

        const { token, data } = this.props;

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
        const { data: dataState, addInfo, changeInfo, email } = this.props;

        if (_.isEmpty(value.password) || _.isEmpty(value.url) || _.isEmpty(value.user) ) {
            this.modal.open(value);
            return;
        }

        const data = _.cloneDeep(dataState) as SiteUserPassword[];

        value = value as SiteUserPassword;

        if (data.length === 0) {
            addInfo({password: value.password!, url: value.url!, user: value.user!, id: 1}, email);
            return;
        }

        const index = data.findIndex((item) => {
            return item.id === value.id;
        });

        if (index > -1) {
            const updatedValue = {password: value.password!, url: value.url!, user: value.user!, id: value.id!};
            changeInfo(updatedValue, index, email);
            return;
        }

        const maxId = data.reduce((prev, curr) => {
            return prev > curr.id! ? prev : curr.id!;
        }, 0);

        addInfo({password: value.password!, url: value.url!, user: value.user!, id: maxId + 1}, email);
    }

    private handleDelete(id: number): void {
        const { data, email, removeInfo } = this.props;

        removeInfo(id, email);
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
    email: state.authentication.email,
    data: state.passwords,
});

const mapDistpachToProps = (dispach: Dispatch) => bindActionCreators({ fechList, addInfo, changeInfo, removeInfo }, dispach);

export default connect(mapStateToProps, mapDistpachToProps)(HomeScreen);
