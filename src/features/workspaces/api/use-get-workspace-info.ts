import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";





interface useGetWorkSpaceInfoProps {
    id: Id<"workspaces">
}

export const useGetWorkSpaceInfo = ({ id }: useGetWorkSpaceInfoProps) => {
    const data = useQuery(api.workspaces.getInfoById, { id })
    const isLoading = data === undefined

    return { data, isLoading}
}