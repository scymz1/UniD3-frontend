import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Database, Brain, Target, Network } from 'lucide-react';
import Navbar from './components/Navbar';

const taskHighlights = [
  {
    title: 'Drug-Disease Matching (DDM)',
    description: 'Identify high-confidence drug and disease relationships with contextual explanations grounded in PubMed evidence.',
    icon: Network,
  },
  {
    title: 'Drug Effectiveness Assessment (DEA)',
    description: 'Evaluate drug outcomes, effectiveness signals, and clinical directions across large-scale biomedical corpora.',
    icon: Brain,
  },
  {
    title: 'Drug-Target Analysis (DTA)',
    description: 'Trace molecular targets, pathways, and intervention strategies by mining structured triplets.',
    icon: Target,
  },
];

const datasetLinks = [
  {
    name: 'DDM Dataset',
    href: 'https://huggingface.co/datasets/Mike2481/UniD3_DDM',
  },
  {
    name: 'DEA Dataset',
    href: 'https://huggingface.co/datasets/Mike2481/UniD3_DEA',
  },
  {
    name: 'DTA Dataset',
    href: 'https://huggingface.co/datasets/Mike2481/UniD3_DTA',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 dark:from-slate-900 dark:via-slate-950 dark:to-amber-950/20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* Hero */}
        <section className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-wide text-amber-700 dark:text-amber-400 font-semibold mb-2">
                LLM-driven Biomedical Knowledge
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                UniD<sup>3</sup>: Unified Drug-Disease Dataset Construction via KG-RAG
              </h1>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              UniD³ orchestrates Llama3.3-70B with Knowledge Graph Retrieval-Augmented Generation to transform over
              150,000 PubMed articles into structured, high-fidelity biomedical datasets. Our dual-stage entity extraction
              pipeline ensures consistent, noise-resistant graph construction.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-600 text-white font-semibold shadow-lg shadow-amber-600/30 hover:bg-amber-500 transition-colors"
              >
                Start Chat
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/help"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-200 text-amber-800 dark:text-amber-200 hover:bg-amber-100/40 dark:hover:bg-amber-900/30 transition-colors"
              >
                Documentation
              </Link>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">150k+</p>
                <p>PubMed publications</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">0.80+</p>
                <p>F1 across tasks</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">0.9005</p>
                <p>Expert F1 (DDM)</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-amber-100 dark:border-amber-900/40 p-4">
            <Image
              src="/unid3.png"
              alt="UniD³ Architecture"
              width={900}
              height={650}
              className="w-full h-auto rounded-xl"
              priority
            />
          </div>
        </section>

        {/* Highlights */}
        <section className="grid md:grid-cols-3 gap-6">
          {taskHighlights.map((task) => {
            const Icon = task.icon;
            return (
              <div
                key={task.title}
                className="rounded-2xl border border-amber-100 dark:border-amber-900/40 bg-white/80 dark:bg-slate-900/60 p-6 shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-amber-700 dark:text-amber-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{task.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{task.description}</p>
              </div>
            );
          })}
        </section>

        {/* Knowledge Graph & CTA */}
        <section className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dual-Stage KG Construction</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              UniD³ first performs paper-level extraction to capture localized research context, then promotes consistent
              entities into a KG-level summary. LightRAG and custom prompts distill reliable triplets that fuel downstream QA
              and dataset generation pipelines.
            </p>
            <Link
              href="https://zenodo.org/records/15368180"
              target="_blank"
              className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-300 font-semibold hover:underline"
            >
              <Database className="w-5 h-5" />
              Access Knowledge Graph on Zenodo
            </Link>
          </div>
          <div className="rounded-2xl border border-amber-100 dark:border-amber-900/30 bg-white dark:bg-slate-900 p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Datasets on HuggingFace</h3>
            <div className="space-y-3">
              {datasetLinks.map((dataset) => (
                <a
                  key={dataset.name}
                  href={dataset.href}
                  target="_blank"
                  className="block rounded-xl border border-gray-200 dark:border-slate-700 px-4 py-3 hover:border-amber-400 dark:hover:border-amber-400 transition"
                >
                  <p className="font-semibold text-gray-900 dark:text-white">{dataset.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Login with HuggingFace account to download</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

