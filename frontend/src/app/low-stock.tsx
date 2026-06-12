import {
    View,
    Text,
    FlatList
} from "react-native";

import {
    useEffect,
    useState
} from "react";

import {
    getLowStockProducts
} from "../services/productService";

export default function LowStock() {

    const [products, setProducts] =
        useState<any[]>([]);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        const result =
            await getLowStockProducts();

        if (result.success) {

            setProducts(
                result.data
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
                    fontSize: 24,
                    fontWeight: "bold",
                    marginBottom: 20
                }}
            >
                Low Stock Products
            </Text>

            <FlatList
                data={products}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                renderItem={({ item }) => (

                    <View
                        style={{
                            backgroundColor:
                                "#ef4444",

                            padding: 15,

                            marginBottom: 10,

                            borderRadius: 10
                        }}
                    >

                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 18
                            }}
                        >
                            {item.product_name}
                        </Text>

                        <Text
                            style={{
                                color: "#fff"
                            }}
                        >
                            Qty : {item.quantity}
                        </Text>

                    </View>

                )}
            />

        </View>

    );

}