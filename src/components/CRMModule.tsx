import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Chat } from '@/components/types';

interface CRMModuleProps {
  chats: Chat[];
}

const CRMModule: React.FC<CRMModuleProps> = ({ chats }) => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">CRM - База клиентов</h2>
        <Button className="bg-primary hover:bg-primary/90">
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить клиента
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Всего клиентов</p>
              <p className="text-2xl font-bold text-primary">1,247</p>
            </div>
            <Icon name="Users" size={24} className="text-primary" />
          </div>
        </Card>
        <Card className="p-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Новые за месяц</p>
              <p className="text-2xl font-bold text-green-600">89</p>
            </div>
            <Icon name="UserPlus" size={24} className="text-green-600" />
          </div>
        </Card>
        <Card className="p-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">VIP клиенты</p>
              <p className="text-2xl font-bold text-purple-600">124</p>
            </div>
            <Icon name="Crown" size={24} className="text-purple-600" />
          </div>
        </Card>
        <Card className="p-4 animate-fade-in">
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
};

export default CRMModule;