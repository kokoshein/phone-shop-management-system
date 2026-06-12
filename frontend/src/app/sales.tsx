import { useEffect, useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert
} from "react-native";

import {
    getSales,
    createSale
} from "../services/saleService";

export default function Sales() {

    const [sales, setSales] =
        useState<any[]>([]);

    const [customerName,
        setCustomerName] =
        useState("");

    const [productName,
        setProductName] =
        useState("");

    const [quantity,
        setQuantity] =
        useState("");

    const [unitPrice,
        setUnitPrice] =
        useState("");

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales =
        async () => {

            try {

                const result =
                    await getSales();

                if (
                    result.success
                ) {
                    setSales(
                        result.data
                    );
                }

            } catch (error) {

                console.log(
                    error
                );

            }

        };

    const addSale =
        async () => {

            try {

                const total =
                    Number(quantity)
                    *
                    Number(unitPrice);

                const result =
                    await createSale({
                        customer_name:
                            customerName,
                        product_name: productName,
                        quantity: Number(quantity),
                        unit_price: Number(unitPrice),
                        total_amount: total,
                        cost_price: total * 0.8, // Assuming 20% profit margin
                        profit: total * 0.2
                    });

                if (
                    result.success
                ) {

                    Alert.alert(
                        "Success",
                        "Sale Created"
                    );

                    setCustomerName("");
                    setProductName("");
                    setQuantity("");
                    setUnitPrice("");

                    fetchSales();

                }

            } catch (error) {

                const msg =
                    error.response
                        ?.data
                        ?.message || error.message;

                Alert.alert(
                    "Stock Error",
                    msg
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
                    fontSize: 28,
                    fontWeight: "bold",
                    marginBottom: 20
                }}
            >
                Sales
            </Text>

            <TextInput
                placeholder="Customer Name"
                value={customerName}
                onChangeText={
                    setCustomerName
                }
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: 10
                }}
            />

            <TextInput
                placeholder="Product Name"
                value={productName}
                onChangeText={
                    setProductName
                }
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: 10
                }}
            />

            <TextInput
                placeholder="Quantity"
                value={quantity}
                onChangeText={
                    setQuantity
                }
                keyboardType="numeric"
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: 10
                }}
            />

            <TextInput
                placeholder="Unit Price"
                value={unitPrice}
                onChangeText={
                    setUnitPrice
                }
                keyboardType="numeric"
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: 10
                }}
            />

            <TouchableOpacity
                onPress={addSale}
                style={{
                    backgroundColor:
                        "#16a34a",
                    padding: 15,
                    borderRadius: 8,
                    marginBottom: 20
                }}
            >

                <Text
                    style={{
                        color: "#fff",
                        textAlign:
                            "center"
                    }}
                >
                    Create Sale
                </Text>

            </TouchableOpacity>

            <FlatList
                data={sales}
                keyExtractor={
                    (item) =>
                        item.id.toString()
                }
                renderItem={
                    ({ item }) => (

                        <View
                            style={{
                                borderWidth: 1,
                                padding: 15,
                                marginBottom: 10,
                                borderRadius: 10
                            }}
                        >

                            <Text>
                                Customer:
                                {" "}
                                {item.customer_name}
                            </Text>

                            <Text>
                                Product:
                                {" "}
                                {item.product_name}
                            </Text>

                            <Text>
                                Qty:
                                {" "}
                                {item.quantity}
                            </Text>

                            <Text>
                                Total:
                                {" "}
                                {item.total_amount}
                            </Text>

                        </View>

                    )
                }
            />

        </View>

    );

}