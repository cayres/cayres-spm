import React from "react";
import { Image, View } from "react-native";

export const Logo: React.SFC<{}> = (props) => {
    return (
        <View>
            <Image source={require("../assets/logo-cedro.png")}/>
        </View>
    );
};
