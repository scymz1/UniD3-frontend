'use client';

import Navbar from '../components/Navbar';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Contact</h1>

          {/* Citation Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-3 border-b-2 border-orange-500 pb-2">
              Citation of the Paper
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              To cite the UniD³ website in a publication, please use the following reference:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 border-l-4 border-orange-500 pl-4 py-3 rounded-r-lg">
              <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                [Authors]. <strong>UniD³</strong>: LLM-driven Drug-Disease Dataset Construction via KG-RAG. [Journal/Conference]. [Year].
              </p>
            </div>
          </div>

          {/* Contact Info Section */}
          <div>
            <h2 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-3 border-b-2 border-orange-500 pb-2">
              Contact Info
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Qianqian Song, PhD</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Principal Investigator</p>
              </div>
              
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Email:</p>
                <a 
                  href="mailto:qsong1@ufl.edu" 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  qsong1@ufl.edu
                </a>
              </div>

              <div>
                <p className="font-medium text-gray-900 dark:text-white mb-2">Mailing address:</p>
                <div className="text-sm space-y-1 pl-4 border-l-2 border-gray-300 dark:border-gray-600">
                  <p>Department of Health Outcomes and Biomedical Informatics</p>
                  <p>College of Medicine</p>
                  <p>University of Florida</p>
                  <p>1889 Museum Rd, Suite 7000</p>
                  <p>Gainesville, FL 32611</p>
                  <p className="mt-2">Tel: (352) 627-9467</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <p>Copyright 2025-Present - University of Florida</p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                Emergency Information
              </a>
              <span className="text-gray-400">|</span>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                Site Policies
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

