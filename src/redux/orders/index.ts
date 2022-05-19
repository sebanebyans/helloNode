import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ordersToTableMapper } from '@utils/mapper';
import { uniq } from 'ramda';

type FiltersT = {
  id?: string;
  dateIni?: string;
  dateEnd?: string;
};
const initialFilters = {
  id: '',
  dateIni: '',
  dateEnd: '',
};
type CursorT = string | null;

type PageT = 'next' | 'prev' | 'reset';

type TableNameT = 'customer_service' | 'operation';

export interface OrdersTableState {
  orderFilters?: FiltersT;
  originalOrders: LooseObject[];
  filteredOrders: LooseObject[];
  cursors: CursorT[];
  page: number;
  hasSearched: boolean;
  table: TableNameT;
}

const initialState: OrdersTableState = {
  orderFilters: { ...initialFilters },
  table: 'customer_service',
  cursors: [null],
  page: 0,
  originalOrders: [],
  filteredOrders: [],
  hasSearched: false,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    handleTableName: (state, action: PayloadAction<TableNameT>) => {
      state.originalOrders = [];
      state.filteredOrders = [];
      state.table = action.payload;
      state.hasSearched = false;
      state.page = 0;
      state.cursors = [null];
      state.orderFilters = initialFilters;
    },
    resetFilter: (state) => {
      state.orderFilters = initialFilters;
    },
    setFilter: (state, action: PayloadAction<FiltersT>) => {
      state.orderFilters = action.payload;
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.originalOrders = ordersToTableMapper(action.payload);
      state.hasSearched = true;
    },
    setCursors: (state, action: PayloadAction<string>) => {
      state.cursors = uniq([...state.cursors, action.payload]);
    },
    handlePage: (state, action: PayloadAction<PageT>) => {
      let newPage = state.page;
      if (action.payload === 'reset') {
        state.page = 0;
        state.cursors = [null];
      }
      if (action.payload === 'next') {
        state.page = newPage += 1;
      }
      if (action.payload === 'prev') {
        state.page = newPage -= 1;
      }
      if (newPage <= 0) {
        state.cursors = [null];
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFilter, setOrders, resetFilter, setCursors, handlePage, handleTableName } =
  ordersSlice.actions;

export default ordersSlice.reducer;
