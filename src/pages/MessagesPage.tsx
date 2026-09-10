import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  User, 
  MapPin, 
  ExternalLink, 
  MessageSquare, 
  ArrowLeft, 
  CheckCheck, 
  Clock,
  Sparkles,
  Phone
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/db';
import { Conversation, Message } from '../types';

export const MessagesPage: React.FC = () => {
  const { currentUser, selectedConvId, navigateTo, triggerRefresh } = useApp();
  const [activeConvId, setActiveConvId] = useState<string | null>(selectedConvId || null);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Please Sign In</h2>
        <p className="text-xs text-slate-500">Sign in to read and reply to messages from buyers and sellers.</p>
        <button
          onClick={() => navigateTo('login')}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl"
        >
          Sign In
        </button>
      </div>
    );
  }

  const conversations = dbService.getConversations(currentUser.id);

  // Default to first conversation if none selected
  useEffect(() => {
    if (!activeConvId && conversations.length > 0) {
      setActiveConvId(conversations[0].id);
    }
  }, [conversations, activeConvId]);

  const activeConv = conversations.find(c => c.id === activeConvId);
  const activeAd = activeConv ? dbService.getAdById(activeConv.adId) : undefined;
  const otherUserId = activeConv ? (activeConv.buyerId === currentUser.id ? activeConv.sellerId : activeConv.buyerId) : null;
  const otherUser = otherUserId ? dbService.getUserById(otherUserId) : null;
  const messages = activeConvId ? dbService.getMessages(activeConvId) : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, activeConvId]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || !activeConv || !otherUserId) return;

    dbService.sendMessage(
      activeConv.id,
      currentUser.id,
      otherUserId,
      activeConv.adId,
      text.trim()
    );
    setInputText('');
    triggerRefresh();

    // Simulate seller auto-reply after 1.5 seconds if sending to simulated users
    if (otherUserId === 'user-ayesha' || otherUserId === 'user-bilal' || otherUserId === 'user-hamza') {
      setTimeout(() => {
        const autoReplies = [
          "AoA! Yes it's 100% available and in genuine condition.",
          "W/Salam! Let me know if you want to inspect it today.",
          "We can meet in a public cafe or commercial markaz. Let me know your time!",
          "Price is slightly negotiable for a serious cash buyer. What's your offer?"
        ];
        const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
        dbService.sendMessage(
          activeConv.id,
          otherUserId,
          currentUser.id,
          activeConv.adId,
          randomReply
        );
        triggerRefresh();
      }, 1400);
    }
  };

  const quickOffers = [
    "AoA! Is this still available?",
    "Can you do slightly less on the price?",
    "Are all original accessories & box included?",
    "Where can we meet in person today?"
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-[750px] flex flex-col md:flex-row">
        
        {/* Left Pane: Conversations List */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col ${
          activeConvId ? 'hidden md:flex' : 'flex'
        }`}>
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-extrabold text-slate-900 text-lg font-display flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              Inbox ({conversations.length})
            </h2>
          </div>

          {/* Conversations scroll area */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {conversations.length > 0 ? (
              conversations.map(conv => {
                const isSelected = conv.id === activeConvId;
                const partnerId = conv.buyerId === currentUser.id ? conv.sellerId : conv.buyerId;
                const partner = dbService.getUserById(partnerId);

                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
                    className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 ${
                      isSelected ? 'bg-emerald-50/60 border-l-4 border-emerald-600' : ''
                    }`}
                  >
                    <img
                      src={partner?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                      alt=""
                      className="w-11 h-11 rounded-xl object-cover shrink-0 ring-1 ring-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {partner?.name || 'Classified Trader'}
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          {new Date(conv.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <p className="text-[11px] font-semibold text-emerald-700 truncate mt-0.5">
                        {conv.adTitle}
                      </p>

                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <p className="text-xs">No active conversations yet.</p>
                <p className="text-[11px]">When you message a seller or receive buyer questions, they will appear here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Active Chat Window */}
        {activeConv ? (
          <div className={`flex-1 flex flex-col bg-slate-50/50 ${
            !activeConvId ? 'hidden md:flex' : 'flex'
          }`}>
            {/* Chat Header with Ad snippet */}
            <div className="p-3.5 bg-white border-b border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setActiveConvId(null)}
                  className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <img
                  src={otherUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                  alt=""
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    {otherUser?.name}
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </h3>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600" /> {otherUser?.city || 'Pakistan'}
                  </span>
                </div>
              </div>

              {/* Ad mini pill */}
              <div 
                onClick={() => navigateTo('ad-details', { adId: activeConv.adId })}
                className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer transition-colors max-w-xs"
              >
                <img
                  src={activeConv.adImage || 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=200&q=80'}
                  alt=""
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-slate-800 truncate">{activeConv.adTitle}</p>
                  <p className="text-[10px] font-extrabold text-emerald-700">Rs. {activeConv.adPrice.toLocaleString('en-PK')}</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>
            </div>

            {/* Message Bubbles Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {/* Safety notice in chat */}
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-900 rounded-xl p-2.5 text-center text-[11px] max-w-md mx-auto">
                🔒 Sellora Safety Tip: Never transfer advance money via bank/Easypaisa. Meet in public to inspect the item.
              </div>

              {messages.map(m => {
                const isMe = m.senderId === currentUser.id;
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-xs sm:max-w-md px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                        isMe
                          ? 'bg-emerald-600 text-white rounded-br-xs'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                      }`}
                    >
                      {m.text}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1">
                      <span>{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {isMe && <CheckCheck className="w-3 h-3 text-emerald-600" />}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Negotiation Offers */}
            <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Quick Ask:</span>
              {quickOffers.map((offer, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(offer)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 text-xs font-medium shrink-0 transition-colors"
                >
                  {offer}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <div className="p-3.5 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                placeholder="Type your message or offer..."
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-hidden focus:bg-white focus:border-emerald-500"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl shadow-md transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 hidden md:flex flex-col items-center justify-center p-12 text-center text-slate-400 space-y-3">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-700">Select a conversation</h3>
            <p className="text-xs text-slate-400 max-w-xs">
              Choose an ad inquiry from the left to start negotiating directly with buyers and sellers.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
