import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TahunAjaran } from '../../interfaces/store';
import api from '../../api';

export interface TahunAjaranAsync {
  isLoading: boolean;
  data: TahunAjaran[];
}

const initialState: TahunAjaranAsync = {
  isLoading: false,
  data: [],
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
      .addCase(fetchTahunAjaran.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTahunAjaran.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchTahunAjaran.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const fetchTahunAjaran = createAsyncThunk(
  'review/fetchTahunAjaran',
  async () => {
    const { data } = await api.get('/tahun_ajaran');
    return data.data;
  }
);

export const { setTahunAjaran } = tahunAjaranSlice.actions;
export default tahunAjaranSlice.reducer;
