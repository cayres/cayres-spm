import React from "react";
import { Image, StyleSheet, View } from "react-native";

export const Logo: React.SFC<{}> = (props) => {
    return (
        <View>
            <Image source={require("../img/logo-cedro.png")}/>
        </View>
    );
};
