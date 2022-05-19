import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalT = 'editOrder' | 'searchById' | null;

export interface EditableOrderFields {
  rut?: string;
  passport?: string;
  name?: string;
  lastName?: string;
  secondLastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  addressNumber?: string;
  addressDetail?: string;
  stateName?: string;
  province?: string;
  start?: string;
  end?: string;
  orderNumber?: string;
  examId?: string;
  orderState?: string;
  date?: string;
  title?: string;
  birthdate?: string;
}

export interface Modal {
  open: boolean;
  order: EditableOrderFields | null;
  type: ModalT;
}

const initialState: Modal = {
  open: false,
  order: null,
  type: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    editOrder: (state, action: PayloadAction<EditableOrderFields>) => {
      state.open = true;
      state.order = action.payload;
      state.type = 'editOrder';
    },
    searchModal: (state) => {
      state.open = true;
      state.type = 'searchById';
    },
    closeModal: (state) => {
      state.open = false;
      state.order = null;
      state.type = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { editOrder, closeModal, searchModal } = modalSlice.actions;

export default modalSlice.reducer;
