import React, { useEffect } from 'react';
import {
  Box,
  Select,
  FormControl,
  WarningOutlineIcon,
} from 'native-base';

import { useFridgeContext } from '../../FridgeContext.jsx';

const CATEGORY = 'category';

export default function CategorySelector({
  reviewItemId,
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  const {
    reviewItemsDispatch,
    dispatchHelpers: { editReviewItem },
  } = useFridgeContext();

  const handleValueChange = (itemValue) => {
    const selectedItem = categories.filter((item) => item.categoryName === itemValue)[0];
    setSelectedCategory(selectedItem);
    reviewItemsDispatch(editReviewItem(reviewItemId,
      CATEGORY,
      selectedItem.categoryName));
  };

  useEffect(() => {
    if (categories.length === 1) {
      setSelectedCategory(categories[0]);
      reviewItemsDispatch(editReviewItem(reviewItemId,
        CATEGORY,
        categories[0].categoryName));
    }
  }, []);

  return (
    <Box w="3/4" maxW="300">
      <FormControl isRequired isInvalid={!selectedCategory}>
        <Select
          minWidth="200"
          placeholder="Choose a category"
          _selectedItem={{
            bg: 'teal.600',
          }}
          mt={1}
          onValueChange={(itemValue) => {
            handleValueChange(itemValue);
          }}
          defaultValue={
            categories.length === 1 ? categories[0].categoryName : null
          }
        >
          {categories.length === 1 ? (
            // only render the first category if only 1 category
            <Select.Item
              isDisabled
              label={categories[0].categoryName}
              value={categories[0].categoryName}
              key={categories[0].categoryName + categories[0].id}
            />
          ) : (
            // otherwise, render all categories
            categories.map((item) => (
              <Select.Item
                label={item.categoryName}
                value={item.categoryName}
                key={reviewItemId + item.categoryName}
              />
            ))
          )}
        </Select>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please select a category
        </FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
}
