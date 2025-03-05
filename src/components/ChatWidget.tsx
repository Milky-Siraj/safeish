import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Phone, 
  Mail, 
  Bot, 
  User, 
  Smartphone, 
  Apple, 
  PlayCircle,
  Paperclip,
  Image as ImageIcon,
  File,
  Mic,
  StopCircle,
  Loader
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent' | 'bot';
  timestamp: Date;
  attachments?: Array<{
    type: 'file' | 'image' | 'audio';
    url: string;
    name: string;
    size?: number;
  }>;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'contact' | 'app'>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsVisible(currentScrollPos <= lastScrollPos || currentScrollPos < 100);
      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollPos]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: uuidv4(),
          text: "Hello! I'm your AI assistant. How can I help you today? You can:\n\n" +
                "• Ask questions about our services\n" +
                "• Get help with transactions\n" +
                "• Share files or images\n" +
                "• Record voice messages\n\n" +
                "What would you like to do?",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const isImage = file.type.startsWith('image/');
        const newMessage: Message = {
          id: uuidv4(),
          text: '',
          sender: 'user',
          timestamp: new Date(),
          attachments: [{
            type: isImage ? 'image' : 'file',
            url: e.target?.result as string,
            name: file.name,
            size: file.size
          }]
        };
        setMessages(prev => [...prev, newMessage]);
        simulateResponse(file.name);
      };
      
      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsDataURL(file);
      }
    });

    // Clear the input
    event.target.value = '';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const newMessage: Message = {
          id: uuidv4(),
          text: '',
          sender: 'user',
          timestamp: new Date(),
          attachments: [{
            type: 'audio',
            url: audioUrl,
            name: `Voice Message (${formatRecordingTime(recordingTime)})`,
          }]
        };
        
        setMessages(prev => [...prev, newMessage]);
        simulateResponse('voice message');
        setRecordingTime(0);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const simulateResponse = (context: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const responses = {
        image: "I see you've shared an image! I'll analyze it and provide relevant assistance. What would you like to know about it?",
        file: `I've received your file "${context}". Would you like me to help you process or analyze its contents?`,
        voice: "I've received your voice message. I'll analyze it and respond accordingly. Is there anything specific you'd like me to focus on?",
        default: "Thank you for sharing that. How can I assist you further with this information?"
      };

      const responseText = context.includes('image') 
        ? responses.image 
        : context.includes('voice') 
          ? responses.voice
          : context.endsWith('.pdf') || context.endsWith('.doc') || context.endsWith('.txt')
            ? responses.file
            : responses.default;

      const response: Message = {
        id: uuidv4(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: uuidv4(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: uuidv4(),
        text: generateAIResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi')) {
      return "Hello! How can I assist you today with Safe Trade Ethiopia's services?";
    } else if (input.includes('help')) {
      return "I'd be happy to help! Here are some things I can assist you with:\n\n" +
             "• Explain our escrow service\n" +
             "• Guide you through transactions\n" +
             "• Provide market insights\n" +
             "• Help with technical issues\n\n" +
             "What specific assistance do you need?";
    } else if (input.includes('escrow') || input.includes('transaction')) {
      return "Our escrow service ensures safe transactions by:\n\n" +
             "1. Holding funds securely\n" +
             "2. Verifying delivery\n" +
             "3. Releasing payment only after confirmation\n\n" +
             "Would you like to learn more about how it works?";
    } else if (input.includes('price') || input.includes('cost')) {
      return "Our fees are very competitive:\n\n" +
             "• 1% for transactions over ETB 100,000\n" +
             "• 1.5% for ETB 10,000-100,000\n" +
             "• 2% for transactions under ETB 10,000\n\n" +
             "Would you like to see a detailed breakdown?";
    } else {
      return "Thank you for your message. I understand you're interested in " +
             `"${userInput}". Could you please provide more details about your specific needs? ` +
             "I'm here to help with any questions about our services, transactions, or general support.";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    alert('Thank you for your message. We will get back to you soon!');
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50"
        >
          {isOpen ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-80 md:w-96"
            >
              {/* Header */}
              <div className="bg-green-700 text-white p-4 rounded-t-lg flex justify-between items-center">
                <h3 className="font-semibold">Chat With Us</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 py-2 text-sm font-medium ${
                    activeTab === 'chat'
                      ? 'text-green-700 border-b-2 border-green-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Live Chat
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`flex-1 py-2 text-sm font-medium ${
                    activeTab === 'contact'
                      ? 'text-green-700 border-b-2 border-green-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Contact
                </button>
                <button
                  onClick={() => setActiveTab('app')}
                  className={`flex-1 py-2 text-sm font-medium ${
                    activeTab === 'app'
                      ? 'text-green-700 border-b-2 border-green-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Get App
                </button>
              </div>

              {/* Content */}
              <div className="h-96">
                {activeTab === 'chat' && (
                  <div className="h-full flex flex-col">
                    <div
                      ref={chatContainerRef}
                      className="flex-1 overflow-y-auto p-4 space-y-4"
                    >
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.sender === 'user'
                                ? 'bg-green-700 text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <div className="flex items-center mb-1">
                              {message.sender === 'bot' ? (
                                <Bot size={16} className="mr-1" />
                              ) : message.sender === 'agent' ? (
                                <User size={16} className="mr-1" />
                              ) : null}
                              <span className="text-xs opacity-75">
                                {message.sender === 'user' ? 'You' : 'Support'}
                              </span>
                            </div>
                            {message.text && (
                              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                            )}
                            {message.attachments?.map((attachment, index) => (
                              <div key={index} className="mt-2">
                                {attachment.type === 'image' ? (
                                  <img 
                                    src={attachment.url} 
                                    alt="Shared image" 
                                    className="max-w-full rounded-md"
                                  />
                                ) : attachment.type === 'audio' ? (
                                  <audio 
                                    src={attachment.url} 
                                    controls 
                                    className="max-w-full"
                                  />
                                ) : (
                                  <div className="flex items-center bg-white bg-opacity-10 rounded-md p-2">
                                    <File size={16} className="mr-2" />
                                    <span className="text-sm truncate">{attachment.name}</span>
                                    {attachment.size && (
                                      <span className="text-xs ml-2">
                                        ({formatFileSize(attachment.size)})
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                            <span className="text-xs opacity-75 mt-1 block">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 rounded-lg p-3">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                    <div className="p-4 border-t">
                      <div className="flex items-end space-x-2">
                        <div className="flex-1 relative">
                          <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="w-full resize-none border rounded-lg pl-2 pr-8 py-2 max-h-32 focus:outline-none focus:ring-2 focus:ring-green-500"
                            rows={1}
                            style={{
                              minHeight: '40px',
                              height: 'auto',
                              maxHeight: '120px'
                            }}
                          />
                          <div className="absolute right-2 bottom-2 flex space-x-1">
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              className="text-gray-400 hover:text-gray-600 p-1"
                              title="Attach file"
                            >
                              <Paperclip size={16} />
                            </button>
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              className="text-gray-400 hover:text-gray-600 p-1"
                              title="Share image"
                            >
                              <ImageIcon size={16} />
                            </button>
                          </div>
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          className="hidden"
                          multiple
                          accept="image/*,.pdf,.doc,.docx,.txt"
                        />
                        {isRecording ? (
                          <button
                            onClick={stopRecording}
                            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
                          >
                            <StopCircle size={20} />
                            <span className="ml-1">{formatRecordingTime(recordingTime)}</span>
                          </button>
                        ) : (
                          <button
                            onClick={startRecording}
                            className="text-gray-400 hover:text-gray-600 p-2"
                            title="Record audio"
                          >
                            <Mic size={20} />
                          </button>
                        )}
                        <button
                          onClick={handleSendMessage}
                          className="bg-green-700 text-white p-2 rounded-lg hover:bg-green-800 transition-colors"
                          disabled={!inputText.trim() && !isRecording}
                        >
                          <Send size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="p-6 overflow-y-auto h-full">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Contact Us</h4>
                      <div className="space-y-3">
                        <a
                          href="tel:+251911234567"
                          className="flex items-center text-gray-600 hover:text-green-700"
                        >
                          <Phone size={20} className="mr-2" />
                          <span>+251 911 234 567</span>
                        </a>
                        <a
                          href="mailto:support@safetradeethiopia.com"
                          className="flex items-center text-gray-600 hover:text-green-700"
                        >
                          <Mail size={20} className="mr-2" />
                          <span>support@safetradeethiopia.com</span>
                        </a>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-4">Send us a message</h4>
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div>
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                          />
                        </div>
                        <div>
                          <input
                            type="email"
                            placeholder="Your Email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                          />
                        </div>
                        <div>
                          <textarea
                            placeholder="Your Message"
                            value={contactForm.message}
                            onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                            rows={4}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition-colors"
                        >
                          Send Message
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {activeTab === 'app' && (
                  <div className="p-6 space-y-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-4">
                        <Smartphone size={24} className="text-green-700 mr-2" />
                        <h4 className="font-medium text-gray-900">Download Our App</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-6">
                        Get faster service and real-time notifications with our mobile app
                      </p>
                      <div className="flex justify-center mb-6">
                        <QRCodeSVG
                          value="https://safetradeethiopia.com/app"
                          size={150}
                          level="H"
                          includeMargin={true}
                        />
                      </div>
                      <div className="space-y-3">
                        <a
                          href="#"
                          className="block bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-center justify-center">
                            <Apple size={20} className="mr-2" />
                            <span>Download on App Store</span>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="block bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition-colors"
                        >
                          <div className="flex items-center justify-center">
                            <PlayCircle size={20} className="mr-2" />
                            <span>Get it on Play Store</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="bg-green-700 text-white p-4 rounded-full shadow-lg hover:bg-green-800 transition-colors"
            >
              <MessageCircle size={24} />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWidget;