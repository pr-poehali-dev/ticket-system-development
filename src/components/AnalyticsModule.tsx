import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Agent, getAgentStatusColor } from '@/components/types';

interface AnalyticsModuleProps {
  agents: Agent[];
}

const AnalyticsModule: React.FC<AnalyticsModuleProps> = ({ agents }) => {
  return (
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
        <Card className="p-6 animate-fade-in">
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

        <Card className="p-6 animate-fade-in">
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

        <Card className="p-6 animate-fade-in">
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

      <Card className="p-6 animate-fade-in">
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
};

export default AnalyticsModule;