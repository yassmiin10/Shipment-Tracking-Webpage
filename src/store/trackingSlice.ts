import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface TrackingResponse {
  CurrentStatus: {
    state: string;
    timestamp: string;
  };
  TrackingNumber: string;
  provider: string;
  PromisedDate: string;
  TransitEvents: Array<{
    state: string;
    timestamp: string;
    hub: string;
  }>;
}

interface TrackingState {
  data: TrackingResponse | null;
  currentStatus: string | null;
  trackingNumber: string | null;
  provider: string | null;
  timestamp: string | null;
  promisedDate: string | null;
  statusHistory: Array<{ state: string; timestamp: string; hub: string }> | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  loading: boolean;
}

const initialState: TrackingState = {
  data: null,
  currentStatus: null,
  trackingNumber: null,
  provider: null,
  timestamp: null,
  promisedDate: null,
  statusHistory: null,
  status: 'idle',
  error: null,
  loading: false,
};

export const fetchTracking = createAsyncThunk<TrackingResponse, string, { rejectValue: string }>(
  'tracking/fetchTracking',
  async (trackingNumber, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://tracking.bosta.co/shipments/track/${trackingNumber}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Unexpected error occurred');
    }
  }
);

const trackingSlice = createSlice({
  name: 'tracking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracking.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchTracking.fulfilled, (state, action) => {
        const { CurrentStatus, TrackingNumber, provider, PromisedDate, TransitEvents } = action.payload;
        state.currentStatus = CurrentStatus?.state ?? 'UNKNOWN';
        state.trackingNumber = TrackingNumber ?? 'N/A';
        state.provider = provider ?? 'N/A';
        state.timestamp = CurrentStatus?.timestamp ?? '';
        state.promisedDate = PromisedDate ?? '';
        state.statusHistory = TransitEvents ?? [];
        state.data = action.payload;
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(fetchTracking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
        state.loading = false;
      });
  },
});

export default trackingSlice.reducer;

