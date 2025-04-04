import React, { useState, useEffect, useRef } from 'react';
import "./ChatPage.css";
import ChatHeader from './ChatHeader';
import ReactMarkdown from 'react-markdown';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const handleSend = async () => {
        if (input.trim() !== '') {
            setMessages([...messages, { user: 'User', text: input }]);
            setInput('');
            setIsTyping(true);

            try {
                const response = await fetch('https://cosmetics-chatbot-backend.onrender.com/api/ask', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ question: input }),
                });

                const data = await response.json();
                if (!data.success) {
                    throw new Error(data.message);
                }

                setIsTyping(false);
                setMessages(prevMessages => [
                    ...prevMessages,
                    { user: 'Teacher', text: data.response }
                ]);
            } catch (error) {
                console.error('Error:', error);
                setIsTyping(false);
                setMessages(prevMessages => [
                    ...prevMessages,
                    { user: 'System', text: 'Sorry, there was an error processing your request.' }
                ]);
            }
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    return (
        <div className="chat-container">
            <ChatHeader />
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.user}`}>
                        <div className="message-content">
                            {msg.user === 'Teacher' ? (
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                            ) : (
                                <div>{msg.text}</div>
                            )}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="chat-message Teacher typing">
                        <div className="message-content">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    onKeyDown={handleKeyDown} 
                    placeholder="Ask your physics question..." 
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default ChatPage;
