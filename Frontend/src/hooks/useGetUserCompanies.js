import { setCompanies, setSingleCompany } from '@/store/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/api'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetUserCompanies = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserCompanies = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${COMPANY_API_END_POINT}`, {
                    withCredentials: true
                });

                console.log("User companies response:", res.data);

                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                    // Initialize singleCompany with first company or empty object
                    if (res.data.companies && res.data.companies.length > 0) {
                        dispatch(setSingleCompany(res.data.companies[0]));
                    } else {
                        dispatch(setSingleCompany({}));
                    }
                } else {
                    toast.error("Failed to fetch companies");
                    dispatch(setCompanies([]));
                    dispatch(setSingleCompany({}));
                }
            } catch (error) {
                console.error("Error fetching user companies:", error);
                toast.error(error.response?.data?.message || "Error fetching companies");
                dispatch(setCompanies([]));
                dispatch(setSingleCompany({}));
            } finally {
                setLoading(false);
            }
        }

        fetchUserCompanies();
    }, [dispatch])

    return { loading };
}

export default useGetUserCompanies;