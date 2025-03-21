import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { BsReply } from "react-icons/bs";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation, setReplyToMessage, messages } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-purple-700" : "";

	const shakeClass = message.shouldShake ? "shake" : "";
	
	// Find the replied message if this message is a reply
	const repliedToMessage = message.replyTo ? 
		messages.find(msg => msg._id === message.replyTo) : null;
	
	const handleReply = () => {
		setReplyToMessage(message);
	};

	return (
		<div className={`chat ${chatClassName} group relative`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			
			<div className="flex flex-col">
				{repliedToMessage && (
					<div className={`chat-bubble ${fromMe ? 'bg-purple-900' : 'bg-gray-800'} text-xs text-gray-300 py-1 mb-1 opacity-80`}>
						Replying to: {repliedToMessage.message.length > 30 ? 
							repliedToMessage.message.substring(0, 30) + '...' : 
							repliedToMessage.message}
					</div>
				)}
				
				<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2 overflow-hidden`}>
					{message.message}
				</div>
			</div>
			
			<div className='chat-footer opacity-50 text-xs flex gap-2 items-center'>
				{formattedTime}
				<button 
					onClick={handleReply}
					className="reply-button opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-700 hover:bg-gray-600 rounded-full p-1 text-white shadow-md"
				>
					<BsReply size={14} />
				</button>
			</div>
		</div>
	);
};
export default Message;
