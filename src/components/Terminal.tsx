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
            "  home      | Return to the main ID card view",
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
            "Navigation tips:",
            "  • Press Tab for command autocomplete",
            "  • Use ↑/↓ arrows to browse command history",
            "",
            "Type a command to get started!"
        ]
    },
    home: {
        description: "Return to the main ID card view",
        data: null
    },
    about: {
        description: "Learn more about me",
        data: {
            name: "Aayush Singh",
            title: "Software Developer",
            bio: "Passionate developer with 5+ years of experience building scalable web applications.",
            interests: ["React", "Node.js", "TypeScript", "Python", "AI/ML"]
        }
    },
    projects: {
        description: "View my projects and work",
        data: [
            {
                name: "Proctoring System & AI Compliance Suite",
                tech: ["WebRTC", "PHP", "Python", "DeepFace", "YOLOv8", "OpenCV"],
                description: "Deep Learing based Proctoring System for AI based Interview and Examination",
                status: "In Progress",
                github: "https://github.com/aayushsingh23/Proctor",
                deployed: "https://hiredev.intrvuz.com/"
            },
            {
                name: "Crack Detection and Analysis",
                tech: ["Python", "Capsule", "Attention Mechanism", "OpenCV"],
                description: "Developed a crack detection and analysis tool using advanced image processing techniques.",
                status: "In Progress",
                github: "https://github.com/aayushsingh23/",
                deployed: null // No deployed link yet
            },
            {
                name: "Canteen Management System",
                tech: ["Kubernetes", "Docker", "Node.js", "React.js", "MySQL"],
                description: "Orchestrated a canteen management system for the Ministry of Defence using Kubernetes",
                status: "Completed",
                github: "https://github.com/aayushsingh23/",
                deployed: null // No deployed link yet
            },
            {
                name: "AI Based Attire Check",
                tech: ["Python", "OpenAI API", "YOLOv8", "OpenCV"],
                description: "Deep Learning based Proctoring System for AI based Interview and Examination",
                status: "In Progress",
                github: "https://github.com/aayushsingh23/Proctor",
                deployed: "https://attiretest.intrvuz.com/"
            },
            {
                name: "CyberGaurd",
                tech: ["GD Script", "Godot Engine", "TensorFlow"],
                description: "Deep Learning based Proctoring System for AI based Interview and Examination",
                status: "Completed",
                github: "https://github.com/yuvikasardana/CyberGuard",
                deployed: null
            },
            {
                name: "MoodStream",
                tech: ["Keras", "OpenCV", "Spotify API"],
                description: "Facial Expression based music playlist recommendation system",
                status: "Completed",
                github: "https://github.com/yuvikasardana/MoodStream",
                deployed: null // No deployed link yet
            },
            {
                name: "Sangam",
                tech: ["Webflow", "Flask", "MongoDB"],
                description: "Established joint ledger groups for simplified loan applications.",
                status: "Completed",
                github: "https://github.com/aayushsingh23/",
                deployed: null // No deployed link yet
            },
            {
                name: "BetterMehta",
                tech: ["Flask", "PrinterSpooler API", "OpenAI"],
                description: "Intelligent print store management",
                status: "Completed",
                github: "https://github.com/Pancham1603/BetterMehta",
                deployed: null // No deployed link yet
            },
            {
                name: "Guide for Guides",
                tech: ["HTML", "CSS", "JavaScript", "Webflow", "RazorPay API"],
                description: "A digital solution for providing tour guides without middlemen.",
                status: "Completed",
                github: "https://github.com/aayushsingh23/",
                deployed: null // No deployed link yet
            },
            {
                name: "Portfolio Website",
                tech: ["React", "Framer Motion", "Tailwind"],
                description: "Terminal-themed portfolio with interactive elements",
                status: "Current",
                github: "https://github.com/johndeveloper/terminal-portfolio",
                deployed: "https://john-developer.vercel.app"
            },
            {
                name: "Digital Diner",
                tech: ["Tailwind", "Framer Motion", "Vite + React", "ThreeJS"],
                description: "Three dimensional portfolio with interactive elements",
                status: "Completed",
                github: "https://github.com/aayushsingh23/DIgital-Diner.git",
                deployed: "https://digi-diner.netlify.app/"
            },
            {
                name: "3D - Portfolio Website",
                tech: ["Tailwind", "Framer Motion", "Vite + React", "ThreeJS"],
                description: "Three dimensional portfolio with interactive elements",
                status: "Completed",
                github: "https://github.com/johndeveloper/terminal-portfolio",
                deployed: "https://john-developer.vercel.app"
            }
        ]
    },
    experience: {
        description: "Check my work experience",
        data: [
            {
                company: "Adzip Technologies",
                position: "Software Development Engineering Intern",
                duration: "Jun'25 – Sep'25",
                responsibilities: ["Worked closely seniors to solve bugs", "Built multiple AI functionalities for AI based Interview and Examination", "Handles real time client deadlines"]
            },
            {
                company: "Credex Technologies",
                position: "DevOps Engineering Intern",
                duration: "Jun'24 – Aug'24",
                responsibilities: ["Deployed a website using Kubernetes", "Refined 10+ CI/CD pipelines", "Streamlined configurations"]
            },
            {
                company: "Oryggi Technologies Pvt. Ltd.",
                position: "Frontend Intern",
                duration: "Jun'23 – Jul'23",
                responsibilities: ["Responsive and interactive ERP platform", "Integrated MySQL for backend", "Resolved 15+ critical bugs"]
            }
        ]
    },
    education: {
        description: "View my educational background",
        data: [
            {
                degree: "Bachelor of Computer Engineering",
                institution: "Thapar Institute of Engineering and Technology",
                year: "2026",
                gpa: "8.25"
            },
            {
                degree: "Data Science: Foundations using R Specialization",
                institution: "Johns Hopkins University",
                year: "2024",
                certification: "Certified"
            },
            {
                degree: "Data Science: Python for Data Analysis",
                institution: "Udemy",
                year: "2024",
                certification: "Certified"
            },
            {
                degree: "The Web Developer Bootcamp",
                institution: "Udemy",
                year: "2023",
                certification: "Certified"
            },
            {
                degree: "High School",
                institution: "Mayoor School, Noida",
                year: "2022"
            }
        ]
    },
    achievements: {
        description: "See my accomplishments",
        data: [
            {
                title: "GATE Qualified",
                organization: "GATE",
                year: "2025",
                description: "8000 rank holder in Gate"
            },
            {
                title: "Patent CrackGen",
                organization: "Thapar Institute of Engineering and Technology",
                year: "2025",
                description: "Filed for patent under the crack detection and its dimensional analysis"
            },
            {
                title: "SIH 2024",
                organization: "Smart India Hackathon",
                year: "2024",
                description: "Participant of SIH 2024"
            },
            {
                title: "Best FirstYear Hack",
                organization: "Hacklipse ACM Thapar",
                year: "2023",
                description: "Made Sangam for this Hackathon and won cash prize"
            }
        ]
    },
    contact: {
        description: "Get my contact information",
        data: {
            email: "aayush.singh@gmail.com",
            phone: "+91 9958467077",
            linkedin: "linkedin.com/in/aayush25",
            github: "github.com/aayushsingh23",
            location: "India"
        }
    }
};

