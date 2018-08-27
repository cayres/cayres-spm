import React from "react";
import { StyleProp, Text, TextInput, TextStyle, View } from "react-native";

export interface EmailProps {
    textInputStyle: StyleProp<TextStyle>;
    value: string;
    onChangeText: (text: string) => void;
}

interface EmailState {
    valid: boolean;
}

export const isValidEmail = (email: string) => {
    return email.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
};

export class EmailInput extends React.PureComponent<EmailProps, EmailState> {

    constructor(props: EmailProps) {
        super(props);
        this.state = {
            valid: true,
        };

        this.onHandleBlur = this.onHandleBlur.bind(this);
        this.onHandleFocus = this.onHandleFocus.bind(this);
    }

    public render(): React.ReactNode {
        const {textInputStyle, value, onChangeText} = this.props;
        const { valid } = this.state;

        const erro = valid ? false : <Text>E-mail inválido</Text>;

        return (
            <View>
                <TextInput
                    placeholder="E-mail"
                    value={value}
                    onChangeText={onChangeText}
                    style={valid ? textInputStyle : [textInputStyle, {color: "red"}]}
                    onBlur={this.onHandleBlur}
                    onFocus={this.onHandleFocus}
                    autoCapitalize="none"
                />
                {erro}
            </View>
        );
    }

    private onHandleBlur() {
        const { value } = this.props;

        if (value.length > 0 && !isValidEmail(value)) {
            this.setState({valid: false});
        }
    }

    private onHandleFocus() {
        this.setState({valid: true});
    }
}
