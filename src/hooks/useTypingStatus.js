import { useState, useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';

const useTypingStatus = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Handle sending typing status
  const handleTyping = () => {
    if (!socket || !selectedConversation) return;
    
    // Clear any existing timeout
    if (typingTimeout) clearTimeout(typingTimeout);
    
    // Send typing event to the server
    socket.emit('typing', { 
      receiverId: selectedConversation._id,
    });
    
    // Set a timeout to stop typing after 2 seconds of inactivity
    const timeout = setTimeout(() => {
      socket.emit('stopTyping', { 
        receiverId: selectedConversation._id,
      });
    }, 2000);
    
    setTypingTimeout(timeout);
  };

  // Listen for typing events from other users
  useEffect(() => {
    if (!socket) return;
    
    const handleUserTyping = (data) => {
      if (selectedConversation && data.senderId === selectedConversation._id) {
        setIsOtherUserTyping(true);
      }
    };
    
    const handleUserStopTyping = (data) => {
      if (selectedConversation && data.senderId === selectedConversation._id) {
        setIsOtherUserTyping(false);
      }
    };
    
    socket.on('userTyping', handleUserTyping);
    socket.on('userStopTyping', handleUserStopTyping);
    
    return () => {
      socket.off('userTyping', handleUserTyping);
      socket.off('userStopTyping', handleUserStopTyping);
    };
  }, [socket, selectedConversation]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [typingTimeout]);

  return { isOtherUserTyping, handleTyping };
};

export default useTypingStatus; 