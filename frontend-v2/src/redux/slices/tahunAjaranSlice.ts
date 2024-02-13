import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Pagination, TahunAjaran } from '../../interfaces/store';
import api from '../../api';

export interface TahunAjaranAsync {
  isLoading: boolean;
  data: TahunAjaran[];
  pagination: Pagination;
}

const initialState: TahunAjaranAsync = {
  isLoading: false,
  data: [],
  pagination: {
    currentPage: 0,
    totalData: 0,
    totalPage: 0,
  },
};

export const tahunAjaranSlice = createSlice({
  name: 'tahunAjaran',
  initialState,
  reducers: {
    setTahunAjaran: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPaginatedTahunAjaran.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPaginatedTahunAjaran.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPaginatedTahunAjaran.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchSearchTahunAjaran.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSearchTahunAjaran.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchSearchTahunAjaran.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const fetchPaginatedTahunAjaran = createAsyncThunk(
  'tahunAjaran/fetchPaginated',
  async ({ page = 1 }: { page?: number }) => {
    const pageNumber = page ? `?page=${page}` : '';
    const { data } = await api.get(`/tahun_ajaran${pageNumber}`);
    return data;
  }
);

export const fetchSearchTahunAjaran = createAsyncThunk(
  'tahunAjaran/fetchSearch',
  async ({
    searchQuery = '',
    page = 1,
  }: {
    searchQuery?: string;
    page?: number;
  }) => {
    const pageNumber = page ? `?page=${page}` : '';
    const querySearch = searchQuery ? `&s=${searchQuery}` : '';
    const { data } = await api.get(`/tahun_ajaran${pageNumber}${querySearch}`);
    return data;
  }
);

export const { setTahunAjaran } = tahunAjaranSlice.actions;
export default tahunAjaranSlice.reducer;
