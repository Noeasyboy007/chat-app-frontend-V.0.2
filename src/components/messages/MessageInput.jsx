import { useState } from "react";
import { BsEmojiSmile, BsSend } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import useSendMessage from "../../hooks/useSendMessage";
import useClickOutside from "../../hooks/useClickOutside";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
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

	const emojiPickerRef = useClickOutside(closeEmojiPicker);

	return (
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
