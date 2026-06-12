import { useEffect, useState } from "react";

import {
    View,
    Text,
    FlatList
} from "react-native";

import {
    getInvoices
} from "../services/invoiceService";

export default function Invoices() {

    const [invoices,
        setInvoices] =
        useState<any[]>([]);

    useEffect(() => {
        loadInvoices();
    }, []);

    const loadInvoices =
        async () => {

            try {

                const result =
                    await getInvoices();

                if (
                    result.success
                ) {

                    setInvoices(
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
                Invoices
            </Text>

            <FlatList
                data={invoices}
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
                                {item.invoice_no}
                            </Text>

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