import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Chat, Message, Stats, getChannelIcon, getChannelColor, getStatusColor } from '@/components/types';

interface ChatsModuleProps {
  chats: Chat[];
  selectedChat: Chat | null;
  newMessage: string;
  stats: Stats;
  onSelectChat: (chat: Chat) => void;
  onSendMessage: () => void;
  onMessageChange: (message: string) => void;
}

const ChatsModule: React.FC<ChatsModuleProps> = ({
  chats,
  selectedChat,
  newMessage,
  stats,
  onSelectChat,
  onSendMessage,
  onMessageChange,
}) => {
  return (
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
                onClick={() => onSelectChat(chat)}
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
                    onChange={(e) => onMessageChange(e.target.value)}
                    placeholder="Введите сообщение..."
                    rows={1}
                    className="resize-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        onSendMessage();
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
                    onClick={onSendMessage}
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
};

export default ChatsModule;