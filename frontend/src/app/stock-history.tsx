import { FlatList, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { getStockHistory } from "../services/stockHistoryService";
export default function StockHistory() {

    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        getStockHistory().then((result) => {

                console.log(
                    "STOCK HISTORY =>",
                    result
                );

                if (result.success) {
                    setHistory(
                        result.data
                    );
                }

            });
        }, []);

    const loadHistory = async () => {

        try {

            const result =
                await getStockHistory();

            console.log(
                "STOCK HISTORY =>",
                result
            );

            if (result.success) {
                setHistory(
                    result.data
                );
            }

        } catch (error) {

            console.log(error);

        }

    };
    return (
        <View
            style={{            
                padding: 20,
                flex: 1
            }}
        >
            <Text>
                Total Records:
                {history.length}
            </Text>
            <Text
                style={{
                    fontSize: 28,  
                    fontWeight: "bold",
                    marginBottom: 20
                }}
            >
                Stock History
            </Text>
            {history.map((item, index) => (
                <View key={index}>
                    <Text>{item.product_name}</Text>
                    <Text>{item.action_type}</Text>
                    <Text>{item.quantity}</Text>
                </View>
            ))}
        </View>
    );
}