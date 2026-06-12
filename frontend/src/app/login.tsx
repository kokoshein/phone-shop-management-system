import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from "react-native";

import { router } from "expo-router";
import { loginUser } from "../services/authService";

export default function LoginScreen() {

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleLogin = async () => {

        try {

            const result =
                await loginUser(
                    username,
                    password
                );

            if (result.success) {

                Alert.alert(
                    "Success",
                    "Login Successful"
                );

                router.replace(
                    "/dashboard"
                );

            }

        } catch (error) {

            Alert.alert(
                "Error",
                "Login Failed"
            );

            console.log(error);

        }

    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                padding: 20
            }}
        >

            <Text
                style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    marginBottom: 20
                }}
            >
                Phone Shop Login
            </Text>

            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={{
                    borderWidth: 1,
                    padding: 12,
                    marginBottom: 10
                }}
            />

            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={{
                    borderWidth: 1,
                    padding: 12,
                    marginBottom: 20
                }}
            />

            <TouchableOpacity
                onPress={handleLogin}
                style={{
                    backgroundColor: "#2563eb",
                    padding: 15,
                    borderRadius: 8
                }}
            >

                <Text
                    style={{
                        color: "#fff",
                        textAlign: "center"
                    }}
                >
                    Login
                </Text>

            </TouchableOpacity>

        </View>
    );
}