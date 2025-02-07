import React, { useState,useRef, useEffect } from 'react';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const messagesEndRef = useRef(null); 

    useEffect(() => {
        // Fetch the CSRF token from Django
        fetch("http://192.168.1.6:8000/chat/get-csrf-token/", {
            credentials: "include", // Ensure cookies are included in the request
        })
            .then(response => response.text())
            .then(token => {
                setCsrfToken(token); // Store the CSRF token
                console.log("CSRF Token fetched:", token);
            })
            .catch(err => console.error("Error fetching CSRF token:", err));
    }, []);

    const sendMessage = async () => {
        if (input.trim()) {
            const userMessage = { sender: 'user', text: input };
            setMessages([...messages, userMessage]);

            try {
                const response = await fetch('http://192.168.1.6:8000/chat/sendChatResponse/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken, // Send the CSRF token
                    },
                    credentials: 'include', // Include cookies
                    body: JSON.stringify({ question: input }),
                });

                if (response.ok) {
                    const data = await response.json(); // Assuming the backend sends a plain response
                    const botReply = { sender: 'bot', text: data.reply };
                    setMessages((prevMessages) => [...prevMessages, botReply]);
                } else {
                    throw new Error('Server error');
                }
            } catch (error) {
                const errorMessage = { sender: 'bot', text: "Error: Could not get a response. Try again later." };
                setMessages((prevMessages) => [...prevMessages, errorMessage]);
            }

            setInput('');
        }
    };

    return (
        <div>
        {/* Floating chat icon */}
        <div
            className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full p-4 shadow-lg cursor-pointer"
            onClick={() => setIsChatOpen(!isChatOpen)}
            style={{ zIndex: 999 }}
        >
            <i className="fas fa-comment-alt"></i> {/* You can use a FontAwesome chat icon */}
        </div>

        {/* Chatbox */}
        {isChatOpen && (
            <div
                className="fixed bottom-5 right-5 w-full sm:w-96 md:w-96 lg:w-96 xl:w-96 bg-white rounded-lg shadow-xl overflow-hidden max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl"
                style={{ zIndex: 999 }}
            >
                <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
                    <h3 className="font-semibold text-lg sm:text-xl">Chatbot</h3>
                    <button
                        className="text-white text-xl"
                        onClick={() => setIsChatOpen(false)}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Messages container */}
                <div className="p-4 space-y-4 h-80 sm:h-96 md:h-96 lg:h-96 overflow-y-auto bg-gray-50">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-xs p-3 rounded-lg text-white ${msg.sender === "user" ? "bg-blue-500" : "bg-gray-500 text-black"}`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                     <div ref={messagesEndRef} />
                </div>

                {/* Input area */}
                <div className="p-4 flex items-center space-x-2 border-t">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Type a message..."
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        )}

    </div>
    );
};

export default Chatbot;
