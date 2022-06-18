import {
  Box, HStack, IconButton, Icon, Button,
  Alert, VStack, Text, Center,
} from 'native-base';
import React, { useState } from 'react';
import { View } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useFridgeContext } from '../FridgeContext.jsx';

function SuccessfulAlert({ navigation }) {
  return (
    <Center>
      <Alert w="90%" maxW="400" status="info" colorScheme="info">
        <VStack space={2} flexShrink={1}>
          <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
            <HStack flexShrink={1} space={2} alignItems="center">
              <Alert.Icon />
              <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                Successfully added to virtual fridge
              </Text>
            </HStack>
          </HStack>
          <HStack space={2}>
            <Button size="xs" onPress={() => navigation.navigate('Camera Mode')}> Add more receipt</Button>
            <Button size="xs" onPress={() => navigation.navigate('Manual Entry')}> Manual Entry</Button>
            <Button size="xs" onPress={() => navigation.navigate('Review Items')}> To review items added</Button>
          </HStack>
        </VStack>
      </Alert>
    </Center>
  );
}

function ParsedReceipt({ route, navigation }) {
  const { reviewIdsDispatch, dispatchHelpers: { addReviewIds } } = useFridgeContext();
  const { parsedData } = route.params;

  const [foodItemsPhoto, setFoodPhotoItems] = useState(parsedData);
  const [show, setShow] = useState(false);

  const removeItem = (item) => {
    const remainingItems = foodItemsPhoto.filter((food) => item !== food.match[0].itemName);
    setFoodPhotoItems(remainingItems);
  };

  const saveToVirtualFridge = () => {
    setShow(true);
    const foodIds = foodItemsPhoto.map((food) => food.dataId);
    console.log(foodIds);
    reviewIdsDispatch(addReviewIds(foodIds));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Box>Possible Food Items detected: </Box>

      {foodItemsPhoto.map((data) => (
        <Box>
          <HStack space={2} my="2" justifyContent="space-between">
            <Box w="30%">{data.parsedName.toUpperCase()}</Box>
            <Box w="50%">{data.match[0].itemName}</Box>
            <Box>
              <IconButton
                icon={<Icon as={MaterialIcons} name="cancel" size={5} />}
                borderRadius="full"
                onPress={() => removeItem(data.match[0].itemName)}
              />
            </Box>
          </HStack>
        </Box>
      ))}
      {!show
      && (
      <HStack space={2}>
        <Button onPress={() => navigation.navigate('Manual Entry')}> Manual Entry </Button>
        <Button
          onPress={saveToVirtualFridge}
          disabled={show}
        >
          Add to virtual fridge
        </Button>
      </HStack>
      )}
      {show && <SuccessfulAlert navigation={navigation} />}
    </View>
  );
}

export default ParsedReceipt;
