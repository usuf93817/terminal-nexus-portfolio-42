
import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, Eye, Calendar, Code, Users } from 'lucide-react';

interface GitHubData {
  username: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  totalWatchers: number;
  languages: { [key: string]: number };
  recentActivity: Array<{
    type: string;
    repo: string;
    date: string;
  }>;
}

const GitHubStats = () => {
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock GitHub data - in a real app, you'd use the GitHub API
  const mockGitHubData: GitHubData = {
    username: "nodexStation",
    name: "NodeXstation",
    bio: "Full-Stack Developer specializing in MERN Stack & Three.js",
    followers: 234,
    following: 89,
    publicRepos: 42,
    totalStars: 1247,
    totalForks: 89,
    totalWatchers: 156,
    languages: {
      "JavaScript": 35,
      "TypeScript": 25,
      "Python": 20,
      "React": 15,
      "Other": 5
    },
    recentActivity: [
      { type: "push", repo: "react-portfolio", date: "2 hours ago" },
      { type: "star", repo: "three-js-showcase", date: "5 hours ago" },
      { type: "fork", repo: "ai-chatbot", date: "1 day ago" },
      { type: "commit", repo: "mern-ecommerce", date: "2 days ago" }
    ]
  };

  useEffect(() => {
    const fetchGitHubStats = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setGithubData(mockGitHubData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch GitHub data');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'push':
      case 'commit':
        return <Code className="w-3 h-3" />;
      case 'star':
        return <Star className="w-3 h-3" />;
      case 'fork':
        return <GitFork className="w-3 h-3" />;
      default:
        return <Github className="w-3 h-3" />;
    }
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-terminal-green mb-4">
            <span className="syntax-keyword">class</span> <span className="syntax-function">GitHubStats</span> {"{"}
          </h2>
          <p className="text-terminal-text/80 mb-6">
            Live GitHub activity and statistics
          </p>
        </div>

        {loading ? (
          <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin w-8 h-8 border-2 border-terminal-green border-t-transparent rounded-full"></div>
              <span className="ml-4 text-terminal-text font-mono">Fetching GitHub data...</span>
            </div>
          </div>
        ) : error ? (
          <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border p-8 text-center">
            <Github className="w-16 h-16 text-terminal-red mx-auto mb-4" />
            <div className="text-terminal-red font-mono">{error}</div>
          </div>
        ) : githubData ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile Overview */}
            <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-terminal-green/20 rounded-full flex items-center justify-center">
                  <Github className="w-8 h-8 text-terminal-green" />
                </div>
                <div>
                  <h3 className="text-terminal-green font-mono font-bold text-lg">
                    {githubData.name}
                  </h3>
                  <p className="text-terminal-text/60 text-sm">@{githubData.username}</p>
                </div>
              </div>
              
              <p className="text-terminal-text/80 text-sm mb-6 font-mono">
                {githubData.bio}
              </p>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-terminal-green font-mono">
                    {githubData.followers}
                  </div>
                  <div className="text-terminal-text/60 text-xs font-mono">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-terminal-green font-mono">
                    {githubData.following}
                  </div>
                  <div className="text-terminal-text/60 text-xs font-mono">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-terminal-green font-mono">
                    {githubData.publicRepos}
                  </div>
                  <div className="text-terminal-text/60 text-xs font-mono">Repos</div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border p-6">
              <h3 className="text-terminal-green font-mono font-bold text-lg mb-6">
                Repository Stats
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-terminal-yellow" />
                    <span className="text-terminal-text font-mono text-sm">Total Stars</span>
                  </div>
                  <span className="text-terminal-green font-mono font-bold">
                    {githubData.totalStars}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <GitFork className="w-4 h-4 text-terminal-blue" />
                    <span className="text-terminal-text font-mono text-sm">Total Forks</span>
                  </div>
                  <span className="text-terminal-green font-mono font-bold">
                    {githubData.totalForks}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-terminal-purple" />
                    <span className="text-terminal-text font-mono text-sm">Total Watchers</span>
                  </div>
                  <span className="text-terminal-green font-mono font-bold">
                    {githubData.totalWatchers}
                  </span>
                </div>
              </div>

              {/* Language Distribution */}
              <div className="mt-6">
                <h4 className="text-terminal-text font-mono text-sm mb-3">Top Languages</h4>
                <div className="space-y-2">
                  {Object.entries(githubData.languages).map(([lang, percentage]) => (
                    <div key={lang}>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-terminal-text">{lang}</span>
                        <span className="text-terminal-green">{percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-terminal-border rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-terminal-green transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border p-6">
              <h3 className="text-terminal-green font-mono font-bold text-lg mb-6">
                Recent Activity
              </h3>
              
              <div className="space-y-4">
                {githubData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-terminal-green mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="text-terminal-text font-mono text-sm">
                        <span className="capitalize text-terminal-green">{activity.type}</span>
                        {' '}on{' '}
                        <span className="text-terminal-blue">{activity.repo}</span>
                      </div>
                      <div className="text-terminal-text/60 text-xs font-mono flex items-center mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {activity.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-terminal-border">
                <a
                  href={`https://github.com/${githubData.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full py-2 text-terminal-green hover:text-terminal-green/80 transition-colors font-mono text-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        ) : null}

        <div className="text-center mt-8">
          <p className="text-terminal-green text-2xl font-bold">{"}"}</p>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
