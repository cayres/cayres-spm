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

    const alert = isValidPassword(value)  ? false : <Image source={require("../assets/report_problem.png")} />;

    return (
        <View>
            <TextInput
                placeholder="Senha"
                secureTextEntry={true}
                value={value}
                onChangeText={onChangeText}
                style={textInputStyle}
            />
            <View style={{flexDirection: "row", width: 250 }}>
                <Text style={{fontSize: 12 }}>{"Use dez ou mais caracteres com uma combinação de letras, números e símbolos "}</Text>
                {alert}
                <Text>{`10/${value.length} `}</Text>
            </View>
        </View>
    );
};
