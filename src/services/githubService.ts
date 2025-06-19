
export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

export interface GitHubUser {
  login: string;
  name: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
}

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

class GitHubService {
  private baseUrl = 'https://api.github.com';
  private username = 'usuf93817';

  async getUser(): Promise<GitHubUser> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${this.username}`);
      if (!response.ok) throw new Error('Failed to fetch user data');
      return await response.json();
    } catch (error) {
      console.error('GitHub API Error:', error);
      // Return mock data as fallback
      return {
        login: 'usuf93817',
        name: 'NodeXstation Developer',
        bio: 'Full-stack developer specializing in MERN stack and AI solutions',
        public_repos: 15,
        followers: 42,
        following: 28,
        avatar_url: '/placeholder.svg'
      };
    }
  }

  async getRepositories(): Promise<GitHubRepository[]> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=6`);
      if (!response.ok) throw new Error('Failed to fetch repositories');
      return await response.json();
    } catch (error) {
      console.error('GitHub API Error:', error);
      // Return mock data as fallback
      return [
        {
          id: 1,
          name: 'ai-chat-assistant',
          full_name: 'usuf93817/ai-chat-assistant',
          description: 'Advanced AI chat assistant with voice recognition',
          html_url: 'https://github.com/usuf93817/ai-chat-assistant',
          language: 'TypeScript',
          stargazers_count: 42,
          forks_count: 8,
          updated_at: '2024-01-15T10:30:00Z',
          topics: ['ai', 'chat', 'typescript', 'react']
        },
        {
          id: 2,
          name: 'mern-ecommerce',
          full_name: 'usuf93817/mern-ecommerce',
          description: 'Full-stack ecommerce platform with MongoDB, Express, React, Node.js',
          html_url: 'https://github.com/usuf93817/mern-ecommerce',
          language: 'JavaScript',
          stargazers_count: 38,
          forks_count: 12,
          updated_at: '2024-01-12T14:20:00Z',
          topics: ['mern', 'ecommerce', 'mongodb', 'react']
        },
        {
          id: 3,
          name: 'threejs-portfolio',
          full_name: 'usuf93817/threejs-portfolio',
          description: '3D portfolio website built with Three.js and React',
          html_url: 'https://github.com/usuf93817/threejs-portfolio',
          language: 'JavaScript',
          stargazers_count: 25,
          forks_count: 6,
          updated_at: '2024-01-10T09:15:00Z',
          topics: ['threejs', '3d', 'portfolio', 'webgl']
        }
      ];
    }
  }

  async getRecentCommits(repo: string): Promise<GitHubCommit[]> {
    try {
      const response = await fetch(`${this.baseUrl}/repos/${this.username}/${repo}/commits?per_page=5`);
      if (!response.ok) throw new Error('Failed to fetch commits');
      return await response.json();
    } catch (error) {
      console.error('GitHub API Error:', error);
      return [];
    }
  }

  async getLanguageStats(): Promise<Record<string, number>> {
    try {
      const repos = await this.getRepositories();
      const languageStats: Record<string, number> = {};
      
      repos.forEach(repo => {
        if (repo.language) {
          languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
        }
      });
      
      return languageStats;
    } catch (error) {
      console.error('Error calculating language stats:', error);
      return {
        'TypeScript': 8,
        'JavaScript': 6,
        'Python': 3,
        'CSS': 4
      };
    }
  }
}

export const githubService = new GitHubService();
