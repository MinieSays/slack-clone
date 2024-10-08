// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  AlertTriangle,
  HashIcon,
  Loader,
  // MessageSquareText,
  // SendHorizonal,
} from "lucide-react";
import { WorkspaceHeader } from "./workspace-header";
import { SidebarItem } from "./sidebar-item";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { WorkspaceSection } from "./workspace-section";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { UserItem } from "./user-item";
import { useCreateChannelModal } from "@/features/channels/api/store/use-create-channel-modal";
import { useGetWorkSpace } from "@/features/workspaces/api/use-get-workspace";
import { useChannelId } from "@/hooks/use-channelid";
import { useMemberId } from "@/hooks/use-member-id";


export const WorkspaceSidebar = () => {
  const memberId = useMemberId()
  const channelId = useChannelId()
  const workspaceId = useWorkspaceId();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_open, setOpen] = useCreateChannelModal()

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkSpace({
    id: workspaceId,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: members, isLoading: membersLoading } = useGetMembers({ workspaceId })


  if (workspaceLoading || memberLoading) {
    return (
      <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white text-sm">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#5E2C5F] h-full">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
      <div className="flex flex-col px-2 mt-3">
        {/* <SidebarItem label="Threads" icon={MessageSquareText}  className="cursor-not-allowed" onClick={() => {}} />
        <SidebarItem label="Drafts" icon={SendHorizonal} className="cursor-not-allowed" /> */}
      </div>
      <WorkspaceSection label="Channels" hint="New channel" onNew={member.role === "admin" ? () => setOpen(true) : undefined}>
        {channels?.map((item) => (
          <SidebarItem
            key={item._id}
            icon={HashIcon}
            label={item.name}
            id={item._id}
            variant={channelId === item._id ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection label="Direct Messages" hint="New direct message" onNew={() => {}}>
      {members?.map((item) => (
        <UserItem
        key={item.user.name}
        id={item._id}
        label={item.user.name}
        image={item.user.image}
        variant={item._id === memberId ? "active" : "default"}
        />
      ))}
    </WorkspaceSection>
    </div>
  );
};
