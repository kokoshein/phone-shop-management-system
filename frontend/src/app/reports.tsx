import { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    ScrollView
} from "react-native";

import {
    getAdvancedReport
} from "../services/reportService";

export default function Reports() {

    const [report, setReport] =
        useState<any>({
            todaySales: 0,
            monthlySales: 0,
            repairIncome: 0,
            topProducts: []
        });

    useEffect(() => {
        loadReport();
    }, []);

    const loadReport = async () => {

        const result =
            await getAdvancedReport();

        if (result.success) {
            setReport(result.data);
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
                    fontSize: 28,
                    fontWeight: "bold",
                    marginBottom: 20
                }}
            >
                Reports Dashboard
            </Text>

            <View
                style={{
                    backgroundColor: "#2563eb",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10
                }}
            >
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 18
                    }}
                >
                    Today Sales
                </Text>

                <Text
                    style={{
                        color: "#fff",
                        fontSize: 24,
                        fontWeight: "bold"
                    }}
                >
                    {report.todaySales} Ks
                </Text>
            </View>

            <View
                style={{
                    backgroundColor: "#16a34a",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10
                }}
            >
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 18
                    }}
                >
                    Monthly Sales
                </Text>

                <Text
                    style={{
                        color: "#fff",
                        fontSize: 24,
                        fontWeight: "bold"
                    }}
                >
                    {report.monthlySales} Ks
                </Text>
            </View>

            <View
                style={{
                    backgroundColor: "#ea580c",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 20
                }}
            >
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 18
                    }}
                >
                    Repair Income
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
                                fontSize: 18
                            }}
                        >
                            Estimated Profit
                            <View
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
                                        fontSize: 19
                                    }}
                                >
                                    Net Profit
                                </Text>

                                <Text
                                    style={{
                                        color: "#fff",
                                        fontSize: 24,
                                        fontWeight: "bold"
                                    }}
                                >
                                    {report.netProfit} Ks
                                </Text>
                            </View>
                        </Text>

                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 24,
                                fontWeight: "bold"
                            }}
                        >
                            {report.estimatedProfit} Ks
                        </Text>
                    </View>
                </Text>

                <Text
                    style={{
                        color: "#fff",
                        fontSize: 24,
                        fontWeight: "bold"
                    }}
                >
                    {report.repairIncome} Ks
                </Text>
            </View>

            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    marginBottom: 10
                }}
            >
                Top Selling Products
            </Text>

            <FlatList
                scrollEnabled={false}
                data={report.topProducts}
                keyExtractor={(_, index) =>
                    index.toString()
                }
                renderItem={({ item, index }) => (

                    <View
                        style={{
                            borderWidth: 1,
                            padding: 15,
                            borderRadius: 10,
                            marginBottom: 10
                        }}
                    >
                        <Text>
                            #{index + 1}
                        </Text>

                        <Text>
                            {item.product_name}
                        </Text>

                        <Text>
                            Sold :
                            {item.soldCount}
                        </Text>

                    </View>

                )}
            />

        </ScrollView>

    );

}