import React, { useEffect, useState } from 'react';
import {
  Box, Heading, HStack, VStack,
} from 'native-base';
import moment from 'moment';
import CategorySelector from './CategorySelector.jsx';
import StorageSelector from './StorageSelector.jsx';
import ShelfLifeDays from './ShelfLifeDays.jsx';
import PurchaseDateInput from './PurchaseDateInput.jsx';
import ExpiryDate from './ExpiryDate.jsx';
import DeleteReviewItem from './DeleteReviewItem.jsx';

export default function ItemForm({ item }) {
  const { name, categories } = item;
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedStorage, setSelectedStorage] = useState();
  const [purchaseDate, setPurchaseDate] = useState(moment(new Date()).format('DD-MM-YYYY'));
  const [updatedShelfLifeDays, setUpdatedShelfLifeDays] = useState(selectedStorage ? selectedStorage.shelfLifeDays : null);

  useEffect(() => {
    if (categories.length === 1) {
      setSelectedCategory(categories[0]);
    }
  }, [selectedCategory]);

  return (
    <Box px={4} pt={2} pb={8} borderBottomWidth={0.5} borderBottomColor="primary.100">
      <HStack justifyContent="space-between" alignItems="center">
        <Heading size="md" mb={2}>{name}</Heading>
        <DeleteReviewItem reviewItemId={item.id} />
      </HStack>
      <VStack spcae={4}>
        <CategorySelector
          reviewItemId={item.id}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {selectedCategory && (
        <StorageSelector
          reviewItemId={item.id}
          selectedCategory={selectedCategory}
          selectedStorage={selectedStorage}
          setSelectedStorage={setSelectedStorage}
        />
        )}
        {selectedStorage && (
        <ShelfLifeDays
          reviewItemId={item.id}
          selectedStorage={selectedStorage}
          updatedShelfLifeDays={updatedShelfLifeDays}
          setUpdatedShelfLifeDays={setUpdatedShelfLifeDays}
        />
        )}
        <PurchaseDateInput
          reviewItemId={item.id}
          purchaseDate={purchaseDate}
          setPurchaseDate={setPurchaseDate}
        />
        {selectedStorage && (
        <ExpiryDate
          reviewItemId={item.id}
          purchaseDate={purchaseDate}
          updatedShelfLifeDays={updatedShelfLifeDays}
        />
        )}
      </VStack>
    </Box>
  );
}
