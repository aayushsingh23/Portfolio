import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

interface TerminalProps {
  onCommandExecute: (command: string, data?: any) => void;
}

interface TerminalLine {
  id: string;
  type: "command" | "output" | "error";
  content: string;
  timestamp: Date;
}

const commands = {
  help: {
    description: "Show this help message",
    output: [
      "Available commands:",
      "  help      | Show this help message",
      "  about     | Learn more about me",
      "  projects  | View my projects and work",
      "  experience| Check my work experience",
      "  education | View my educational background",
      "  achievements| See my accomplishments",
      "  contact   | Get my contact information",
      "  clear     | Clear the terminal",
      "  whoami    | Display user information",
      "  ls        | List available directories",
      "",
      "Type a command to get started!"
    ]
  },
  about: {
    description: "Learn more about me",
    data: {
      name: "John Developer",
      title: "Full Stack Developer",
      bio: "Passionate developer with 5+ years of experience building scalable web applications.",
      interests: ["React", "Node.js", "TypeScript", "Python", "AI/ML"]
    }
  },
  projects: {
    description: "View my projects and work",
    data: [
      {
        name: "E-Commerce Platform",
        tech: ["React", "Node.js", "MongoDB"],
        description: "Full-stack e-commerce solution with payment integration",
        status: "Completed",
        github: "https://github.com/johndeveloper/ecommerce-platform",
        deployed: "https://ecommerce-demo.vercel.app"
      },
      {
        name: "Task Management App",
        tech: ["React", "TypeScript", "Firebase"],
        description: "Collaborative task management with real-time updates",
        status: "In Progress",
        github: "https://github.com/johndeveloper/task-management",
        deployed: null // No deployed link yet
      },
      {
        name: "Portfolio Website",
        tech: ["React", "Framer Motion", "Tailwind"],
        description: "Terminal-themed portfolio with interactive elements",
        status: "Current",
        github: "https://github.com/johndeveloper/terminal-portfolio",
        deployed: "https://john-developer.vercel.app"
      }
    ]
  },
  experience: {
    description: "Check my work experience",
    data: [
      {
        company: "Tech Corp",
        position: "Senior Full Stack Developer",
        duration: "2022 - Present",
        responsibilities: ["Led development team", "Built scalable applications", "Mentored junior developers"]
      },
      {
        company: "Startup Inc",
        position: "Frontend Developer",
        duration: "2020 - 2022",
        responsibilities: ["Developed React applications", "Collaborated with design team", "Optimized performance"]
      }
    ]
  },
  education: {
    description: "View my educational background",
    data: [
      {
        degree: "Bachelor of Computer Science",
        institution: "University of Technology",
        year: "2020",
        gpa: "3.8/4.0"
      },
      {
        degree: "Full Stack Web Development Bootcamp",
        institution: "Code Academy",
        year: "2019",
        certification: "Certified"
      }
    ]
  },
  achievements: {
    description: "See my accomplishments",
    data: [
      {
        title: "Best Developer Award",
        organization: "Tech Corp",
        year: "2023",
        description: "Recognized for outstanding contribution to product development"
      },
      {
        title: "Open Source Contributor",
        organization: "GitHub",
        year: "2022",
        description: "Contributed to popular React libraries with 1000+ stars"
      }
    ]
  },
  contact: {
    description: "Get my contact information",
    data: {
      email: "john.developer@email.com",
      phone: "+1 (555) 123-4567",
      linkedin: "linkedin.com/in/johndeveloper",
      github: "github.com/johndeveloper",
      location: "Remote / San Francisco, CA"
    }
  }
};

export const Terminal = ({ onCommandExecute }: TerminalProps) => {
  const [currentInput, setCurrentInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: "welcome",
      type: "output",
      content: "Welcome to John's Portfolio Terminal",
      timestamp: new Date()
    },
    {
      id: "help-hint",
      type: "output",
      content: "Type 'help' to see available commands",
      timestamp: new Date()
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const executeCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    const timestamp = new Date();

    // Add command to history
    const commandLine: TerminalLine = {
      id: `cmd-${Date.now()}`,
      type: "command",
      content: `$ ${command}`,
      timestamp
    };

    setHistory(prev => [...prev, commandLine]);

    // Handle built-in commands
    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    if (cmd === "whoami") {
      const output: TerminalLine = {
        id: `out-${Date.now()}`,
        type: "output",
        content: "portfolio@terminal:~$ john_developer",
        timestamp
      };
      setHistory(prev => [...prev, output]);
      return;
    }

    if (cmd === "ls") {
      const output: TerminalLine = {
        id: `out-${Date.now()}`,
        type: "output",
        content: "about/  projects/  experience/  education/  achievements/  contact/",
        timestamp
      };
      setHistory(prev => [...prev, output]);
      return;
    }

    // Handle navigation commands
    if (commands[cmd as keyof typeof commands]) {
      const commandData = commands[cmd as keyof typeof commands];
      
      if (cmd === "help") {
        commandData.output?.forEach((line, index) => {
          setTimeout(() => {
            const output: TerminalLine = {
              id: `help-${Date.now()}-${index}`,
              type: "output",
              content: line,
              timestamp: new Date()
            };
            setHistory(prev => [...prev, output]);
          }, index * 50);
        });
      } else {
        const output: TerminalLine = {
          id: `out-${Date.now()}`,
          type: "output",
          content: `Entering ${cmd} directory...`,
          timestamp
        };
        setHistory(prev => [...prev, output]);
        
        // Navigate to the command view
        setTimeout(() => {
          onCommandExecute(cmd, commandData.data);
        }, 500);
      }
    } else {
      const error: TerminalLine = {
        id: `err-${Date.now()}`,
        type: "error",
        content: `Command not found: ${command}. Type 'help' for available commands.`,
        timestamp
      };
      setHistory(prev => [...prev, error]);
    }

    // Update command history
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      executeCommand(currentInput);
      setCurrentInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString("en-US", { 
      hour12: false, 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit" 
    });
  };

  return (
    <div className="w-full h-full max-w-2xl mx-auto flex flex-col">
      {/* Terminal Header */}
      <div className="bg-green-900 text-green-100 px-4 py-2 rounded-t-lg border border-green-600 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm font-mono">portfolio@terminal:~$</span>
          </div>
          <div className="text-sm text-green-300 font-mono">
            {formatTimestamp(new Date())}
          </div>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={terminalRef}
        className="bg-black text-green-100 p-4 flex-1 overflow-y-auto font-mono text-sm border-x border-b border-green-600 rounded-b-lg custom-scrollbar min-h-0"
      >
        <AnimatePresence>
          {history.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`mb-1 break-words ${
                line.type === "command" 
                  ? "text-green-300" 
                  : line.type === "error" 
                  ? "text-red-400" 
                  : "text-green-100"
              }`}
            >
              {line.content}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Current Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span className="text-green-300 mr-2 font-mono">$</span>
          <Input
            ref={inputRef}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-green-100 font-mono flex-1 p-0 focus:ring-0 focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Type a command..."
            autoFocus
          />
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-green-400 ml-1 font-mono"
          >
            █
          </motion.span>
        </form>
      </div>
    </div>
  );
};
