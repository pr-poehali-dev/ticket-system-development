import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Chat {
  id: number;
  customer: string;
  channel: 'website' | 'whatsapp' | 'telegram' | 'facebook' | 'instagram';
  status: 'active' | 'waiting' | 'closed';
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: Message[];
  customerInfo: CustomerInfo;
}

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
  isAgent: boolean;
  attachments?: string[];
}

interface CustomerInfo {
  name: string;
  email?: string;
  phone?: string;
  location?: string;
  tags: string[];
  totalChats: number;
  lastSeen: string;
  value: number;
}

interface Agent {
  id: number;
  name: string;
  status: 'online' | 'away' | 'offline';
  activeChats: number;
  avatar?: string;
  rating: number;
  totalChats: number;
}

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

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'website': return 'Globe';
      case 'whatsapp': return 'MessageCircle';
      case 'telegram': return 'Send';
      case 'facebook': return 'Facebook';
      case 'instagram': return 'Instagram';
      default: return 'MessageSquare';
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'website': return 'text-blue-600';
      case 'whatsapp': return 'text-green-600';
      case 'telegram': return 'text-blue-500';
      case 'facebook': return 'text-blue-700';
      case 'instagram': return 'text-pink-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'waiting': return 'bg-yellow-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

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

  const stats = {
    totalChats: chats.length,
    activeChats: chats.filter(c => c.status === 'active').length,
    waitingChats: chats.filter(c => c.status === 'waiting').length,
    closedChats: chats.filter(c => c.status === 'closed').length,
    onlineAgents: agents.filter(a => a.status === 'online').length
  };

  const renderChatsModule = () => (
    <div className="flex h-full">
      {/* Chat List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Чаты</h2>
            <Badge variant="outline">{stats.activeChats + stats.waitingChats} активных</Badge>
          </div>
          <Input placeholder="Поиск по чатам..." className="w-full" />
        </div>

        {/* Chat Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Icon name="Globe" size={14} className="mr-1" />
              Сайт
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Icon name="MessageCircle" size={14} className="mr-1" />
              WhatsApp
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Icon name="Send" size={14} className="mr-1" />
              Telegram
            </Button>
          </div>
        </div>

        {/* Chat Items */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {chats.map((chat) => (
              <Card 
                key={chat.id}
                className={`p-3 cursor-pointer transition-all hover:shadow-sm animate-fade-in ${selectedChat?.id === chat.id ? 'ring-2 ring-primary bg-primary/5' : ''}`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{chat.customer.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${getChannelColor(chat.channel)}`}>
                      <Icon name={getChannelIcon(chat.channel)} size={8} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium truncate">{chat.customer}</h4>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-500">{chat.timestamp}</span>
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(chat.status)}`} />
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 truncate mb-1">{chat.lastMessage}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {chat.customerInfo.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs px-1 py-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {chat.unreadCount > 0 && (
                        <Badge className="bg-red-500 text-white text-xs px-2 py-0">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>{selectedChat.customer.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedChat.customer}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Icon name={getChannelIcon(selectedChat.channel)} size={14} className={getChannelColor(selectedChat.channel)} />
                      <span>{selectedChat.customerInfo.location}</span>
                      <span>•</span>
                      <span>{selectedChat.customerInfo.totalChats} чатов</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Icon name="Phone" size={16} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Video" size={16} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="MoreVertical" size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 bg-gray-50 p-6">
              <div className="space-y-4">
                {selectedChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isAgent ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                      message.isAgent 
                        ? 'bg-primary text-white' 
                        : 'bg-white border border-gray-200'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <div className={`text-xs mt-2 ${message.isAgent ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Введите сообщение..."
                    rows={1}
                    className="resize-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Icon name="Paperclip" size={16} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="Smile" size={16} />
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Icon name="Send" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <Icon name="MessageSquare" size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Выберите чат</h3>
              <p className="text-gray-600">Выберите чат из списка для начала общения</p>
            </div>
          </div>
        )}
      </div>

      {/* Customer Info Sidebar */}
      {selectedChat && (
        <div className="w-80 bg-white border-l border-gray-200 p-6">
          <div className="text-center mb-6">
            <Avatar className="w-20 h-20 mx-auto mb-3">
              <AvatarFallback className="text-2xl">{selectedChat.customer.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold">{selectedChat.customer}</h3>
            <div className="flex items-center justify-center space-x-1 text-sm text-gray-500 mt-1">
              <Icon name={getChannelIcon(selectedChat.channel)} size={14} className={getChannelColor(selectedChat.channel)} />
              <span>{selectedChat.channel === 'website' ? 'Сайт' : selectedChat.channel}</span>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Ценность клиента</span>
                <span className="text-lg font-bold text-green-600">₽{selectedChat.customerInfo.value.toLocaleString()}</span>
              </div>
              <Progress value={Math.min(selectedChat.customerInfo.value / 1000, 100)} className="h-2" />
            </Card>

            <div className="space-y-3">
              <div>
                <Label className="text-xs text-gray-500">Email</Label>
                <p className="text-sm">{selectedChat.customerInfo.email || 'Не указан'}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Телефон</Label>
                <p className="text-sm">{selectedChat.customerInfo.phone || 'Не указан'}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Местоположение</Label>
                <p className="text-sm">{selectedChat.customerInfo.location}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Всего чатов</Label>
                <p className="text-sm">{selectedChat.customerInfo.totalChats}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Последний визит</Label>
                <p className="text-sm">{selectedChat.customerInfo.lastSeen}</p>
              </div>
            </div>

            <div>
              <Label className="text-xs text-gray-500 mb-2 block">Теги</Label>
              <div className="flex flex-wrap gap-2">
                {selectedChat.customerInfo.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                  <Icon name="Plus" size={12} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderCRMModule = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">CRM - База клиентов</h2>
        <Button className="bg-primary hover:bg-primary/90">
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить клиента
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Всего клиентов</p>
              <p className="text-2xl font-bold text-primary">1,247</p>
            </div>
            <Icon name="Users" size={24} className="text-primary" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Новые за месяц</p>
              <p className="text-2xl font-bold text-green-600">89</p>
            </div>
            <Icon name="UserPlus" size={24} className="text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">VIP клиенты</p>
              <p className="text-2xl font-bold text-purple-600">124</p>
            </div>
            <Icon name="Crown" size={24} className="text-purple-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Средний чек</p>
              <p className="text-2xl font-bold text-blue-600">₽12,450</p>
            </div>
            <Icon name="TrendingUp" size={24} className="text-blue-600" />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Клиенты</h3>
          <div className="flex space-x-2">
            <Input placeholder="Поиск клиентов..." className="w-64" />
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Фильтр" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все клиенты</SelectItem>
                <SelectItem value="vip">VIP клиенты</SelectItem>
                <SelectItem value="new">Новые</SelectItem>
                <SelectItem value="active">Активные</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          {chats.map((chat) => (
            <Card key={chat.id} className="p-4 hover:shadow-md transition-shadow animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>{chat.customer.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{chat.customer}</h4>
                    <p className="text-sm text-gray-600">{chat.customerInfo.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {chat.customerInfo.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">₽{chat.customerInfo.value.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{chat.customerInfo.totalChats} чатов</p>
                  <p className="text-xs text-gray-400">{chat.customerInfo.lastSeen}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderAnalyticsModule = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Аналитика и отчеты</h2>
        <div className="flex space-x-2">
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Сегодня</SelectItem>
              <SelectItem value="week">Неделя</SelectItem>
              <SelectItem value="month">Месяц</SelectItem>
              <SelectItem value="quarter">Квартал</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Icon name="Download" size={16} className="mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Общая статистика</h3>
            <Icon name="BarChart3" size={20} className="text-primary" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Всего чатов</span>
              <span className="font-semibold">2,847</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Среднее время ответа</span>
              <span className="font-semibold">2 мин 34 сек</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Решено за первый ответ</span>
              <span className="font-semibold text-green-600">78%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Рейтинг сервиса</span>
              <span className="font-semibold text-yellow-600">4.8 ⭐</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Каналы общения</h3>
            <Icon name="PieChart" size={20} className="text-primary" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Globe" size={16} className="text-blue-600" />
                <span>Сайт</span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={45} className="w-16 h-2" />
                <span className="text-sm font-semibold">45%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="MessageCircle" size={16} className="text-green-600" />
                <span>WhatsApp</span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={30} className="w-16 h-2" />
                <span className="text-sm font-semibold">30%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Send" size={16} className="text-blue-500" />
                <span>Telegram</span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={25} className="w-16 h-2" />
                <span className="text-sm font-semibold">25%</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Команда</h3>
            <Icon name="Users" size={20} className="text-primary" />
          </div>
          <div className="space-y-3">
            {agents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">{agent.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getAgentStatusColor(agent.status)}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{agent.name}</p>
                    <p className="text-xs text-gray-500">{agent.activeChats} активных</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{agent.rating} ⭐</p>
                  <p className="text-xs text-gray-500">{agent.totalChats}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">График активности</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <Icon name="TrendingUp" size={48} className="mx-auto mb-2" />
            <p>График активности по часам</p>
            <p className="text-sm">Здесь будет отображаться детальная аналитика</p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderSettingsModule = () => (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Настройки</h2>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Общие</TabsTrigger>
          <TabsTrigger value="autoresponders">Автоответы</TabsTrigger>
          <TabsTrigger value="channels">Каналы</TabsTrigger>
          <TabsTrigger value="team">Команда</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Общие настройки</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Уведомления о новых чатах</Label>
                  <p className="text-sm text-gray-500">Получать звуковые уведомления</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Автоматическое назначение</Label>
                  <p className="text-sm text-gray-500">Распределять чаты между агентами</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Рабочие часы</Label>
                  <p className="text-sm text-gray-500">Показывать статус "вне рабочего времени"</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="autoresponders">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Автоответы</h3>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить автоответ
              </Button>
            </div>
            <div className="space-y-4">
              <Card className="p-4 border-l-4 border-l-green-500 animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Приветствие</h4>
                  <Switch defaultChecked />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  "Здравствуйте! Спасибо за обращение. Мы ответим вам в течение 5 минут."
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Триггер: Новый чат</span>
                  <span>Задержка: 0 сек</span>
                </div>
              </Card>
              
              <Card className="p-4 border-l-4 border-l-blue-500 animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Вне рабочих часов</h4>
                  <Switch />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  "Сейчас вне рабочих часов. Мы ответим вам завтра с 9:00 до 18:00."
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Триггер: Вне работы</span>
                  <span>Задержка: 30 сек</span>
                </div>
              </Card>

              <Card className="p-4 border-l-4 border-l-yellow-500 animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Долгое ожидание</h4>
                  <Switch defaultChecked />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  "Извините за задержку! Наш специалист скоро ответит вам."
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Триггер: Без ответа 5 мин</span>
                  <span>Задержка: 300 сек</span>
                </div>
              </Card>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="channels">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Каналы связи</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg animate-fade-in">
                <div className="flex items-center space-x-3">
                  <Icon name="Globe" size={20} className="text-blue-600" />
                  <div>
                    <h4 className="font-medium">Виджет сайта</h4>
                    <p className="text-sm text-gray-500">Чат на вашем сайте</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked />
                  <Button variant="outline" size="sm">Настроить</Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg animate-fade-in">
                <div className="flex items-center space-x-3">
                  <Icon name="MessageCircle" size={20} className="text-green-600" />
                  <div>
                    <h4 className="font-medium">WhatsApp</h4>
                    <p className="text-sm text-gray-500">+7 (999) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked />
                  <Button variant="outline" size="sm">Настроить</Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg animate-fade-in">
                <div className="flex items-center space-x-3">
                  <Icon name="Send" size={20} className="text-blue-500" />
                  <div>
                    <h4 className="font-medium">Telegram</h4>
                    <p className="text-sm text-gray-500">@support_bot</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Button variant="outline" size="sm">Подключить</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Управление командой</h3>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="UserPlus" size={16} className="mr-2" />
                Пригласить агента
              </Button>
            </div>
            <div className="space-y-4">
              {agents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg animate-fade-in">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getAgentStatusColor(agent.status)}`} />
                    </div>
                    <div>
                      <h4 className="font-medium">{agent.name}</h4>
                      <p className="text-sm text-gray-500">
                        {agent.status === 'online' ? 'Онлайн' : agent.status === 'away' ? 'Отошел' : 'Оффлайн'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{agent.rating} ⭐</p>
                      <p className="text-xs text-gray-500">{agent.totalChats} чатов</p>
                    </div>
                    <Button variant="outline" size="sm">Настройки</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

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
        {activeModule === 'chats' && renderChatsModule()}
        {activeModule === 'crm' && renderCRMModule()}
        {activeModule === 'analytics' && renderAnalyticsModule()}
        {activeModule === 'settings' && renderSettingsModule()}
      </div>
    </div>
  );
};

export default Index;