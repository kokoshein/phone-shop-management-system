import { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
} from "react-native";

import {
    getRepairs,
    createRepair,
    updateRepairStatus,
    deleteRepair
} from "../services/repairService";

export default function Repairs() {
    const [repairs, setRepairs] = useState<any[]>([]);

    const [customerName, setCustomerName] = useState("");
    const [phoneModel, setPhoneModel] = useState("");
    const [imei, setImei] = useState("");
    const [issue, setIssue] = useState("");
    const [repairCost, setRepairCost] = useState("");

    useEffect(() => {
        fetchRepairs();
    }, []);

    const fetchRepairs = async () => {
        try {
            const result = await getRepairs();

            if (result.success) {
                setRepairs(result.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const completeRepair = async (id: number) => {
        try {
            await updateRepairStatus(id, "Completed");
            fetchRepairs();
        } catch (error) {
            console.log(error);
        }
    };

    const removeRepair = async (id: number) => {
        try {
            await deleteRepair(id);
            fetchRepairs();
        } catch (error) {
            console.log(error);
        }
    };

    const addRepair = async () => {
        try {
            const result = await createRepair({
                customer_name: customerName,
                phone_model: phoneModel,
                imei,
                issue,
                repair_cost: Number(repairCost),
                status: "Pending",
            });

            if (result.success) {
                Alert.alert("Success", "Repair Added");

                setCustomerName("");
                setPhoneModel("");
                setImei("");
                setIssue("");
                setRepairCost("");

                fetchRepairs();
            }
        } catch (error: any) {
            console.log("REPAIR ERROR =>", error?.response?.data);

            Alert.alert("Error", JSON.stringify(error?.response?.data));
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    marginBottom: 20,
                }}
            >
                Repairs
            </Text>

            <TextInput
                placeholder="Customer Name"
                value={customerName}
                onChangeText={setCustomerName}
                style={{
                    borderWidth: 1,
                    marginBottom: 10,
                    padding: 10,
                }}
            />

            <TextInput
                placeholder="Phone Model"
                value={phoneModel}
                onChangeText={setPhoneModel}
                style={{
                    borderWidth: 1,
                    marginBottom: 10,
                    padding: 10,
                }}
            />

            <TextInput
                placeholder="IMEI"
                value={imei}
                onChangeText={setImei}
                style={{
                    borderWidth: 1,
                    marginBottom: 10,
                    padding: 10,
                }}
            />

            <TextInput
                placeholder="Issue"
                value={issue}
                onChangeText={setIssue}
                style={{
                    borderWidth: 1,
                    marginBottom: 10,
                    padding: 10,
                }}
            />

            <TextInput
                placeholder="Repair Cost"
                value={repairCost}
                onChangeText={setRepairCost}
                keyboardType="numeric"
                style={{
                    borderWidth: 1,
                    marginBottom: 10,
                    padding: 10,
                }}
            />

            <TouchableOpacity
                onPress={addRepair}
                style={{
                    backgroundColor: "orange",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 20,
                }}
            >
                <Text
                    style={{
                        color: "white",
                        textAlign: "center",
                        fontWeight: "bold",
                    }}
                >
                    Add Repair
                    
                </Text>
            </TouchableOpacity>

            <FlatList
                data={repairs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View
                        style={{
                            borderWidth: 1,
                            padding: 15,
                            marginBottom: 10,
                            borderRadius: 10,
                        }}
                    >
                        <Text>{item.customer_name}</Text>

                        <Text>{item.phone_model}</Text>

                        <Text>Status: {item.status}</Text>

                        <Text>Cost: {item.repair_cost}</Text>
                        <TouchableOpacity
                            onPress={() =>
                                completeRepair(item.id)
                            }
                            style={{
                                backgroundColor: "green",
                                padding: 10,
                                marginTop: 10,
                                borderRadius: 8
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    textAlign: "center"
                                }}
                            >
                                Complete
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() =>
                                removeRepair(item.id)
                            }
                            style={{
                                backgroundColor: "red",
                                padding: 10,
                                marginTop: 10,
                                borderRadius: 8
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    textAlign: "center"
                                }}
                            >
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}