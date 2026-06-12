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
    getProducts,
    createProduct,
} from "../services/productService";

export default function Products() {
    const [products, setProducts] = useState<any[]>([]);

    const [productName, setProductName] = useState("");
    const [brand, setBrand] = useState("");
    const [quantity, setQuantity] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const result = await getProducts();

            if (result.success) {
                setProducts(result.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addProduct = async () => {
        try {
            const result = await createProduct({
                product_name: productName,
                category: "Phone",
                brand: brand,
                quantity: Number(quantity),
                purchase_price: Number(purchasePrice),
                selling_price: Number(sellingPrice),
            });

            if (result.success) {
                Alert.alert("Success", "Product Added");

                setProductName("");
                setBrand("");
                setQuantity("");
                setPurchasePrice("");
                setSellingPrice("");

                fetchProducts();
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Cannot Add Product");
        }
    };

    return (
        <View
            style={{
                flex: 1,
                padding: 20,
            }}
        >
            <Text
                style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    marginBottom: 20,
                }}
            >
                Products
            </Text>

            <TextInput
                placeholder="Product Name"
                value={productName}
                onChangeText={setProductName}
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: 10,
                }}
            />

            <TextInput
                placeholder="Brand"
                value={brand}
                onChangeText={setBrand}
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: 10,
                }}
            />

            <TextInput
                placeholder="Quantity"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: 10,
                }}
            />

            <TextInput
                placeholder="Purchase Price"
                value={purchasePrice}
                onChangeText={setPurchasePrice}
                keyboardType="numeric"
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: 10,
                }}
            />

            <TextInput
                placeholder="Selling Price"
                value={sellingPrice}
                onChangeText={setSellingPrice}
                keyboardType="numeric"
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: 10,
                }}
            />

            <TouchableOpacity
                onPress={addProduct}
                style={{
                    backgroundColor: "green",
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 20,
                }}
            >
                <Text
                    style={{
                        color: "#fff",
                        textAlign: "center",
                    }}
                >
                    Add Product
                </Text>
            </TouchableOpacity>

            <FlatList
                data={products}
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
                        <Text>{item.product_name}</Text>

                        <Text>Brand: {item.brand}</Text>

                        <Text>Stock: {item.quantity}</Text>

                        <Text>Price: {item.selling_price}</Text>
                    </View>
                )}
            />
        </View>
    );
}