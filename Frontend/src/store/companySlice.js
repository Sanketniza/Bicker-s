
import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    
    name:"company",

    initialState:{
        // singleCompany:null,
        // companies:[],
        // searchCompanyByText:"",

        companies: [],
        singleCompany: {},  // Initialize as empty object, not null
        loading: false,
        error: null
    },

    reducers:{
        // actions

        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload || {}; // Ensure it's never null
        },

        setSearchCompanyByText:(state,action) => {
            state.searchCompanyByText = action.payload;
        }
    }
});

export const {setSingleCompany, setCompanies,setSearchCompanyByText} = companySlice.actions;
export default companySlice.reducer;