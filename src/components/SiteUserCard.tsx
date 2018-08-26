import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-material-ui";

interface SUCardProps {
    token: string;
    url: string;
    user: string;
    id: number;
    password: string;
}

interface Actions {
    handleEdit: (value: SUCardProps) => void;
    handleDelete: (id: number) => void;
}

const SiteUserCard: React.SFC<SUCardProps & Actions> = (props) => {

    const {token, url, user} = props;
    const {handleEdit, handleDelete, ...value} = props;

    const site = url.indexOf("://") > -1 ? url.split("://")[1] : url;

    return (
        <Card>
            <View style={styles.box}>
                <Image
                    source={{
                        uri: `https://dev.people.com.ai/mobile/api/v2/logo/${site}`,
                        method: "GET",
                        headers: {
                            Authorization: token,
                        },
                    }}
                    style={styles.image}
                />
                <View style={styles.textView}>
                    <Text style={styles.siteText}>{site.toLocaleLowerCase()}</Text>
                    <Text style={styles.userText}>{user}</Text>
                </View>
                <View style={styles.buttonView}>
                    <Button
                        text=""
                        icon="edit"
                        style={{text: styles.siteText}}
                        onPress={() => handleEdit(value)}
                    />
                    <Button
                        text=""
                        icon="delete"
                        style={{text: styles.siteText}}
                        onPress={() => handleDelete(value.id)}
                    />
                </View>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    box: {
        padding: 5,
        alignItems: "center",
        flexDirection: "row",
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: "contain",
    },
    textView: {
        alignItems: "center",
        flex: 1,
    },
    buttonView: {
        width: 75,
    },
    siteText: {color: "#2F4E78", fontSize: 12},
    userText: {color: "#2F4E78", fontSize: 18},
});

export default SiteUserCard;
