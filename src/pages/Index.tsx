import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import ChatsModule from '@/components/ChatsModule';
import CRMModule from '@/components/CRMModule';
import AnalyticsModule from '@/components/AnalyticsModule';
import SettingsModule from '@/components/SettingsModule';
import { Chat, Message, Agent, Stats, getAgentStatusColor } from '@/components/types';



const Index = () => {
  const [activeModule, setActiveModule] = useState<'chats' | 'crm' | 'analytics' | 'settings'>('chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      customer: 'Анна Петрова',
      channel: 'website',
      status: 'active',
      lastMessage: 'Здравствуйте! Есть вопрос по доставке',
      timestamp: '14:30',
      unreadCount: 2,
      customerInfo: {
        name: 'Анна Петрова',
        email: 'anna@example.com',
        phone: '+7 (999) 123-45-67',
        location: 'Москва, Россия',
        tags: ['VIP', 'Постоянный клиент'],
        totalChats: 15,
        lastSeen: '2024-08-13 14:30',
        value: 45000
      },
      messages: [
        { id: 1, sender: 'Анна Петрова', text: 'Здравствуйте!', timestamp: '14:28', isAgent: false },
        { id: 2, sender: 'Анна Петрова', text: 'Есть вопрос по доставке', timestamp: '14:30', isAgent: false }
      ]
    },
    {
      id: 2,
      customer: 'Михаил Иванов',
      channel: 'whatsapp',
      status: 'waiting',
      lastMessage: 'Когда будет готов заказ?',
      timestamp: '13:45',
      unreadCount: 1,
      customerInfo: {
        name: 'Михаил Иванов',
        phone: '+7 (985) 765-43-21',
        location: 'СПб, Россия',
        tags: ['Новый клиент'],
        totalChats: 2,
        lastSeen: '2024-08-13 13:45',
        value: 3500
      },
      messages: [
        { id: 1, sender: 'Михаил Иванов', text: 'Когда будет готов заказ?', timestamp: '13:45', isAgent: false }
      ]
    },
    {
      id: 3,
      customer: 'Елена Сидорова',
      channel: 'telegram',
      status: 'closed',
      lastMessage: 'Спасибо за помощь! 👍',
      timestamp: '12:15',
      unreadCount: 0,
      customerInfo: {
        name: 'Елена Сидорова',
        email: 'elena@example.com',
        location: 'Казань, Россия',
        tags: ['Довольный клиент'],
        totalChats: 8,
        lastSeen: '2024-08-13 12:20',
        value: 12000
      },
      messages: [
        { id: 1, sender: 'Вы', text: 'Рад был помочь!', timestamp: '12:14', isAgent: true },
        { id: 2, sender: 'Елена Сидорова', text: 'Спасибо за помощь! 👍', timestamp: '12:15', isAgent: false }
      ]
    }
  ]);

  const [agents] = useState<Agent[]>([
    { id: 1, name: 'Анна Козлова', status: 'online', activeChats: 3, avatar: '', rating: 4.9, totalChats: 156 },
    { id: 2, name: 'Дмитрий Волков', status: 'online', activeChats: 2, avatar: '', rating: 4.7, totalChats: 98 },
    { id: 3, name: 'Мария Петрова', status: 'away', activeChats: 1, avatar: '', rating: 4.8, totalChats: 203 },
    { id: 4, name: 'Игорь Смирнов', status: 'offline', activeChats: 0, avatar: '', rating: 4.6, totalChats: 67 }
  ]);



  const handleSendMessage = () => {
    if (!selectedChat || !newMessage.trim()) return;

    const updatedChats = chats.map(chat => {
      if (chat.id === selectedChat.id) {
        const newMsg: Message = {
          id: Date.now(),
          sender: 'Вы',
          text: newMessage,
          timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
          isAgent: true
        };
        return {
          ...chat,
          messages: [...chat.messages, newMsg],
          lastMessage: newMessage,
          timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setSelectedChat(updatedChats.find(c => c.id === selectedChat.id) || null);
    setNewMessage('');
  };

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleMessageChange = (message: string) => {
    setNewMessage(message);
  };

  const stats: Stats = {
    totalChats: chats.length,
    activeChats: chats.filter(c => c.status === 'active').length,
    waitingChats: chats.filter(c => c.status === 'waiting').length,
    closedChats: chats.filter(c => c.status === 'closed').length,
    onlineAgents: agents.filter(a => a.status === 'online').length
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="MessageSquare" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Jivo Platform</h1>
              <p className="text-sm text-gray-500">Система поддержки</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-green-50 p-2 rounded animate-fade-in">
              <div className="text-green-700 font-semibold">{stats.activeChats}</div>
              <div className="text-green-600">Активных</div>
            </div>
            <div className="bg-yellow-50 p-2 rounded animate-fade-in">
              <div className="text-yellow-700 font-semibold">{stats.waitingChats}</div>
              <div className="text-yellow-600">Ожидают</div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <Button
              variant={activeModule === 'chats' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveModule('chats')}
            >
              <Icon name="MessageSquare" size={16} className="mr-3" />
              Чаты
              {(stats.activeChats + stats.waitingChats) > 0 && (
                <Badge className="ml-auto bg-red-500 text-white">
                  {stats.activeChats + stats.waitingChats}
                </Badge>
              )}
            </Button>
            
            <Button
              variant={activeModule === 'crm' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveModule('crm')}
            >
              <Icon name="Users" size={16} className="mr-3" />
              CRM
            </Button>
            
            <Button
              variant={activeModule === 'analytics' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveModule('analytics')}
            >
              <Icon name="BarChart3" size={16} className="mr-3" />
              Аналитика
            </Button>
            
            <Button
              variant={activeModule === 'settings' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveModule('settings')}
            >
              <Icon name="Settings" size={16} className="mr-3" />
              Настройки
            </Button>
          </div>
        </nav>

        {/* Team Status */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Команда</span>
            <Badge variant="outline">{stats.onlineAgents} онлайн</Badge>
          </div>
          <div className="space-y-1">
            {agents.slice(0, 3).map((agent) => (
              <div key={agent.id} className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getAgentStatusColor(agent.status)}`} />
                <span className="text-xs text-gray-600 truncate">{agent.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {activeModule === 'chats' && (
          <ChatsModule
            chats={chats}
            selectedChat={selectedChat}
            newMessage={newMessage}
            stats={stats}
            onSelectChat={handleSelectChat}
            onSendMessage={handleSendMessage}
            onMessageChange={handleMessageChange}
          />
        )}
        {activeModule === 'crm' && <CRMModule chats={chats} />}
        {activeModule === 'analytics' && <AnalyticsModule agents={agents} />}
        {activeModule === 'settings' && <SettingsModule agents={agents} />}
      </div>
    </div>
  );
};

export default Index;