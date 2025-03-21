import { useState } from "react";
import { BsEmojiSmile, BsSend, BsX } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import useSendMessage from "../../hooks/useSendMessage";
import useClickOutside from "../../hooks/useClickOutside";
import useConversation from "../../zustand/useConversation";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const { loading, sendMessage } = useSendMessage();
	const { selectedConversation, replyToMessage, setReplyToMessage } = useConversation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message, replyToMessage?._id);
		setMessage("");
		if (replyToMessage) setReplyToMessage(null);
	};

	const handleEmojiClick = (emojiObject) => {
		setMessage((prevMessage) => prevMessage + emojiObject.emoji);
	};

	const toggleEmojiPicker = () => {
		setShowEmojiPicker(!showEmojiPicker);
	};

	const closeEmojiPicker = () => {
		setShowEmojiPicker(false);
	};
	
	const cancelReply = () => {
		setReplyToMessage(null);
	};

	const emojiPickerRef = useClickOutside(closeEmojiPicker);

	return (
		<>
			{replyToMessage && (
				<div className="bg-gray-800 p-2 mx-4 rounded-t-lg border-l-2 border-purple-500 flex justify-between items-start">
					<div>
						<div className="text-xs text-purple-400">
							Replying to {replyToMessage.senderId === selectedConversation._id ? selectedConversation.username : 'yourself'}
						</div>
						<div className="text-sm text-gray-300 truncate pr-5">
							{replyToMessage.message}
						</div>
					</div>
					<button 
						onClick={cancelReply}
						className="text-gray-500 hover:text-white"
					>
						<BsX size={20} />
					</button>
				</div>
			)}
			
			<form className='px-4 my-3' onSubmit={handleSubmit}>
				<div className='w-full relative'>
					<input
						type='text'
						className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
						placeholder='Send a message'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<div className='absolute inset-y-0 end-0 flex items-center pe-3 gap-2'>
						<button 
							type='button' 
							onClick={toggleEmojiPicker} 
							className='text-gray-300 hover:text-white mr-2'
						>
							<BsEmojiSmile size={20} />
						</button>
						<button type='submit'>
							{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
						</button>
					</div>
				</div>
				
				{showEmojiPicker && (
					<div className='absolute bottom-16 right-4 z-10' ref={emojiPickerRef}>
						<EmojiPicker onEmojiClick={handleEmojiClick} />
					</div>
				)}
			</form>
		</>
	);
};
export default MessageInput;

// STARTER CODE SNIPPET
// import { BsSend } from "react-icons/bs";

// const MessageInput = () => {
// 	return (
// 		<form className='px-4 my-3'>
// 			<div className='w-full'>
// 				<input
// 					type='text'
// 					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
// 					placeholder='Send a message'
// 				/>
// 				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
// 					<BsSend />
// 				</button>
// 			</div>
// 		</form>
// 	);
// };
// export default MessageInput;
