import { useParentMessageId } from "@/features/messages/api/store/use-parent-message-id";
import { useProfileMemberId } from "@/features/members/api/store/use-profile-member-id";

export const usePanel = () => {
    const [parentMessageId, setParentMessageId] = useParentMessageId()
    const [profileMemberId, setProfileMemberId] = useProfileMemberId()
    
    const onOpenProfile = (memberId: string) => {
        setProfileMemberId(memberId);
        setParentMessageId(null)
    }

    const onOpenMessage = (messageId: string) => {
        setParentMessageId(messageId)
        setProfileMemberId(null)
    }


    const onClose = () => {
        setParentMessageId(null)
        setProfileMemberId(null)
    }

    return {
        parentMessageId,
        profileMemberId,
        onOpenProfile,
        onOpenMessage,
        onClose
    }
}