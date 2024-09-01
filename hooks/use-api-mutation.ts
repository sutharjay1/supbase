import { useMutation } from "convex/react";
import { useState } from "react";

export const useApiMutation = (mutationFn: any) => {

    const [pending, setPending] = useState(false);

    const apiMutation = useMutation(mutationFn);

    const mutate = (payload: any) => {
        setPending(true);

        return apiMutation(payload).then(() => {
            setPending(false);
        }).catch((error) => {
            throw error
        }).finally(() => {
            setPending(false);
        })
    }

    return {
        mutate,
        pending
    }

}