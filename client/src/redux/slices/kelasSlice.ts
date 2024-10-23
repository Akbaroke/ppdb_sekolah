import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Kelas, Pagination } from '../../interfaces/store';
import api from '../../api';

export interface KelasAsync {
  isLoading: boolean;
  data: Kelas[];
  pagination: Pagination;
}

const initialState: KelasAsync = {
  isLoading: false,
  data: [],
  pagination: {
    currentPage: 0,
    totalData: 0,
    totalPage: 0,
  },
};

export const kelasSlice = createSlice({
  name: 'kelas',
  initialState,
  reducers: {
    setKelas: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPaginatedKelas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPaginatedKelas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPaginatedKelas.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchSearchKelas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSearchKelas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchSearchKelas.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const fetchPaginatedKelas = createAsyncThunk(
  'kelas/fetchPaginated',
  async ({ page = 1 }: { page?: number }) => {
    const pageNumber = page ? `?page=${page}` : '';
    const { data } = await api.get(`/kelas${pageNumber}`);
    return data;
  }
);

export const fetchSearchKelas = createAsyncThunk(
  'kelas/fetchSearch',
  async ({
    searchQuery = '',
    page = 1,
  }: {
    searchQuery?: string;
    page?: number;
  }) => {
    const pageNumber = page ? `?page=${page}` : '';
    const querySearch = searchQuery ? `&s=${searchQuery}` : '';
    const { data } = await api.get(`/kelas${pageNumber}${querySearch}`);
    return data;
  }
);

export const { setKelas } = kelasSlice.actions;
export default kelasSlice.reducer;
