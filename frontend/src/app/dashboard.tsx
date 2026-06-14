import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView
} from "react-native";

import { useEffect, useState } from "react";

import { router } from "expo-router";

import { getDashboardStats }
    from "../services/dashboardService";

import { getAdvancedReport }
    from "../services/reportService";

export default function Dashboard() {


    const [stats, setStats] = useState({
        totalCustomers: 0,
        totalProducts: 0,
        totalRepairs: 0,
        totalSales: 0,
        lowStockCount: 0
    });

    const [analytics, setAnalytics] =
        useState<any>({});

    useEffect(() => {
        loadStats();
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {

            const result =
                await getAdvancedReport();

            if (result.success) {
                setAnalytics(result.data);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const loadStats = async () => {
        try {

            const result =
                await getDashboardStats();

            if (result.success) {

                setStats(result.data);

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
            console.log(error);
        }
    };

    return (

        <ScrollView
            style={{
                flex: 1,
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
                📊 Phone Shop Dashboard
            </Text>

            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    marginBottom: 10
                }}
            >
                Analytics
            </Text>
            <View
                style={{
                    backgroundColor: "#7c3aed",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 20
                }}
            >
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: "bold",
                        marginBottom: 10
                    }}
                >
                    📈 Report Summary
                </Text>

                <Text style={{ color: "#fff" }}>
                    Today Sales :
                    {analytics.todaySales?.toLocaleString()}
                </Text>

                <Text style={{ color: "#fff" }}>
                    Monthly Sales :
                    {analytics.monthlySales?.toLocaleString()}
                </Text>

                <Text style={{ color: "#fff" }}>
                    Repair Income :
                    {analytics.repairIncome?.toLocaleString()}
                </Text>

                <Text style={{ color: "#fff" }}>
                    Net Profit :
                    {analytics.netProfit?.toLocaleString()}
                </Text>
            </View>
            <View
                style={{
                    backgroundColor: "#fff",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10
                }}
            >
                <Text>
                    Today Sales :
                    {analytics.todaySales?.toLocaleString()}
                </Text>
            </View>

            <View
                style={{
                    backgroundColor: "#fff",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10
                }}
            >
                <Text>
                    Monthly Sales :
                    {analytics.monthlySales?.toLocaleString()}
                </Text>
            </View>

            <View
                style={{
                    backgroundColor: "#fff",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10
                }}
            >
                <Text>
                    Repair Income :
                    {analytics.repairIncome?.toLocaleString()}
                </Text>
            </View>

            <View
                style={{
                    backgroundColor: "#fff",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 20
                }}
            >
                <Text>
                    Net Profit :
                    {analytics.netProfit?.toLocaleString()}
                </Text>
            </View>

            <View
                style={{
                    backgroundColor: "#2563eb",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10
                }}
            >
                <Text style={{ color: "#fff" }}>
                    Customers : {stats.totalCustomers}
                </Text>
            </View>

            <View
                style={{
                    backgroundColor: "green",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10
                }}
            >
                <Text style={{ color: "#fff" }}>
                    Products : {stats.totalProducts}
                </Text>
            </View>

            <View
                style={{
                    backgroundColor: "orange",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10
                }}
            >
                <Text style={{ color: "#fff" }}>
                    Repairs : {stats.totalRepairs}
                </Text>
            </View>

            <View
                style={{
                    backgroundColor: "red",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10
                }}
            >
                <Text style={{ color: "#fff" }}>
                    Low Stock : {stats.lowStockCount}
                </Text>
            </View>

            <View
                style={{
                    backgroundColor: "purple",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 20
                }}
            >
                <Text style={{ color: "#fff" }}>
                    Sales : {stats.totalSales}
                </Text>
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: "#0ea5e9",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10
                }}
                onPress={() =>
                    router.push("/stock-history" as any)
                }
            >
                <Text style={{ color: "#fff" }}>
                    Stock History
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    backgroundColor: "#ef4444",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10
                }}
                onPress={() =>
                    router.push("/low-stock" as any)
                }
            >
                <Text style={{ color: "#fff" }}>
                    Low Stock
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: "#2563eb",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10
                }}
                onPress={() => router.push("/customers" as any)}
            >
                <Text style={{ color: "#fff" }}>
                    Customers
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    backgroundColor: "#16a34a",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10
                }}
                onPress={() => router.push("/products" as any)}
            >
                <Text style={{ color: "#fff" }}>
                    Products
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    backgroundColor: "#ea580c",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10
                }}
                onPress={() => router.push("/repairs" as any)}
            >
                <Text style={{ color: "#fff" }}>
                    Repairs
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    backgroundColor: "#7c3aed",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10
                }}
                onPress={() => router.push("/sales" as any)}
            >
                <Text style={{ color: "#fff" }}>
                    Sales
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    backgroundColor: "#0f766e",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10
                }}
                onPress={() => router.push("/invoices" as any)}
            >
                <Text style={{ color: "#fff" }}>
                    Invoices
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    backgroundColor: "#9333ea",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 20
                }}
                onPress={() => router.push("/reports" as any)}
            >
                <Text style={{ color: "#fff" }}>
                    Reports
                </Text>
            </TouchableOpacity>
        </ScrollView>

    );
}