export const Terminal = ({ onCommandExecute }: TerminalProps) => {
    const [currentInput, setCurrentInput] = useState("");
    const [history, setHistory] = useState<TerminalLine[]>([
        {
            id: "welcome",
            type: "output",
            content: "Welcome to Aayush's Portfolio Terminal",
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

    // Get all available commands for autocomplete
    const getAllCommands = () => {
        return [...Object.keys(commands), "clear", "whoami", "ls"];
    };

    // Handle autocomplete functionality
    const handleAutocomplete = (input: string) => {
        const allCommands = getAllCommands();
        const matches = allCommands.filter(cmd =>
            cmd.toLowerCase().startsWith(input.toLowerCase().trim())
        );
        return matches;
    };

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
                content: "portfolio@terminal:~$ aayush_singh",
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
            } else if (cmd === "home") {
                const output: TerminalLine = {
                    id: `out-${Date.now()}`,
                    type: "output",
                    content: "Returning to main view...",
                    timestamp
                };
                setHistory(prev => [...prev, output]);

                // Navigate back to the default view (ID card)
                setTimeout(() => {
                    onCommandExecute("default", null);
                }, 500);
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
        // Handle Tab key for autocomplete
        if (e.key === "Tab") {
            e.preventDefault();
            const matches = handleAutocomplete(currentInput);
            if (matches.length > 0) {
                setCurrentInput(matches[0]);
            }
            return;
        }

        // Handle command history navigation
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
                            className={`mb-1 break-words ${line.type === "command"
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
