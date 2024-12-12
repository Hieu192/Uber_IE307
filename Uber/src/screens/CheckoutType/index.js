import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { setMethod } from '../../redux/slices/methodPayload';
import { useDispatch } from 'react-redux';

const CheckoutType = (props) => {
  const [selectedMethod, setSelectedMethod] = useState('1');

  const navigation = useNavigation()
  const dispatch = useDispatch()
  const paymentMethods = [
    { id: '1', name: 'Tiền mặt' },
    { id: '2', name: 'Momo' },
    { id: '3', name: 'Chuyển khoản ngân hàng' },
  ];

  const handleSelectMethod = (methodId) => {
    setSelectedMethod(methodId);
  };

  const renderMethod = ({ item }) => (
    <Pressable
      style={[
        styles.methodContainer,
        selectedMethod === item.id && styles.selectedMethod,
      ]}
      onPress={() => handleSelectMethod(item.id)}
    >
      <Text style={styles.methodText}>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn phương thức thanh toán</Text>
      <FlatList
        data={paymentMethods}
        keyExtractor={(item) => item.id}
        renderItem={renderMethod}
        contentContainerStyle={styles.listContainer}
      />
      <Pressable
        style={styles.confirmButton}
        onPress={() => {
            navigation.goBack();
            dispatch(setMethod(paymentMethods.find((method) => method.id === selectedMethod)?.name));
        }}
        disabled={!selectedMethod}
      >
        <Text style={styles.confirmButtonText}>Xác nhận</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  methodContainer: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  selectedMethod: {
    backgroundColor: '#d1f5d3',
    borderWidth: 1,
    borderColor: '#2ecc71',
  },
  methodText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  confirmButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#2ecc71',
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckoutType;

