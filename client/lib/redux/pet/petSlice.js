
import { createSlice } from '@reduxjs/toolkit';

const petSlice = createSlice({
  name: 'pet',
  initialState: {
    pets: [],
  },
  reducers: {
    addPet: (state, action) => {
      state.pets.push(action.payload);
    },
  },
});

export const { addPet } = petSlice.actions;
export const selectPets = (state) => state.pet.pets;
export default petSlice.reducer;
