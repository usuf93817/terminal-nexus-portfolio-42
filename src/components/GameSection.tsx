
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Trophy, Zap, Target, Gamepad2 } from 'lucide-react';

const GameSection = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [snakeGame, setSnakeGame] = useState({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: { x: 0, y: 1 },
    score: 0,
    isPlaying: false,
    gameOver: false
  });
  const [memoryGame, setMemoryGame] = useState({
    cards: [] as number[],
    flipped: [] as number[],
    matched: [] as number[],
    score: 0,
    moves: 0
  });
  const [reactionGame, setReactionGame] = useState({
    isWaiting: false,
    canClick: false,
    startTime: 0,
    bestTime: localStorage.getItem('bestReactionTime') ? parseFloat(localStorage.getItem('bestReactionTime')!) : 0,
    lastTime: 0
  });

  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Snake Game Logic
  useEffect(() => {
    if (!snakeGame.isPlaying) return;

    const gameLoop = setInterval(() => {
      setSnakeGame(prev => {
        if (prev.gameOver) return prev;

        const newSnake = [...prev.snake];
        const head = { ...newSnake[0] };
        head.x += prev.direction.x;
        head.y += prev.direction.y;

        // Wall collision
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
          return { ...prev, gameOver: true, isPlaying: false };
        }

        // Self collision
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          return { ...prev, gameOver: true, isPlaying: false };
        }

        newSnake.unshift(head);

        // Food collision
        if (head.x === prev.food.x && head.y === prev.food.y) {
          return {
            ...prev,
            snake: newSnake,
            food: {
              x: Math.floor(Math.random() * 20),
              y: Math.floor(Math.random() * 20)
            },
            score: prev.score + 10
          };
        } else {
          newSnake.pop();
          return { ...prev, snake: newSnake };
        }
      });
    }, 150);

    return () => clearInterval(gameLoop);
  }, [snakeGame.isPlaying]);

  // Snake Game Controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (activeGame !== 'snake' || !snakeGame.isPlaying) return;

      setSnakeGame(prev => {
        switch (e.key) {
          case 'ArrowUp':
            return prev.direction.y !== 1 ? { ...prev, direction: { x: 0, y: -1 } } : prev;
          case 'ArrowDown':
            return prev.direction.y !== -1 ? { ...prev, direction: { x: 0, y: 1 } } : prev;
          case 'ArrowLeft':
            return prev.direction.x !== 1 ? { ...prev, direction: { x: -1, y: 0 } } : prev;
          case 'ArrowRight':
            return prev.direction.x !== -1 ? { ...prev, direction: { x: 1, y: 0 } } : prev;
          default:
            return prev;
        }
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeGame, snakeGame.isPlaying]);

  // Initialize Memory Game
  const initMemoryGame = () => {
    const numbers = Array.from({ length: 8 }, (_, i) => i + 1);
    const cards = [...numbers, ...numbers].sort(() => Math.random() - 0.5);
    setMemoryGame({
      cards,
      flipped: [],
      matched: [],
      score: 0,
      moves: 0
    });
  };

  const flipCard = (index: number) => {
    if (memoryGame.flipped.length === 2 || memoryGame.flipped.includes(index) || memoryGame.matched.includes(index)) {
      return;
    }

    const newFlipped = [...memoryGame.flipped, index];
    setMemoryGame(prev => ({ ...prev, flipped: newFlipped, moves: prev.moves + 1 }));

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (memoryGame.cards[first] === memoryGame.cards[second]) {
        setTimeout(() => {
          setMemoryGame(prev => ({
            ...prev,
            matched: [...prev.matched, first, second],
            flipped: [],
            score: prev.score + 100
          }));
        }, 1000);
      } else {
        setTimeout(() => {
          setMemoryGame(prev => ({ ...prev, flipped: [] }));
        }, 1000);
      }
    }
  };

  // Reaction Game Logic
  const startReactionTest = () => {
    setReactionGame(prev => ({ ...prev, isWaiting: true, canClick: false }));
    
    const delay = 2000 + Math.random() * 3000; // 2-5 seconds
    setTimeout(() => {
      setReactionGame(prev => ({ 
        ...prev, 
        isWaiting: false, 
        canClick: true, 
        startTime: Date.now() 
      }));
    }, delay);
  };

  const handleReactionClick = () => {
    if (reactionGame.isWaiting) {
      setReactionGame(prev => ({ ...prev, isWaiting: false, canClick: false }));
      return;
    }

    if (reactionGame.canClick) {
      const reactionTime = Date.now() - reactionGame.startTime;
      const newBest = reactionGame.bestTime === 0 || reactionTime < reactionGame.bestTime;
      
      if (newBest) {
        localStorage.setItem('bestReactionTime', reactionTime.toString());
      }

      setReactionGame(prev => ({
        ...prev,
        canClick: false,
        lastTime: reactionTime,
        bestTime: newBest ? reactionTime : prev.bestTime
      }));
    }
  };

  const resetSnakeGame = () => {
    setSnakeGame({
      snake: [{ x: 10, y: 10 }],
      food: { x: 15, y: 15 },
      direction: { x: 0, y: 1 },
      score: 0,
      isPlaying: false,
      gameOver: false
    });
  };

  const games = [
    {
      id: 'snake',
      name: 'Neural Snake',
      description: 'Classic snake with a cyberpunk twist',
      icon: <Target className="w-6 h-6" />,
      color: 'from-terminal-green to-terminal-blue'
    },
    {
      id: 'memory',
      name: 'Memory Matrix',
      description: 'Test your cognitive processing power',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-terminal-blue to-terminal-purple'
    },
    {
      id: 'reaction',
      name: 'Reflex Optimizer',
      description: 'Measure your neural response time',
      icon: <Trophy className="w-6 h-6" />,
      color: 'from-terminal-purple to-terminal-orange'
    }
  ];

  return (
    <section className="min-h-screen py-20 px-6 relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-terminal-bg via-[#1a1a2e] to-terminal-bg"></div>
      <div className="absolute inset-0">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-terminal-green rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-terminal-green via-terminal-blue to-terminal-purple bg-clip-text text-transparent">
            Neural Gaming Arena
          </h2>
          <p className="text-terminal-text/80 text-xl max-w-3xl mx-auto">
            <span className="syntax-comment">// Challenge your cognitive abilities with these futuristic mini-games</span>
          </p>
        </div>

        {/* Game Selection */}
        {!activeGame && (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => {
                  setActiveGame(game.id);
                  if (game.id === 'memory') initMemoryGame();
                }}
                className="group relative bg-gradient-to-br from-terminal-bg/50 to-terminal-border/50 rounded-2xl p-8 border border-terminal-border hover:border-terminal-green transition-all duration-500 hover:scale-105 backdrop-blur-md"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${game.color} flex items-center justify-center text-terminal-bg shadow-lg`}>
                    {game.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-terminal-green mb-3 font-mono">
                    {game.name}
                  </h3>
                  
                  <p className="text-terminal-text/70 text-sm leading-relaxed">
                    {game.description}
                  </p>
                  
                  <div className="mt-6 flex items-center justify-center space-x-2 text-terminal-blue">
                    <Gamepad2 className="w-4 h-4" />
                    <span className="text-sm font-mono">Initialize Game</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Snake Game */}
        {activeGame === 'snake' && (
          <div className="bg-terminal-bg/90 rounded-2xl border border-terminal-border p-8 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-terminal-green font-mono">Neural Snake</h3>
              <div className="flex items-center space-x-4">
                <div className="text-terminal-yellow font-mono">Score: {snakeGame.score}</div>
                <button
                  onClick={() => setActiveGame(null)}
                  className="px-4 py-2 bg-terminal-border rounded-lg hover:bg-terminal-border/80 transition-colors"
                >
                  Exit
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="bg-[#0a0a0a] border-2 border-terminal-green rounded-lg p-2 inline-block">
                  <div className="grid grid-cols-20 gap-px" style={{ width: '400px', height: '400px' }}>
                    {Array.from({ length: 400 }, (_, i) => {
                      const x = i % 20;
                      const y = Math.floor(i / 20);
                      const isSnake = snakeGame.snake.some(segment => segment.x === x && segment.y === y);
                      const isFood = snakeGame.food.x === x && snakeGame.food.y === y;
                      const isHead = snakeGame.snake[0]?.x === x && snakeGame.snake[0]?.y === y;

                      return (
                        <div
                          key={i}
                          className={`w-full h-full ${
                            isFood 
                              ? 'bg-terminal-orange animate-pulse' 
                              : isHead 
                                ? 'bg-terminal-yellow' 
                                : isSnake 
                                  ? 'bg-terminal-green' 
                                  : 'bg-terminal-bg/20'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="lg:w-64 space-y-4">
                <div className="bg-terminal-border/20 rounded-lg p-6">
                  <h4 className="text-terminal-green font-mono mb-4">Controls</h4>
                  <div className="space-y-2 text-sm text-terminal-text/80">
                    <div>↑ ↓ ← → Arrow Keys</div>
                    <div>Avoid walls and yourself</div>
                    <div>Eat orange food to grow</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {!snakeGame.isPlaying && !snakeGame.gameOver && (
                    <button
                      onClick={() => setSnakeGame(prev => ({ ...prev, isPlaying: true }))}
                      className="w-full flex items-center justify-center space-x-2 bg-terminal-green text-terminal-bg py-3 rounded-lg hover:bg-terminal-green/90 transition-colors font-mono"
                    >
                      <Play className="w-4 h-4" />
                      <span>Start Game</span>
                    </button>
                  )}

                  {snakeGame.isPlaying && (
                    <button
                      onClick={() => setSnakeGame(prev => ({ ...prev, isPlaying: false }))}
                      className="w-full flex items-center justify-center space-x-2 bg-terminal-orange text-terminal-bg py-3 rounded-lg hover:bg-terminal-orange/90 transition-colors font-mono"
                    >
                      <Pause className="w-4 h-4" />
                      <span>Pause</span>
                    </button>
                  )}

                  <button
                    onClick={resetSnakeGame}
                    className="w-full flex items-center justify-center space-x-2 bg-terminal-border text-terminal-text py-3 rounded-lg hover:bg-terminal-border/80 transition-colors font-mono"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                </div>

                {snakeGame.gameOver && (
                  <div className="bg-terminal-red/20 border border-terminal-red rounded-lg p-4 text-center">
                    <div className="text-terminal-red font-mono mb-2">Game Over!</div>
                    <div className="text-terminal-text/80 text-sm">Final Score: {snakeGame.score}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Memory Game */}
        {activeGame === 'memory' && (
          <div className="bg-terminal-bg/90 rounded-2xl border border-terminal-border p-8 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-terminal-blue font-mono">Memory Matrix</h3>
              <div className="flex items-center space-x-4">
                <div className="text-terminal-yellow font-mono">Score: {memoryGame.score}</div>
                <div className="text-terminal-text/60 font-mono">Moves: {memoryGame.moves}</div>
                <button
                  onClick={() => setActiveGame(null)}
                  className="px-4 py-2 bg-terminal-border rounded-lg hover:bg-terminal-border/80 transition-colors"
                >
                  Exit
                </button>
              </div>
            </div>

            <div className="max-w-md mx-auto">
              <div className="grid grid-cols-4 gap-3 mb-6">
                {memoryGame.cards.map((number, index) => (
                  <button
                    key={index}
                    onClick={() => flipCard(index)}
                    className={`aspect-square rounded-lg border-2 transition-all duration-300 ${
                      memoryGame.flipped.includes(index) || memoryGame.matched.includes(index)
                        ? 'bg-terminal-blue border-terminal-blue text-terminal-bg'
                        : 'bg-terminal-bg border-terminal-border hover:border-terminal-blue'
                    }`}
                    disabled={memoryGame.flipped.length === 2}
                  >
                    {(memoryGame.flipped.includes(index) || memoryGame.matched.includes(index)) && (
                      <span className="text-2xl font-bold font-mono">{number}</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={initMemoryGame}
                  className="flex items-center space-x-2 bg-terminal-blue text-terminal-bg px-6 py-3 rounded-lg hover:bg-terminal-blue/90 transition-colors font-mono"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>New Game</span>
                </button>
              </div>

              {memoryGame.matched.length === memoryGame.cards.length && (
                <div className="mt-6 bg-terminal-green/20 border border-terminal-green rounded-lg p-4 text-center">
                  <div className="text-terminal-green font-mono mb-2">Matrix Decoded!</div>
                  <div className="text-terminal-text/80 text-sm">
                    Score: {memoryGame.score} | Moves: {memoryGame.moves}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reaction Game */}
        {activeGame === 'reaction' && (
          <div className="bg-terminal-bg/90 rounded-2xl border border-terminal-border p-8 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-terminal-purple font-mono">Reflex Optimizer</h3>
              <button
                onClick={() => setActiveGame(null)}
                className="px-4 py-2 bg-terminal-border rounded-lg hover:bg-terminal-border/80 transition-colors"
              >
                Exit
              </button>
            </div>

            <div className="max-w-md mx-auto text-center">
              <div
                className={`w-64 h-64 mx-auto mb-8 rounded-full border-4 cursor-pointer transition-all duration-300 flex items-center justify-center text-xl font-mono ${
                  reactionGame.isWaiting
                    ? 'bg-terminal-orange border-terminal-orange animate-pulse'
                    : reactionGame.canClick
                      ? 'bg-terminal-green border-terminal-green animate-ping'
                      : 'bg-terminal-bg border-terminal-border hover:border-terminal-purple'
                }`}
                onClick={handleReactionClick}
              >
                {reactionGame.isWaiting ? (
                  'Wait...'
                ) : reactionGame.canClick ? (
                  'CLICK NOW!'
                ) : (
                  'Click to Start'
                )}
              </div>

              <div className="space-y-4">
                {reactionGame.lastTime > 0 && (
                  <div className="bg-terminal-border/20 rounded-lg p-4">
                    <div className="text-terminal-text/60 text-sm mb-1">Last Reaction Time</div>
                    <div className="text-2xl font-bold text-terminal-green font-mono">
                      {reactionGame.lastTime}ms
                    </div>
                  </div>
                )}

                {reactionGame.bestTime > 0 && (
                  <div className="bg-terminal-border/20 rounded-lg p-4">
                    <div className="text-terminal-text/60 text-sm mb-1">Best Time</div>
                    <div className="text-2xl font-bold text-terminal-yellow font-mono">
                      {reactionGame.bestTime}ms
                    </div>
                  </div>
                )}

                <button
                  onClick={startReactionTest}
                  disabled={reactionGame.isWaiting || reactionGame.canClick}
                  className="bg-terminal-purple text-terminal-bg px-8 py-3 rounded-lg hover:bg-terminal-purple/90 transition-colors font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  New Test
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GameSection;
