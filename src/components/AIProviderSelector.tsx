
import React, { useState } from 'react';
import { aiChatService } from '../services/aiChatService';
import { AIProvider } from '../types/chat';
import { Key, Globe, Zap } from 'lucide-react';

const providers: AIProvider[] = [
  {
    name: 'OpenAI GPT-4',
    model: 'gpt-4',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    requiresAuth: true
  },
  {
    name: 'OpenAI GPT-3.5',
    model: 'gpt-3.5-turbo',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    requiresAuth: true
  },
  {
    name: 'Demo Mode',
    model: 'demo',
    endpoint: '',
    requiresAuth: false
  }
];

export const AIProviderSelector: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState(providers[2]); // Default to demo
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);

  const handleProviderChange = (provider: AIProvider) => {
    setSelectedProvider(provider);
    aiChatService.setProvider(provider);
  };

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
    aiChatService.setApiKey(key);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-terminal-text font-mono text-sm mb-2">
          AI Provider
        </label>
        <div className="grid grid-cols-1 gap-2">
          {providers.map((provider) => (
            <button
              key={provider.name}
              onClick={() => handleProviderChange(provider)}
              className={`p-3 rounded-lg border font-mono text-sm text-left transition-all ${
                selectedProvider.name === provider.name
                  ? 'border-terminal-green bg-terminal-green/10 text-terminal-green'
                  : 'border-terminal-border text-terminal-text/70 hover:border-terminal-green/50'
              }`}
            >
              <div className="flex items-center space-x-2">
                {provider.name === 'Demo Mode' ? (
                  <Zap className="w-4 h-4" />
                ) : (
                  <Globe className="w-4 h-4" />
                )}
                <span>{provider.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedProvider.requiresAuth && (
        <div>
          <label className="block text-terminal-text font-mono text-sm mb-2">
            API Key
          </label>
          <div className="relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              placeholder="Enter your API key..."
              className="w-full bg-terminal-bg/50 border border-terminal-border rounded-lg px-3 py-2 text-terminal-text font-mono text-sm focus:outline-none focus:border-terminal-green"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-terminal-text/60 hover:text-terminal-green"
            >
              <Key className="w-4 h-4" />
            </button>
          </div>
          <p className="text-terminal-text/50 text-xs mt-1 font-mono">
            Your API key is stored locally and never sent to our servers
          </p>
        </div>
      )}
    </div>
  );
};
