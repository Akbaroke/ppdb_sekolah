import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Kelas } from '../../interfaces/store';
import api from '../../api';

export interface KelasAsync {
  isLoading: boolean;
  data: Kelas[];
}

const initialState: KelasAsync = {
  isLoading: false,
  data: [],
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
      .addCase(fetchKelas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchKelas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchKelas.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const fetchKelas = createAsyncThunk('review/fetchKelas', async () => {
  const { data } = await api.get('/kelas');
  return data.data;
});

export const { setKelas } = kelasSlice.actions;
export default kelasSlice.reducer;
