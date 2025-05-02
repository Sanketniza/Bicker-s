import { setCompanies } from "@/store/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";



const useGetAllCompanies = () => { 

    const dispatch = useDispatch();

    useEffect(() => {

        const fetchCompanies = async () => {

            try {

                const response = await axios.get("http://localhost:8000/api/v1/company/get", {
                    withCredentials: true,
                });

                console.log("response data from hook", response.data.companies);
                // Check if the response is successful and contains companies

                if(response.data.success){
                    dispatch(setCompanies(response.data.companies)); // -> sets the data of the all companies in the redux store to be used in the Companies component or other components.
                }
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };

        fetchCompanies();

        // return () => {
        //     dispatch({ type: "CLEAR_COMPANIES" });
        // }
    })

}


export default useGetAllCompanies;