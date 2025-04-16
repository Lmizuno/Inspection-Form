import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inspectedItems: [],
  builderInfo: {
    builderLicence: '',
    builderName: '',
    representative: ''
  },
  homeInfo: {
    lotNumber: '',
    planCode: '',
    munincipality: '',
    projectName: '',
    level: '',
    unit: '',
    address: ''
  },
  signatures: {
    purchaserOne: {},
    purchaserTwo: {},
    designate: {},
    date: null
  },
  unitEnrolment: '',
  possessionDate: null
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateInspectedItems: (state, action) => {
      state.inspectedItems = action.payload;
    },
    updateBuilderInfo: (state, action) => {
      state.builderInfo = { ...state.builderInfo, ...action.payload };
    },
    updateHomeInfo: (state, action) => {
      state.homeInfo = { ...state.homeInfo, ...action.payload };
    },
    updateSignatures: (state, action) => {
      state.signatures = { ...state.signatures, ...action.payload };
    },
    updateUnitEnrolment: (state, action) => {
      state.unitEnrolment = action.payload;
    },
    updatePossessionDate: (state, action) => {
      state.possessionDate = action.payload;
    }
  }
});

export const {
  updateInspectedItems,
  updateBuilderInfo,
  updateHomeInfo,
  updateSignatures,
  updateUnitEnrolment,
  updatePossessionDate
} = formSlice.actions;

export default formSlice.reducer; 