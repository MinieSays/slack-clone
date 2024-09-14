"use client";


import { UserButton } from "@/features/auth/user-button";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useGetWorkSpaces } from "@/features/workspaces/api/use-get-workspaces";

export default function Home() {
  const [open, setOpen] = useCreateWorkspaceModal()
  const { data, isLoading } = useGetWorkSpaces()
  const workspaceId = useMemo(() => data?.[0]?._id, [data])
  const router = useRouter()
  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`)
    } else if (!open) {
      setOpen(true)
    }
  }, [workspaceId, isLoading, open, setOpen, router])
  return (
    <div>
      <UserButton />
    </div>
  );
}
