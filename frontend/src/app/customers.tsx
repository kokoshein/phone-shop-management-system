import { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator
} from "react-native";
import {
    TextInput,
    TouchableOpacity,
    Alert
} from "react-native";

import {
    createCustomer
} from "../services/customerService";
import { getCustomers }
    from "../services/customerService";

export default function Customers() {

    const [customers, setCustomers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {

        try {

            const result =
                await getCustomers();

            setCustomers(
                result.data
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };
    const addCustomer = async () => {

        try {

            await createCustomer({
                name,
                phone,
                address
            });

            Alert.alert(
                "Success",
                "Customer Added"
            );

            setName("");
            setPhone("");
            setAddress("");

            fetchCustomers();

        } catch (error) {

            Alert.alert(
                "Error",
                "Failed"
            );

        }

    };
    if (loading) {
        return (
            <ActivityIndicator
                size="large"
            />
        );
    }

    return (

        <View
            style={{
                flex: 1,
                padding: 20
            }}
        >

            <Text
                style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    marginBottom: 20
                }}
            >
                Customers
            </Text>
            <TextInput
                placeholder="Customer Name"
                value={name}
                onChangeText={setName}
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: 10
                }}
            />

            <TextInput
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: 10
                }}
            />

            <TextInput
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: 10
                }}
            />

            <TouchableOpacity
                onPress={addCustomer}
                style={{
                    backgroundColor: "green",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 20
                }}
            >

                <Text
                    style={{
                        color: "#fff",
                        textAlign: "center"
                    }}
                >
                    Add Customer
                </Text>

            </TouchableOpacity>
            <FlatList
                data={customers}
                keyExtractor={(item: any) =>
                    item.id.toString()
                }
                renderItem={({ item }: any) => (

                    <View
                        style={{
                            borderWidth: 1,
                            padding: 15,
                            marginBottom: 10,
                            borderRadius: 10
                        }}
                    >

                        <Text>
                            {item.name}
                        </Text>

                        <Text>
                            {item.phone}
                        </Text>

                    </View>

                )}
            />

        </View>

    );

}