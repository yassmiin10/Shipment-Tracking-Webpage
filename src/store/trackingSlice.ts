import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface TrackingResponse {
  CurrentStatus: {
    state: string;
    timestamp: string;
  };
  TrackingNumber: string;
  provider: string;
  PromisedDate: string;
  CreateDate: string;
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
  createDate: string | null;
  statusHistory: Array<{ state: string; timestamp: string; hub: string }> | null;
  color: string;
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
  createDate: null,
  statusHistory: null,
  color: 'gray', // Default color
  status: 'idle',
  error: null,
  loading: false,
};

const getColorFromStatus = (status: string): string => {
  switch (status) {
    case 'DELIVERED':
      return 'green';
    case 'OUT_FOR_DELIVERY':
      return 'blue';
    case 'IN_TRANSIT':
      return 'yellow';
    default:
      return 'gray';
  }
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
        const { CurrentStatus, TrackingNumber, provider, PromisedDate, CreateDate, TransitEvents } = action.payload;

        state.currentStatus = CurrentStatus?.state ?? 'UNKNOWN';
        state.trackingNumber = TrackingNumber ?? 'N/A';
        state.provider = provider ?? 'N/A';
        state.timestamp = CurrentStatus?.timestamp ?? '';
        state.promisedDate = PromisedDate ?? '';
        state.createDate = CreateDate ?? '';
        state.statusHistory = TransitEvents ?? [];
        state.data = action.payload;
        state.color = getColorFromStatus(CurrentStatus?.state || 'UNKNOWN'); // Update the color
        state.status = 'succeeded';
        state.loading = false;
      })
      .addCase(fetchTracking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
        state.loading = false;
      });
  },
});

export default trackingSlice.reducer;
