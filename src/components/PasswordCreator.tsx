import React, { SFC } from "react";
import { Image, StyleProp, Text, TextInput, TextStyle, View } from "react-native";

export interface IPasswordProps {
    textInputStyle: StyleProp<TextStyle>;
    value: string;
    onChangeText: (text: string) => void;
}

export const isValidPassword = (password: string) => {
    return password.match(/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=(.*[\w]))(?=(.*)).{8,}/g) && password.indexOf(" ") === -1;
};

export const PasswordCreator: React.SFC<IPasswordProps> = (props) => {
    const {textInputStyle, value, onChangeText} = props;

    const alert = isValidPassword(value)  ? false : <Image source={require("../img/report_problem.png")} />;

    return (
        <View style={{alignItems: "flex-end"}}>
            <TextInput
                placeholder="Senha"
                secureTextEntry={true}
                value={value}
                onChangeText={onChangeText}
                style={textInputStyle}
            />
            <View style={{flexDirection: "row" }}>
                <Text style={{width: 250, fontSize: 12 }}>{"Use oito ou mais caracteres com uma combinação de letras, números e símbolos "}</Text>
                <Text>{`8/${value.length} `}</Text>
                {alert}
            </View>
        </View>
    );
};
