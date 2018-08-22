import React from "react";
import { Image, StyleSheet, View } from "react-native";

export const Logo: React.SFC<{}> = (props) => {
    return (
        <View style={styles.root}>
            <Image source={require("../img/logo-cedro.png")}/>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        paddingTop: 20,
    },
});
