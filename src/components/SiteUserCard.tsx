import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-material-ui";

interface SUCardProps {
    token: string;
    url: string;
    user: string;
}

const SiteUserCard: React.SFC<SUCardProps> = (props) => {

    const {token, url, user} = props;

    const site = url.split("://")[1];

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
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: {
        padding: 5,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: "contain",
    },
    textView: {paddingLeft: 20, alignSelf: "center"},
    siteText: {color: "#2F4E78", fontSize: 12},
    userText: {color: "#2F4E78", fontSize: 18},
});

export default SiteUserCard;
