export interface Chat {
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

export interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
  isAgent: boolean;
  attachments?: string[];
}

export interface CustomerInfo {
  name: string;
  email?: string;
  phone?: string;
  location?: string;
  tags: string[];
  totalChats: number;
  lastSeen: string;
  value: number;
}

export interface Agent {
  id: number;
  name: string;
  status: 'online' | 'away' | 'offline';
  activeChats: number;
  avatar?: string;
  rating: number;
  totalChats: number;
}

export interface Stats {
  totalChats: number;
  activeChats: number;
  waitingChats: number;
  closedChats: number;
  onlineAgents: number;
}

export const getChannelIcon = (channel: string) => {
  switch (channel) {
    case 'website': return 'Globe';
    case 'whatsapp': return 'MessageCircle';
    case 'telegram': return 'Send';
    case 'facebook': return 'Facebook';
    case 'instagram': return 'Instagram';
    default: return 'MessageSquare';
  }
};

export const getChannelColor = (channel: string) => {
  switch (channel) {
    case 'website': return 'text-blue-600';
    case 'whatsapp': return 'text-green-600';
    case 'telegram': return 'text-blue-500';
    case 'facebook': return 'text-blue-700';
    case 'instagram': return 'text-pink-600';
    default: return 'text-gray-600';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'waiting': return 'bg-yellow-500';
    case 'closed': return 'bg-gray-500';
    default: return 'bg-gray-500';
  }
};

export const getAgentStatusColor = (status: string) => {
  switch (status) {
    case 'online': return 'bg-green-500';
    case 'away': return 'bg-yellow-500';
    case 'offline': return 'bg-gray-500';
    default: return 'bg-gray-500';
  }
};