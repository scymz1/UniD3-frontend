'use client';

import Navbar from '../components/Navbar';
import { HelpCircle, MessageSquare, BookOpen, Database, FileText, Github } from 'lucide-react';

export default function HelpPage() {
  const helpSections = [
    {
      icon: MessageSquare,
      title: 'Using the Chatbot',
      content: [
        'Ask questions about drug-disease relationships, drug effectiveness, and drug-target analysis.',
        'The chatbot uses a knowledge graph built from over 150,000 PubMed publications.',
        'You can ask questions in natural language, and the system will retrieve relevant information from the knowledge graph.',
        'Press Enter to send a message, or Shift+Enter for a new line.',
      ],
    },
    {
      icon: Database,
      title: 'Knowledge Graph',
      content: [
        'UniD³ employs a dual-stage entity extraction strategy to build hierarchical knowledge graphs.',
        'The knowledge graph contains information extracted from PubMed publications using Llama3.3-70B.',
        'The generated knowledge graphs and vector database are stored in zenodo.',
        'You can access the datasets through HuggingFace or download directly from zenodo.',
      ],
    },
    {
      icon: BookOpen,
      title: 'Three Core Tasks',
      content: [
        'Drug-Disease Matching (DDM): Identify relationships between drugs and diseases.',
        'Drug Effectiveness Assessment (DEA): Evaluate the effectiveness of drugs for specific conditions.',
        'Drug-Target Analysis (DTA): Analyze interactions between drugs and their molecular targets.',
      ],
    },
    {
      icon: FileText,
      title: 'Datasets',
      content: [
        'DDM, DEA, and DTA datasets are available on HuggingFace.',
        'You can access them using pandas or the HuggingFace datasets library.',
        'All datasets achieved F1 scores exceeding 0.80 across all tasks.',
        'The DDM task achieved an expert validation score of 0.9005 F1.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          {/* Title */}
          <div className="flex items-center space-x-3 mb-8">
            <HelpCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Help & Documentation</h1>
          </div>

          {/* Help Sections */}
          <div className="space-y-6">
            {helpSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {section.title}
                      </h2>
                      <ul className="space-y-2">
                        {section.content.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed flex items-start"
                          >
                            <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="https://zenodo.org/records/15368180"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
              >
                <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Knowledge Graph (Zenodo)</span>
              </a>
              <a
                href="https://huggingface.co/datasets/Mike2481/UniD3_DDM"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
              >
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Datasets (HuggingFace)</span>
              </a>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  How accurate are the responses?
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  The UniD³-generated datasets achieved F1 scores exceeding 0.80 across all three tasks, with expert validation scores reaching 0.9005 F1 in the DDM task.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  What data sources are used?
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  The system leverages over 150,000 drug-related publications from PubMed, processed using Llama3.3-70B with carefully designed prompts.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Can I download the datasets?
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Yes, all datasets (DDM, DEA, DTA) are available on HuggingFace and can be accessed using pandas or the HuggingFace datasets library.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

