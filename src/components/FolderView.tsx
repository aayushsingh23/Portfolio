import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Folder, User, Briefcase, GraduationCap, Award, Mail, FileText, Github, ExternalLink } from "lucide-react";

interface FolderViewProps {
  type: string;
  data: any;
  onBack: () => void;
}

const folderIcons = {
  about: User,
  projects: Folder,
  experience: Briefcase,
  education: GraduationCap,
  achievements: Award,
  contact: Mail,
};

export const FolderView = ({ type, data, onBack }: FolderViewProps) => {
  const Icon = folderIcons[type as keyof typeof folderIcons] || FileText;

  const renderContent = () => {
    switch (type) {
      case "about":
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-100 mb-2">{data.name}</h2>
              <p className="text-green-300 text-lg">{data.title}</p>
            </div>
            <div className="bg-green-900/50 p-4 rounded border border-green-600">
              <p className="text-green-100 leading-relaxed">{data.bio}</p>
            </div>
            <div>
              <h3 className="text-green-300 font-semibold mb-2">Interests & Technologies:</h3>
              <div className="flex flex-wrap gap-2">
                {data.interests.map((interest: string, index: number) => (
                  <span
                    key={index}
                    className="bg-green-800 text-green-100 px-3 py-1 rounded text-sm border border-green-600"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-4">
            {data.map((project: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-green-900/50 p-4 rounded border border-green-600 hover:bg-green-900/70 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-green-100 font-semibold text-lg">{project.name}</h3>
                  <span className="text-xs text-green-300 bg-green-800 px-2 py-1 rounded border border-green-600">
                    {project.status}
                  </span>
                </div>
                
                {/* Project Links */}
                <div className="flex gap-3 mb-3">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-green-300 hover:text-green-100 text-sm transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </motion.a>
                  )}
                  {project.deployed && (
                    <motion.a
                      href={project.deployed}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-green-300 hover:text-green-100 text-sm transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                </div>
                
                <p className="text-green-200 text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech: string, techIndex: number) => (
                    <span
                      key={techIndex}
                      className="bg-green-800 text-green-100 px-2 py-1 rounded text-xs border border-green-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        );

      case "experience":
        return (
          <div className="space-y-4">
            {data.map((exp: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-green-900/50 p-4 rounded border border-green-600 hover:bg-green-900/70 transition-colors"
              >
                <div className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div className="flex-1">
                      <h3 className="text-green-100 font-semibold text-lg leading-tight">{exp.position}</h3>
                      <p className="text-green-300 font-medium">{exp.company}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-green-400 text-sm font-mono bg-green-800/50 px-2 py-1 rounded border border-green-600">
                        {exp.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-l-2 border-green-600 pl-4">
                  <h4 className="text-green-300 text-sm font-semibold mb-2">Key Responsibilities:</h4>
                  <ul className="space-y-1">
                    {exp.responsibilities.map((resp: string, respIndex: number) => (
                      <li key={respIndex} className="flex items-start text-green-200 text-sm">
                        <span className="text-green-400 mr-2 mt-1.5 text-xs">▸</span>
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case "education":
        return (
          <div className="space-y-4">
            {data.map((edu: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-green-900/50 p-4 rounded border border-green-600"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-green-100 font-semibold">{edu.degree}</h3>
                    <p className="text-green-300">{edu.institution}</p>
                  </div>
                  <span className="text-green-400 text-sm">{edu.year}</span>
                </div>
                {edu.gpa && (
                  <p className="text-green-200 text-sm">GPA: {edu.gpa}</p>
                )}
                {edu.certification && (
                  <p className="text-green-200 text-sm">Status: {edu.certification}</p>
                )}
              </motion.div>
            ))}
          </div>
        );

      case "achievements":
        return (
          <div className="space-y-4">
            {data.map((achievement: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-green-900/50 p-4 rounded border border-green-600"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-green-100 font-semibold">{achievement.title}</h3>
                    <p className="text-green-300">{achievement.organization}</p>
                  </div>
                  <span className="text-green-400 text-sm">{achievement.year}</span>
                </div>
                <p className="text-green-200 text-sm">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        );

      case "contact":
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-green-100 mb-2">Get In Touch</h2>
              <p className="text-green-300">Let's connect and build something amazing together!</p>
            </div>
            <div className="space-y-3">
              <div className="bg-green-900/50 p-3 rounded border border-green-600 flex items-center space-x-3">
                <Mail className="text-green-400 w-5 h-5" />
                <div>
                  <p className="text-green-300 text-sm">Email</p>
                  <p className="text-green-100">{data.email}</p>
                </div>
              </div>
              <div className="bg-green-900/50 p-3 rounded border border-green-600">
                <p className="text-green-300 text-sm">Phone</p>
                <p className="text-green-100">{data.phone}</p>
              </div>
              <div className="bg-green-900/50 p-3 rounded border border-green-600">
                <p className="text-green-300 text-sm">LinkedIn</p>
                <p className="text-green-100">{data.linkedin}</p>
              </div>
              <div className="bg-green-900/50 p-3 rounded border border-green-600">
                <p className="text-green-300 text-sm">GitHub</p>
                <p className="text-green-100">{data.github}</p>
              </div>
              <div className="bg-green-900/50 p-3 rounded border border-green-600">
                <p className="text-green-300 text-sm">Location</p>
                <p className="text-green-100">{data.location}</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-green-300">
            <p>Content for {type} not found.</p>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full h-full max-w-lg mx-auto flex flex-col"
    >
      <Card className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 border-2 border-green-600 shadow-2xl flex-1 flex flex-col overflow-hidden">
        <CardHeader className="pb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-green-300 hover:text-green-100 hover:bg-green-800 p-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <Icon className="w-6 h-6 text-green-400" />
              <CardTitle className="text-green-100 capitalize text-lg">{type}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0 flex-1 overflow-y-auto custom-scrollbar">
          {renderContent()}
        </CardContent>
      </Card>
    </motion.div>
  );
};
