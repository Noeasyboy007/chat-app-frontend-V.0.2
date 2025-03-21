import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
	replyToMessage: null,
	setReplyToMessage: (replyToMessage) => set({ replyToMessage }),
}));

export default useConversation;
