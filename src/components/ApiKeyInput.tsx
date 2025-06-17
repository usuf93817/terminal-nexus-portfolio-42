
import React from 'react';
import { Key } from 'lucide-react';

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  showApiInput: boolean;
  setShowApiInput: (show: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({
  apiKey,
  setApiKey,
  showApiInput,
  setShowApiInput,
  onSubmit
}) => {
  return (
    <>
      {!apiKey && (
        <button
          onClick={() => setShowApiInput(!showApiInput)}
          className="text-terminal-text/60 hover:text-terminal-green transition-colors text-xs"
        >
          <Key className="w-3 h-3" />
        </button>
      )}
      
      {showApiInput && (
        <div className="p-3 border-b border-terminal-border/30 bg-terminal-bg/30">
          <form onSubmit={onSubmit} className="space-y-2">
            <label className="text-xs text-terminal-text/60 font-mono">OpenWeatherMap API Key:</label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API key for live data"
              className="w-full text-xs bg-terminal-bg border border-terminal-border/50 rounded px-2 py-1 text-terminal-text font-mono focus:border-terminal-green outline-none"
            />
            <button
              type="submit"
              className="w-full text-xs bg-terminal-green/20 text-terminal-green border border-terminal-green/30 rounded px-2 py-1 hover:bg-terminal-green/30 transition-colors"
            >
              Apply
            </button>
          </form>
          <p className="text-xs text-terminal-text/40 mt-1 font-mono">
            Get free API key at openweathermap.org
          </p>
        </div>
      )}
    </>
  );
};

export default ApiKeyInput;
