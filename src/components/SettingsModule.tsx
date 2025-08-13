import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Agent, getAgentStatusColor } from '@/components/types';

interface SettingsModuleProps {
  agents: Agent[];
}

const SettingsModule: React.FC<SettingsModuleProps> = ({ agents }) => {
  return (
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
          <Card className="p-6 animate-fade-in">
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
};

export default SettingsModule;