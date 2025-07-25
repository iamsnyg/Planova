// import { useFormState } from "@/hooks/use-form-state";
import { useState } from "react";
import { toast } from "sonner";


const useFetch = (cb) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const fn = async (...args) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await cb(...args);
            setData(response);
            setError(null);
        } catch (err) {
            setError(err);
            toast.error(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }

    return {data, setData, loading, error, fn}
}
export default useFetch;