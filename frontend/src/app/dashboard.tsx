import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    Button
} from "react-native";
import { useEffect, useState } from "react";
import {
    router
} from "expo-router";
import {
    getDashboardStats
} from "../services/dashboardService";
export default function Dashboard() {
    const [stats, setStats] =
        useState({
            totalCustomers: 0,
            totalProducts: 0,
            totalRepairs: 0,
            totalSales: 0,
            lowStockCount: 0
        });
    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {

        try {

            const result =
                await getDashboardStats();

            console.log(
                "DASHBOARD =>",
                JSON.stringify(result)
            );

            if (result.success) {

                setStats({
                    totalCustomers:
                        result.data.totalCustomers,

                    totalProducts:
                        result.data.totalProducts,

                    totalRepairs:
                        result.data.totalRepairs,

                    totalSales:
                        result.data.totalSales,

                    lowStockCount:
                        result.data.lowStockCount
                });

                if (
                    result.data.lowStockCount > 0
                ) {

                    Alert.alert(
                        "⚠ Stock Warning",
                        `${result.data.lowStockCount} product(s) are low stock`
                    );

                }

            }

        } catch (error) {

            console.log(
                "DASHBOARD ERROR =>",
                error
            );

        }

    };
    
    return (

        <View
            style={{
                flex: 1,
                padding: 20
            }}
        >

            <Text
                style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    marginBottom: 30
                }}
            >
                Phone Shop Dashboard
                <View
                    style={{
                        padding: 15,
                        backgroundColor: "#2563eb",
                        borderRadius: 10,
                        marginBottom: 10
                    }}
                >
                    <Text style={{
                        color: "#fff",
                        fontSize: 18
                    }}>
                        Customers : {stats.totalCustomers}
                    </Text>
                </View>

                <View
                    style={{
                        padding: 15,
                        backgroundColor: "green",
                        borderRadius: 10,
                        marginBottom: 10
                    }}
                >
                    <Text style={{
                        color: "#fff",
                        fontSize: 18
                    }}>
                        Products : {stats.totalProducts}
                    </Text>
                </View>

                <View
                    style={{
                        padding: 15,
                        backgroundColor: "orange",
                        borderRadius: 10,
                        marginBottom: 10
                    }}
                >
                    <Text style={{
                        color: "#fff",
                        fontSize: 18
                    }}>
                        Repairs : {stats.totalRepairs}
                    </Text>
                </View>
                <View
                    style={{
                        padding: 15,
                        backgroundColor: "red",
                        borderRadius: 10,
                        marginTop: 10
                    }}
                >
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 18
                        }}
                    >
                        Low Stock :
                        {stats.lowStockCount}
                    </Text>
                </View>
                <View
                    style={{
                        padding: 15,
                        backgroundColor: "purple",
                        borderRadius: 10
                    }}
                >
                    <Text style={{
                        color: "#fff",
                        fontSize: 18
                    }}>
                        Sales : {stats.totalSales}
                    </Text>
                </View>
            </Text>
            <TouchableOpacity
                style={{
                    backgroundColor: "#ef4444",
                    padding: 15,
                    marginBottom: 10,
                    borderRadius: 10
                }}
                onPress={() =>
                    router.push("/low-stock" as any)
                }
            >   
                <Text
                    style={{
                        color: "#fff"
                    }}
                >
                    Low Stock
                    <Button
                        title="Stock History"
                        onPress={() =>
                            router.push(
                                "/stock-history" as any
                                
                            )
                        }
                    />
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: "#2563eb",
                    padding: 15,
                    marginBottom: 10,
                    borderRadius: 10
                }}
                onPress={() =>
                    router.push("/customers")
                }
            >
                <Text
                    style={{
                        color: "#fff"
                    }}
                >
                    Customers
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: "#0f766e",
                    padding: 15,
                    borderRadius: 10,
                    marginTop: 10
                }}
                onPress={() =>
                    router.push("/invoices" as any)
                }
            >
                <Text
                    style={{
                        color: "#fff"
                    }}
                >
                    Invoices
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: "#16a34a",
                    padding: 15,
                    marginBottom: 10,
                    borderRadius: 10
                }}
                onPress={() =>
                    
                    router.push("/products")
                }
            >
                <Text style={{ color: "#fff" }}>
                    Products
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={{
                    backgroundColor: "#ea580c",
                    padding: 15,
                    marginBottom: 10,
                    borderRadius: 10
                }}
                onPress={() =>
                    router.push("/repairs")
                }
            >
                <Text style={{ color: "#fff" }}>
                    Repairs
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: "#7c3aed",
                    padding: 15,
                    borderRadius: 10
                }}
                onPress={() =>
                    router.push("/reports" as any)
                }
            >
                <Text style={{ color: "#fff" }}>
                    Reports
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: "#7c3aed",
                    padding: 15,
                    borderRadius: 10
                }}
                onPress={() =>
                    router.push("/sales")
                }
            >
                <Text style={{ color: "#fff" }}>
                    Sales
                </Text>
            </TouchableOpacity>

        </View>

    );

}