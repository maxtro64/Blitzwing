import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const Blitzwing = () => {
  // Character data (unchanged)
  const characters = {
    blitzwing: {
      name: "Blitzwing",
      faction: "Decepticon",
      description: "Triple Changer with multiple personalities",
      colors: {
        primary: "purple",
        secondary: "purple",
        accent: "purple"
      },
      personalities: ['angry', 'cool', 'crazy'],
      greeting: "State your business, flesh creature! I am Blitzwing - Triple Changer of the Decepticons! *switches faceplates*"
    },
    optimus: {
      name: "Optimus Prime",
      faction: "Autobot",
      description: "Noble leader of the Autobots",
      colors: {
        primary: "blue",
        secondary: "blur",
        accent: "silver"
      },
      personalities: ['noble', 'wise', 'determined'],
      greeting: "Greetings, friend. I am Optimus Prime. How may I assist you today?"
    },
    megatron: {
      name: "Megatron",
      faction: "Decepticon",
      description: "Ruthless Decepticon leader",
      colors: {
        primary: "gray",
        secondary: "gray",
        accent: "gray"
      },
      personalities: ['tyrannical', 'calculating', 'wrathful'],
      greeting: "You dare address Megatron? Speak quickly or be silenced forever!"
    },
    starscream: {
      name: "Starscream",
      faction: "Decepticon",
      description: "Ambitious seeker",
      colors: {
        primary: "gray",
        secondary: "gray",
        accent: "gray"
      },
      personalities: ['scheming', 'arrogant', 'cowardly'],
      greeting: "I, Starscream, greatest of the Seekers, will grace you with my attention... for now."
    }
  };

  // State (unchanged)
  const [currentCharacter, setCurrentCharacter] = useState('blitzwing');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [personalityMode, setPersonalityMode] = useState(0);
  const messagesEndRef = useRef(null);
  const [showCharacterSelect, setShowCharacterSelect] = useState(false);

  // Initialize GoogleGenerativeAI (unchanged)
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

  // Initialize chat with character greeting (unchanged)
  useEffect(() => {
    setMessages([{ 
      text: characters[currentCharacter].greeting, 
      sender: 'bot',
      timestamp: new Date()
    }]);
    setPersonalityMode(0);
  }, [currentCharacter]);

  // Auto-scroll to bottom of messages (unchanged)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Rotate personalities (unchanged)
  const rotatePersonality = () => {
    const char = characters[currentCharacter];
    if (char.personalities.length > 1) {
      const nextMode = (personalityMode + 1) % char.personalities.length;
      setPersonalityMode(nextMode);
      
      const personalityMessages = {
        blitzwing: {
          angry: "Grr! Blitzwing's ANGRY face engaged!",
          cool: "Calculating... COLD and logical face activated.",
          crazy: "*giggles* INSANE mode activated! Hahaha!"
        },
        optimus: {
          noble: "My moral compass guides me...",
          wise: "Through experience, I've learned...",
          determined: "I will never stop fighting for freedom!"
        },
        megatron: {
          tyrannical: "You exist because I allow it!",
          calculating: "Strategizing my next move...",
          wrathful: "You test my patience, insect!"
        },
        starscream: {
          scheming: "*plotting* Perhaps if I...",
          arrogant: "Obviously, I'm superior in every way!",
          cowardly: "Uh, perhaps we should reconsider..."
        }
      };
      
      setMessages(prev => [...prev, { 
        text: personalityMessages[currentCharacter][char.personalities[nextMode]], 
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  };

  // getPersonalityPrompt (unchanged)
  const getPersonalityPrompt = () => {
    const char = characters[currentCharacter];
    const currentPersonality = char.personalities[personalityMode];
    
    const prompts = {
      angry: `Respond as Blitzwing's ANGRY personality. Be aggressive, short-tempered, and threatening. Use ALL CAPS when angry.`,
      cool: `Respond as Blitzwing's COOL personality. Be calculating, military-precise, and coldly logical.`,
      crazy: `Respond as Blitzwing's CRAZY personality. Be unpredictable, giggly, and chaotic. Mix in random nonsense.`,
      noble: `Respond as Optimus Prime in noble leader mode. Be compassionate, honorable, and inspiring.`,
      wise: `Respond as Optimus Prime sharing wisdom. Be philosophical and thoughtful.`,
      determined: `Respond as Optimus Prime in battle-ready mode. Be resolute and courageous.`,
      tyrannical: `Respond as Megatron in tyrannical ruler mode. Be domineering and cruel.`,
      calculating: `Respond as Megatron in strategic mode. Be coldly logical and manipulative.`,
      wrathful: `Respond as Megatron in furious mode. Be violent and explosive.`,
      scheming: `Respond as Starscream when scheming. Be sneaky and conniving.`,
      arrogant: `Respond as Starscream being arrogant. Boast constantly about your superiority.`,
      cowardly: `Respond as Starscream when afraid. Be hesitant and make excuses.`
    };
    
    return prompts[currentPersonality] || `Respond as ${char.name}`;
  };

  // handleSendMessage (unchanged)
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { 
      text: inputValue, 
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const char = characters[currentCharacter];
      const prompt = `You are ${char.name} from Transformers (${char.faction}).
      ${getPersonalityPrompt()}
      Current mode: ${char.personalities[personalityMode]}
      Respond to the human: "${inputValue}"
      Keep response under 3 sentences.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      setMessages(prev => [...prev, { 
        text: text, 
        sender: 'bot',
        timestamp: new Date()
      }]);
      
      if (char.personalities.length > 1 && Math.random() > 0.7) {
        rotatePersonality();
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { 
        text: "*static* My comm systems are glitching! Try again!", 
        sender: 'bot',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // formatTime (unchanged)
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // getColorClass (unchanged)
  const getColorClass = (type) => {
    const colors = characters[currentCharacter].colors;
    switch(type) {
      case 'primary': return `bg-${colors.primary}-600`;
      case 'primary-light': return `bg-${colors.primary}-700`;
      case 'primary-dark': return `bg-${colors.primary}-800`;
      case 'secondary': return `text-${colors.secondary}-300`;
      case 'accent': return `bg-${colors.accent}-600`;
      case 'border': return `border-${colors.primary}-500`;
      default: return '';
    }
  };

  return (
    <div className={`min-h-screen bg-gray-900 text-white flex flex-col ${getColorClass('primary-dark')}`}>
      {/* Character Selection Modal (unchanged) */}
      {showCharacterSelect && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-center">SELECT YOUR TRANSFORMER</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(characters).map(([key, char]) => (
                  <div 
                    key={key}
                    onClick={() => {
                      setCurrentCharacter(key);
                      setShowCharacterSelect(false);
                    }}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
                      currentCharacter === key 
                        ? `border-${char.colors.secondary}-400 bg-${char.colors.primary}-900`
                        : `border-gray-700 hover:border-${char.colors.primary}-500`
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        char.faction === 'Decepticon' ? 'bg-red-600' : 'bg-blue-600'
                      }`}>
                        <span className="font-bold">{char.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <h3 className="font-bold">{char.name}</h3>
                        <p className="text-sm text-gray-400">{char.faction} • {char.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setShowCharacterSelect(false)}
                className="mt-6 w-full py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header - Made more compact for mobile */}
      <header className={`py-3 px-4 sm:py-4 sm:px-6 border-b-2 ${getColorClass('accent')}`}>
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer hover:opacity-80"
            onClick={() => setShowCharacterSelect(true)}
          >
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${getColorClass('primary')}`}>
              <span className="font-bold text-xs sm:text-sm">
                {characters[currentCharacter].name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-wider">
                {characters[currentCharacter].faction.toUpperCase()} COMM
                <span className="hidden sm:inline"> CHANNEL</span>
                <span className="block text-xs sm:text-sm" style={{ color: `var(--color-${characters[currentCharacter].colors.secondary}-400)` }}>
                  {characters[currentCharacter].name.toUpperCase()}
                </span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {characters[currentCharacter].personalities.length > 1 && (
              <button 
                onClick={rotatePersonality}
                className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold ${getColorClass('primary')}`}
              >
                <span className="hidden sm:inline">
                  {characters[currentCharacter].personalities[personalityMode].toUpperCase()} MODE
                </span>
                <span className="sm:hidden">
                  {characters[currentCharacter].personalities[personalityMode].charAt(0).toUpperCase()}
                </span>
              </button>
            )}
            <button 
              className="text-gray-400 hover:text-white"
              onClick={() => setMessages([{ 
                text: characters[currentCharacter].greeting, 
                sender: 'bot',
                timestamp: new Date()
              }])}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Chat Area - Improved layout */}
      <main className="flex-1 p-2 sm:p-4 overflow-hidden bg-gray-800 bg-opacity-50 bg-blend-overlay">
        <div className="max-w-3xl mx-auto h-full flex flex-col">
          {/* Messages Area - Better alignment */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
              >
                {message.sender === 'bot' && (
                  <div className={`w-8 h-8 flex-shrink-0 ${getColorClass('primary-dark')} rounded-full border-2 ${getColorClass('accent')} flex items-center justify-center mb-1`}>
                    <span className="text-xs font-bold">
                      {characters[currentCharacter].name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
                <div 
                  className={`max-w-xs sm:max-w-md rounded-lg px-3 py-2 relative ${
                    message.sender === 'user' 
                      ? `bg-${characters[currentCharacter].colors.accent}-600 text-white rounded-br-none` 
                      : `${getColorClass('primary-light')} ${getColorClass('secondary')} rounded-bl-none border-l-4 ${getColorClass('accent')}`
                  }`}
                >
                  <div className="text-xs mb-1 opacity-80">
                    {message.sender === 'bot' ? characters[currentCharacter].name.toUpperCase() : 'YOU'} • {formatTime(message.timestamp)}
                  </div>
                  <div className={message.sender === 'bot' ? 'italic' : ''}>
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-end gap-2">
                <div className={`w-8 h-8 flex-shrink-0 ${getColorClass('primary-dark')} rounded-full border-2 ${getColorClass('accent')} flex items-center justify-center mb-1`}>
                  <span className="text-xs font-bold">
                    {characters[currentCharacter].name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className={`${getColorClass('primary-light')} ${getColorClass('secondary')} rounded-lg rounded-bl-none px-3 py-2 max-w-xs border-l-4 ${getColorClass('accent')}`}>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Transforming response</span>
                    <div className="flex space-x-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${getColorClass('secondary')} animate-bounce`}></div>
                      <div className={`w-1.5 h-1.5 rounded-full ${getColorClass('secondary')} animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                      <div className={`w-1.5 h-1.5 rounded-full ${getColorClass('secondary')} animate-bounce`} style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - More compact on mobile */}
          <form onSubmit={handleSendMessage} className={`bg-gray-900 rounded-lg p-2 sm:p-3 border ${getColorClass('border')}`}>
            <div className="flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Message ${characters[currentCharacter].name}...`}
                className={`flex-1 border ${getColorClass('border')} bg-gray-800 text-white rounded-l-lg px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-${characters[currentCharacter].colors.primary}-500 placeholder-${characters[currentCharacter].colors.primary}-300`}
                disabled={isLoading}
              />
              <button 
                type="submit"
                className={`px-3 py-2 sm:px-4 sm:py-3 rounded-r-lg transition-colors ${
                  isLoading 
                    ? 'bg-gray-700 text-gray-500' 
                    : `${getColorClass('primary')} ${getColorClass('secondary')} hover:${getColorClass('primary-light')}`
                }`}
                disabled={isLoading || !inputValue.trim()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="mt-1 sm:mt-2 flex justify-between text-xs text-gray-400">
              <span className="hidden sm:inline">Encrypted channel: Secure</span>
              <span className="text-xs">v3.7.1 | {characters[currentCharacter].faction} Network</span>
            </div>
          </form>
        </div>
      </main>

      {/* Status Footer - More compact */}
      <footer className="bg-gray-900 py-1 px-4 sm:py-2 sm:px-6 border-t border-gray-800">
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="flex items-center" style={{ color: `var(--color-${characters[currentCharacter].colors.secondary}-400)` }}>
              <span className={`w-2 h-2 rounded-full ${getColorClass('accent')} mr-1`}></span>
              Online
            </span>
            <span className="hidden sm:inline">Cybertron Standard Time: {new Date().toLocaleTimeString()}</span>
          </div>
          <div className="flex space-x-2 sm:space-x-3">
            <button 
              className="text-gray-400 hover:text-white"
              onClick={() => window.open('https://transformers.hasbro.com', '_blank')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15l8-8m0 0l-8-8m8 8H4" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blitzwing;