import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface Ticket {
  id: number;
  title: string;
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  customer: string;
  agent?: string;
  created: string;
  updated: string;
  messages: Message[];
}

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
  isAgent: boolean;
}

const Index = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      title: 'Не работает кнопка оплаты',
      status: 'new',
      priority: 'high',
      customer: 'Анна Петрова',
      created: '2024-08-13 10:30',
      updated: '2024-08-13 10:30',
      messages: [
        { id: 1, sender: 'Анна Петрова', text: 'Здравствуйте! Не могу оплатить заказ, кнопка не реагирует.', timestamp: '10:30', isAgent: false }
      ]
    },
    {
      id: 2,
      title: 'Вопрос по доставке',
      status: 'in-progress',
      priority: 'medium',
      customer: 'Михаил Иванов',
      agent: 'Елена К.',
      created: '2024-08-13 09:15',
      updated: '2024-08-13 11:45',
      messages: [
        { id: 1, sender: 'Михаил Иванов', text: 'Когда придет мой заказ?', timestamp: '09:15', isAgent: false },
        { id: 2, sender: 'Елена К.', text: 'Здравствуйте! Ваш заказ будет доставлен завтра до 18:00.', timestamp: '11:45', isAgent: true }
      ]
    },
    {
      id: 3,
      title: 'Возврат товара',
      status: 'resolved',
      priority: 'low',
      customer: 'Дмитрий Сидоров',
      agent: 'Анна М.',
      created: '2024-08-12 16:20',
      updated: '2024-08-13 14:30',
      messages: [
        { id: 1, sender: 'Дмитрий Сидоров', text: 'Хочу вернуть товар, не подошел размер.', timestamp: '16:20', isAgent: false },
        { id: 2, sender: 'Анна М.', text: 'Конечно! Отправьте товар по адресу...', timestamp: '14:30', isAgent: true }
      ]
    }
  ]);

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: '',
    priority: 'medium' as const,
    customer: '',
    description: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500 text-white';
      case 'in-progress': return 'bg-amber-500 text-white';
      case 'resolved': return 'bg-green-500 text-white';
      case 'closed': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Новый';
      case 'in-progress': return 'В работе';
      case 'resolved': return 'Решен';
      case 'closed': return 'Закрыт';
      default: return status;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'Срочно';
      case 'high': return 'Высокий';
      case 'medium': return 'Средний';
      case 'low': return 'Низкий';
      default: return priority;
    }
  };

  const handleSendMessage = () => {
    if (!selectedTicket || !newMessage.trim()) return;

    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === selectedTicket.id) {
        const newMsg: Message = {
          id: Date.now(),
          sender: 'Вы',
          text: newMessage,
          timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
          isAgent: true
        };
        return {
          ...ticket,
          messages: [...ticket.messages, newMsg],
          updated: new Date().toLocaleString('ru')
        };
      }
      return ticket;
    });

    setTickets(updatedTickets);
    setSelectedTicket(updatedTickets.find(t => t.id === selectedTicket.id) || null);
    setNewMessage('');
  };

  const handleCreateTicket = () => {
    if (!newTicket.title.trim() || !newTicket.customer.trim()) return;

    const ticket: Ticket = {
      id: Date.now(),
      title: newTicket.title,
      status: 'new',
      priority: newTicket.priority,
      customer: newTicket.customer,
      created: new Date().toLocaleString('ru'),
      updated: new Date().toLocaleString('ru'),
      messages: newTicket.description ? [
        {
          id: 1,
          sender: newTicket.customer,
          text: newTicket.description,
          timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
          isAgent: false
        }
      ] : []
    };

    setTickets([ticket, ...tickets]);
    setNewTicket({ title: '', priority: 'medium', customer: '', description: '' });
    setIsCreatingTicket(false);
  };

  const stats = {
    total: tickets.length,
    new: tickets.filter(t => t.status === 'new').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Headphones" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">Поддержка</h1>
            </div>
          </div>
          <Dialog open={isCreatingTicket} onOpenChange={setIsCreatingTicket}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Plus" size={16} className="mr-2" />
                Новый тикет
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Создать новый тикет</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Заголовок</Label>
                  <Input
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                    placeholder="Опишите проблему кратко"
                  />
                </div>
                <div>
                  <Label>Клиент</Label>
                  <Input
                    value={newTicket.customer}
                    onChange={(e) => setNewTicket({...newTicket, customer: e.target.value})}
                    placeholder="Имя клиента"
                  />
                </div>
                <div>
                  <Label>Приоритет</Label>
                  <Select value={newTicket.priority} onValueChange={(value: any) => setNewTicket({...newTicket, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Низкий</SelectItem>
                      <SelectItem value="medium">Средний</SelectItem>
                      <SelectItem value="high">Высокий</SelectItem>
                      <SelectItem value="urgent">Срочно</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Описание</Label>
                  <Textarea
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                    placeholder="Подробное описание проблемы"
                    rows={3}
                  />
                </div>
                <Button onClick={handleCreateTicket} className="w-full">
                  Создать тикет
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar with tickets */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          {/* Stats */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Всего</p>
                    <p className="text-2xl font-bold text-primary">{stats.total}</p>
                  </div>
                  <Icon name="TicketCheck" size={24} className="text-primary" />
                </div>
              </Card>
              <Card className="p-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Новые</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
                  </div>
                  <Icon name="AlertCircle" size={24} className="text-blue-600" />
                </div>
              </Card>
              <Card className="p-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">В работе</p>
                    <p className="text-2xl font-bold text-amber-600">{stats.inProgress}</p>
                  </div>
                  <Icon name="Clock" size={24} className="text-amber-600" />
                </div>
              </Card>
              <Card className="p-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Решены</p>
                    <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
                  </div>
                  <Icon name="CheckCircle" size={24} className="text-green-600" />
                </div>
              </Card>
            </div>
          </div>

          {/* Tickets list */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-3">
              {tickets.map((ticket) => (
                <Card 
                  key={ticket.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md animate-scale-in ${selectedTicket?.id === ticket.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-sm text-gray-900 line-clamp-2">
                      {ticket.title}
                    </h3>
                    <Badge className={`${getPriorityColor(ticket.priority)} text-xs ml-2`}>
                      {getPriorityText(ticket.priority)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>{ticket.customer}</span>
                    <Badge className={getStatusColor(ticket.status)}>
                      {getStatusText(ticket.status)}
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <Icon name="Clock" size={12} className="mr-1" />
                    {ticket.updated}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {selectedTicket ? (
            <>
              {/* Chat header */}
              <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{selectedTicket.title}</h2>
                    <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                      <span>Клиент: {selectedTicket.customer}</span>
                      {selectedTicket.agent && <span>• Агент: {selectedTicket.agent}</span>}
                      <Badge className={getStatusColor(selectedTicket.status)}>
                        {getStatusText(selectedTicket.status)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Users" size={16} className="mr-2" />
                      Назначить
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Settings" size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto bg-gray-50 p-6 space-y-4">
                {selectedTicket.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isAgent ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div className={`max-w-2xl p-4 rounded-lg ${
                      message.isAgent 
                        ? 'bg-primary text-white ml-12' 
                        : 'bg-white border border-gray-200 mr-12'
                    }`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {message.sender.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {message.sender}
                        </span>
                        <span className={`text-xs ${message.isAgent ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.timestamp}
                        </span>
                      </div>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Введите сообщение..."
                      rows={3}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Icon name="Send" size={16} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Icon name="Paperclip" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <Icon name="MessageSquare" size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Выберите тикет
                </h3>
                <p className="text-gray-600">
                  Выберите тикет из списка слева для начала общения
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;