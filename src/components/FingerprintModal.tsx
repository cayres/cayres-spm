import React from "react";
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import { Dialog, DialogDefaultActions } from "react-native-material-ui";

interface Props {
    visible: boolean;
    onRequestClose: any;
}

const FingerprintPopup: React.SFC<Props> = (props) => {

    const {visible, onRequestClose} = props;

    return (
        <Modal animationType="slide" visible={visible} transparent={true} onRequestClose={onRequestClose}>
            <View style={styles.container}>
                <Dialog>
                    <Dialog.Title><Text>Authenticate with Touch</Text></Dialog.Title>
                    <Dialog.Content>
                    <   Image style={styles.image} source={require("../assets/finger_print.png")} />
                    </Dialog.Content>
                    <Dialog.Actions>
                    <DialogDefaultActions
                        actions={["cancel"]}
                        onActionPress={onRequestClose}
                        style={{defaultActionsContainer: {backgroundColor: "#FFFFFF"}}}
                    />
                    </Dialog.Actions>
                </Dialog>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        alignSelf: "center",
    },
});

export default FingerprintPopup;
