"use client"
import React, { useState, useEffect, useRef } from 'react';

import { Bot, CheckCircle2, Download, Flame, Zap } from 'lucide-react';
import mermaid from 'mermaid';
import { markdownToSafeHtml } from '@/lib/safeMarkdown';

// --- Sub-Components --- //
import AnalyticalSummary from '@/components/study/AnalyticalSummary';
import InteractiveStudyPlanner from '@/components/study/InteractiveStudyPlanner';
import QuizContainer from '@/components/study/QuizContainer';
import ChatTutor from '@/components/study/ChatTutor';
import FlashcardContainer from '@/components/study/FlashcardContainer';
import ErrorNotebook from '@/components/study/ErrorNotebook';
import StudyDashboard from '@/components/study/StudyDashboard';
import MemoryTechniques from '@/components/study/MemoryTechniques';
import InteractiveMindMap from '@/components/study/InteractiveMindMap';
import MetacognitiveDiary from '@/components/study/MetacognitiveDiary';
import EnglishTutorAI from '@/components/study/EnglishTutorAI';
import CurrentAffairsHub from '@/components/study/CurrentAffairsHub';
import WorkedExamples from '@/components/study/WorkedExamples';
import StudyPlan7Days from '@/components/study/StudyPlan7Days';
import SourceExplorer from '@/components/study/SourceExplorer';
import ExamEveMode from '@/components/study/ExamEveMode';
import MobileDrawer from '@/components/layout/MobileDrawer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import PrintablePDF from '@/components/study/PrintablePDF';
import TTSPlayer from '@/components/study/TTSPlayer';
import FocusPlayer from '@/components/study/FocusPlayer';
import TurboStudyMode from '@/components/study/TurboStudyMode';
import BlankPageRecall from '@/components/study/BlankPageRecall';
import DashboardPage from '@/components/dashboard/DashboardPage';
import Sidebar from '@/components/layout/Sidebar';

function RenderizarMarkdown({ rawText }: { rawText: string }) {
  const html = markdownToSafeHtml(rawText || '');
  return (
    <div
      className="prose prose-invert max-w-none text-slate-200"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [query, setQuery] = useState('');
  const [anoEscolar, setAnoEscolar] = useState('6º ano');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [errors, setErrors] = useState<any[]>([]);
  const [flashcardProgress, setFlashcardProgress] = useState<Record<string, any>>({});
  const [stats, setStats] = useState({ sessions: 0, cardsReviewed: 0, accuracy: 85, timeSpent: 0 });
  const [tutorMode, setTutorMode] = useState('socratico');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [summaryDepth, setSummaryDepth] = useState<'short' | 'detailed' | 'analytical'>('short');
  const [showDiary, setShowDiary] = useState(false);
  const [pdfImages, setPdfImages] = useState<{cover: string, summary: string, mnemonics: string, examples: string} | null>(null);
  const [printRequest, setPrintRequest] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const contentAreaRef = useRef<HTMLDivElement>(null);
  const contentToPrintRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (contentAreaRef.current) {
      contentAreaRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  // Persistence logic
  useEffect(() => {
    const savedErrors = localStorage.getItem('estuda_ai_errors');
    if (savedErrors) setErrors(JSON.parse(savedErrors));
    const savedProgress = localStorage.getItem('estuda_ai_flashcards');
    if (savedProgress) setFlashcardProgress(JSON.parse(savedProgress));
    const savedStats = localStorage.getItem('estuda_ai_stats');
    if (savedStats) setStats(JSON.parse(savedStats));
  }, []);

  useEffect(() => localStorage.setItem('estuda_ai_errors', JSON.stringify(errors)), [errors]);
  useEffect(() => localStorage.setItem('estuda_ai_flashcards', JSON.stringify(flashcardProgress)), [flashcardProgress]);
  useEffect(() => localStorage.setItem('estuda_ai_stats', JSON.stringify(stats)), [stats]);

  useEffect(() => {
    if (activeTab === 'mapa' && data) {
      mermaid.initialize({ startOnLoad: false, theme: 'dark' });
      mermaid.contentLoaded();
    }
  }, [activeTab, data]);

  const doSearch = async (q?: string) => {
    const searchTerm = q || query;
    if (!searchTerm) return;
    
    if (abortControllerRef.current) {
        abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    
    setLoading(true);
    setPdfImages(null);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}&ano=${encodeURIComponent(anoEscolar)}`, {
          signal: abortControllerRef.current.signal
      });
      const body = await res.json();
      if (body.error && body.fallback) {
        const fallbackData = createLocalSearchFallback(searchTerm, anoEscolar, body.fallback);
        setData(fallbackData);
        setStats(prev => ({ ...prev, sessions: prev.sessions + 1 }));
        setActiveTab('dashboard');
        return;
      }
      if (body.error) throw new Error(body.error);
      setData(body);
      setStats(prev => ({ ...prev, sessions: prev.sessions + 1 }));
      setActiveTab('dashboard');
    } catch (e: any) {
      if (e.name !== 'AbortError') {
        const fallbackData = createLocalSearchFallback(searchTerm, anoEscolar);
        setData(fallbackData);
        setStats(prev => ({ ...prev, sessions: prev.sessions + 1 }));
        setActiveTab('dashboard');
        console.error("Busca usou fallback local:", e.message);
      }
      setSummaryDepth('short');
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  function createLocalSearchFallback(topic: string, grade: string, apiFallback?: any) {
    return {
    tema: topic,
    disciplina: 'geral',
    anoEscolar: grade,
    topic,
    shortSummary: apiFallback?.shortSummary || `Resumo inicial de ${topic} para ${grade}. A busca abriu em modo local para garantir que o aluno consiga continuar estudando. Use este ponto de partida para gerar resumo, flashcards, quiz, mapa mental e PDF assim que a IA/fonte externa responder.`,
    mindMap: apiFallback?.mindMap || {
      title: topic,
      description: `Mapa inicial de ${topic}`,
      children: [
        { title: 'Conceitos-chave', description: 'Ideias que precisam ser entendidas primeiro.', children: [] },
        { title: 'Exemplos', description: 'Aplicacoes em exercicios e provas.', children: [] },
        { title: 'Erros comuns', description: 'Pontos que merecem atencao.', children: [] }
      ]
    },
    fontes: [
      { title: 'BNCC/MEC', url: 'https://basenacionalcomum.mec.gov.br/', type: 'fonte-oficial' },
      { title: 'Inep/ENEM', url: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem', type: 'fonte-oficial' }
    ],
    resumoAnalitico: null,
    tecnicasComprovadas: null,
    pdfIlustrado: { images: [], sections: [] },
    modosEstudo: {},
    modoTurbo: null,
    orientadorFontes: [],
    proximasAcoes: ['Tentar nova busca', 'Abrir Professor IA', 'Criar flashcards locais'],
    detailedSummary: '',
    resumeContent: '',
    studyPlan7Days: [],
    workedExamples: [],
    questions: apiFallback?.questions || [],
    flashcards: apiFallback?.flashcards || [],
    mnemonicos: [],
    parodias: [],
    podcastScript: []
    };
  }

  const handleBrandNavigate = (tab: string) => {
    const publicTabs = ['search', 'planner', 'english', 'atualidades'];
    if (publicTabs.includes(tab) || data) {
      setActiveTab(tab);
      return;
    }
    alert("Pesquise um tema primeiro para desbloquear esta ferramenta.");
    setActiveTab('search');
  };

  const handleSubjectSearch = (topic: string) => {
    setQuery(topic);
    doSearch(topic);
  };

  useEffect(() => {
      const tema = data?.tema;
      if (tema) {
          const preloadPdfImages = async () => {
              try {
                  const temaUrlSafe = tema;
                  const fetchBase64 = async (prompt: string, w = 800, h = 400) => {
                      const res = await fetch(`/api/proxy-image?prompt=${encodeURIComponent(prompt)}&width=${w}&height=${h}`);
                      if (res.ok) {
                          const json = await res.json();
                          return json.dataUrl;
                      }
                      return '';
                  };

                  const coverPrompt = `${temaUrlSafe} educational realistic diagram illustration`;
                  const summaryPrompt = `${temaUrlSafe} concept art modern flat design`;
                  const mnemonicsPrompt = `memory techniques mind map for ${temaUrlSafe}`;
                  const examplesPrompt = `problem solving practical application ${temaUrlSafe}`;

                  const cover = await fetchBase64(coverPrompt, 1200, 600);
                  const summary = await fetchBase64(summaryPrompt, 800, 300);
                  const mnemonics = await fetchBase64(mnemonicsPrompt, 800, 300);
                  const examples = await fetchBase64(examplesPrompt, 800, 300);

                  setPdfImages({ cover, summary, mnemonics, examples });
              } catch (err) {
                  console.error("Erro no preload de imagens do PDF:", err);
              }
          };
          preloadPdfImages();
      }
  }, [data?.tema]);

  useEffect(() => {
      const topic = data?.topic;
      if (summaryDepth === 'detailed' && topic && !data?.detailedSummary) {
          const fetchDetailedSummary = async () => {
              try {
                  const res = await fetch('/api/generate/summary', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ topic })
                  });
                  const json = await res.json();
                  if (json.content) {
                      setData((prev: any) => ({ ...prev, detailedSummary: json.content }));
                  }
              } catch (e) {
                  console.error('Falha ao gerar resumo longo', e);
              }
          };
          fetchDetailedSummary();
      }
  }, [summaryDepth, data?.topic, data?.detailedSummary]);

  useEffect(() => {
      setIsGeneratingPDF(false);
      setPrintRequest(false);
  }, []);

  const handleDownloadPDF = async () => {
      if (pdfImages && pdfImages.cover) {
          setPrintRequest(true);
          return;
      }

      setIsGeneratingPDF(true);
      try {
          const temaUrlSafe = data?.tema || "estudos";

          const fetchBase64WithRetry = async (prompt: string, w = 800, h = 400, retries = 2): Promise<string> => {
              for (let i = 0; i < retries; i++) {
                  try {
                      const res = await fetch(`/api/proxy-image?prompt=${encodeURIComponent(prompt)}&width=${w}&height=${h}`);
                      if (res.ok) {
                          const json = await res.json();
                          if (json.dataUrl) return json.dataUrl;
                      }
                  } catch (e) {
                      console.error(`Tentativa ${i+1} falhou para o prompt: ${prompt}`, e);
                  }
                  await new Promise(resolve => setTimeout(resolve, 1000));
              }
              return "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'><rect width='100%' height='100%' fill='%231e293b'/><text x='50%' y='50%' font-family='sans-serif' font-size='24' fill='%2364748b' text-anchor='middle' dominant-baseline='middle'>Imagem indisponível</text></svg>";
          };

          const coverPrompt = `${temaUrlSafe} educational realistic diagram illustration`;
          const summaryPrompt = `${temaUrlSafe} concept art modern flat design`;
          const mnemonicsPrompt = `memory techniques mind map for ${temaUrlSafe}`;
          const examplesPrompt = `problem solving practical application ${temaUrlSafe}`;

          const cover = await fetchBase64WithRetry(coverPrompt, 1200, 600);
          const summary = await fetchBase64WithRetry(summaryPrompt, 800, 300);
          const mnemonics = await fetchBase64WithRetry(mnemonicsPrompt, 800, 300);
          const examples = await fetchBase64WithRetry(examplesPrompt, 800, 300);

          setPdfImages({ cover, summary, mnemonics, examples });
          setPrintRequest(true); 
          setIsGeneratingPDF(false); 
      } catch (error) {
          console.error("Erro fatal ao gerar imagens do PDF:", error);
          setPdfImages({ cover: '', summary: '', mnemonics: '', examples: '' });
          setPrintRequest(true);
          setIsGeneratingPDF(false); 
      }
  };

  const handlePDFReady = () => {
      setTimeout(() => {
          window.print();
          setPrintRequest(false);
      }, 300);
  };

  const registerError = (enunciado: string, respostaAluno: string, respostaEsperada: string, causa: string) => {
    const newError = {
      id: `err-${Date.now()}`,
      tema: data?.tema || 'Geral',
      enunciado,
      respostaAluno,
      respostaEsperada,
      causaProvavel: causa,
      createdAt: new Date().toISOString()
    };
    setErrors(prev => [newError, ...prev]);
  };

  const handleFlashcardResult = (fc: any, res: 'correct' | 'incorrect') => {
    const fcId = fc.front;
    const current = flashcardProgress[fcId] || { intervalIndex: -1, ease: 'medio' };
    let nextIndex = current.intervalIndex;
    if (res === 'correct') nextIndex = Math.min(nextIndex + 1, 4);
    else {
      nextIndex = 0;
      registerError(fc.front, 'Falei que errei o card', fc.back, 'Dificuldade de memorização');
    }
    const intervals: Record<string, number[]> = { medio: [1, 3, 7, 15, 30] };
    const daysToAdd = (intervals[current.ease] || intervals.medio)[nextIndex];
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + daysToAdd);
    setFlashcardProgress(prev => ({ ...prev, [fcId]: { ...current, intervalIndex: nextIndex, nextReviewAt: nextReview.toISOString(), lastResult: res } }));
    setStats(prev => ({ ...prev, cardsReviewed: prev.cardsReviewed + 1 }));
  };

  const knowledgeMap = [
    { code: 'EF06CI02', title: 'Células e Organização', mastery: data ? 65 : 0 },
    { code: 'EF06CI04', title: 'Ciclo da Água', mastery: data ? 82 : 0 },
    { code: 'EF06CI07', title: 'Misturas e Separação', mastery: data && data.tema?.includes('mistura') ? 45 : 12 },
  ];

  const srsQueue = Object.keys(flashcardProgress)
    .map(id => ({ front: id, ...flashcardProgress[id] }))
    .filter(item => new Date(item.nextReviewAt) <= new Date());

  return (
    <div className="flex h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#102b6b_0%,#050b1f_35%,#020617_100%)] text-slate-100 font-sans">

      <Sidebar activeTab={activeTab} onNavigate={handleBrandNavigate} />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
          <svg className="absolute w-full h-full text-blue-400 stroke-current fill-none stroke-[0.5]" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMax slice">
            <path d="M100,600 Q250,200 400,600" />
            <path d="M600,600 Q750,100 900,600" />
            <path d="M300,300 L300,100 M200,150 L400,150" />
            <circle cx="850" cy="150" r="30" />
            <path d="M0,600 Q500,550 1000,600" />
          </svg>
        </div>

        <header className={`${activeTab === 'search' ? 'hidden' : 'h-20'} flex items-center justify-end px-12 gap-4 z-20`}>
          <div className="flex items-center gap-6 bg-slate-900/50 border border-white/5 px-6 py-2.5 rounded-full backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-orange-500 fill-orange-500/20" />
              <span className="text-sm font-bold text-slate-200">7 dias de foco</span>
            </div>
            <div className="w-[1px] h-4 bg-white/10"></div>
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-amber-400 fill-amber-400/20" />
              <span className="text-sm font-bold text-slate-200">1250 XP</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-xl overflow-hidden cursor-pointer hover:scale-105 transition-all p-0.5">
            <div className="w-full h-full bg-[#1e293b] rounded-full flex items-center justify-center text-blue-400">
              <Bot size={24} />
            </div>
          </div>
        </header>

        <div ref={contentAreaRef} className={`flex-1 overflow-y-auto ${activeTab === 'search' ? 'px-0' : 'px-5 md:px-12'} pb-20 relative z-10 custom-scrollbar`}>

          {activeTab === 'search' && (
            <DashboardPage
              query={query}
              anoEscolar={anoEscolar}
              loading={loading}
              onQueryChange={setQuery}
              onAnoEscolarChange={setAnoEscolar}
              onSearch={() => doSearch()}
              onSearchTopic={handleSubjectSearch}
              onNavigate={handleBrandNavigate}
              onOpenMenu={() => setMobileDrawerOpen(true)}
            />
          )}

          {activeTab === 'dashboard' && data && (
            <div className="animate-in fade-in duration-500 space-y-10 max-w-5xl mx-auto pt-10">
              <StudyDashboard
                stats={stats}
                srsQueue={srsQueue}
                knowledgeMap={knowledgeMap}
                onAction={(tab) => setActiveTab(tab)}
              />

              {/* Session Footer */}
              <div className="mt-12 flex justify-center pb-12">
                <button
                  onClick={() => setShowDiary(true)}
                  className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-[2rem] transition-all shadow-xl active:scale-95"
                >
                  <CheckCircle2 size={24} />
                  Concluir Sessão de Estudo
                </button>
              </div>
            </div>
          )}

          {activeTab === 'planner' && (
            <div className="animate-in fade-in duration-500 max-w-6xl mx-auto pt-10">
              <InteractiveStudyPlanner />
            </div>
          )}

          {activeTab === 'english' && (
            <div className="animate-in fade-in duration-500 max-w-6xl mx-auto pt-10">
              <EnglishTutorAI />
            </div>
          )}

          {activeTab === 'atualidades' && (
            <div className="animate-in fade-in duration-500 max-w-6xl mx-auto pt-10">
              <CurrentAffairsHub />
            </div>
          )}

          {data && !['search', 'dashboard', 'planner', 'english', 'atualidades'].includes(activeTab) && (
            <div className="animate-in fade-in duration-500 space-y-10 max-w-5xl mx-auto pt-10">
              <header className="flex flex-wrap gap-8 justify-between items-end border-b border-white/5 pb-8">
                <div>
                  <h2 className="text-5xl font-black text-white capitalize tracking-tighter">{data.tema}</h2>
                  <p className="text-blue-400 font-bold mt-2 uppercase text-xs tracking-widest">{data.disciplina}</p>
                </div>
                <div className="flex items-center gap-4">
                  {(['resumo', 'mapa'].includes(activeTab)) && (
                    <button 
                      onClick={handleDownloadPDF} 
                      disabled={isGeneratingPDF}
                      className="bg-white hover:bg-slate-200 disabled:bg-slate-300 text-[#020617] px-8 py-3.5 rounded-2xl font-black flex items-center gap-3 shadow-xl transition-all hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                      {isGeneratingPDF ? (
                        <>
                          <div className="w-5 h-5 border-2 border-[#020617] border-t-transparent rounded-full animate-spin"></div>
                          BUSCANDO IMAGENS...
                        </>
                      ) : (
                        <>
                          <Download size={20} /> EXPORTAR PDF
                        </>
                      )}
                    </button>
                  )}
                </div>
              </header>

              <div className="content-view">
                {activeTab === 'resumo' && (
                  <div className="space-y-6">
                    <div className="flex bg-[#0a1428]/60 p-1.5 rounded-2xl border border-white/5 w-fit">
                      {(['short', 'detailed', 'analytical'] as const).map((depth) => (
                        <button
                          key={depth}
                          onClick={() => setSummaryDepth(depth)}
                          className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all
                                   ${summaryDepth === depth ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}
                                 `}
                        >
                          {depth === 'short' ? 'Rápido' : depth === 'detailed' ? 'Completo' : 'Analítico'}
                        </button>
                      ))}
                    </div>

                    <div ref={contentToPrintRef} className="bg-[#0a1428]/40 border border-white/5 p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">
                      {summaryDepth === 'analytical' ? (
                        <AnalyticalSummary data={data.resumoAnalitico} />
                      ) : (
                        <div className="space-y-6">
                           <TTSPlayer text={summaryDepth === 'short' ? data.shortSummary : (data.detailedSummary || "Gerando resumo extenso...")} />
                           {summaryDepth === 'detailed' && !data.detailedSummary ? (
                               <div className="text-center p-12">
                                  <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                                  <p className="text-blue-400 font-bold animate-pulse">Redigindo páginas de conteúdo ultra profundo sobre {data.topic}...</p>
                               </div>
                           ) : (
                               <RenderizarMarkdown rawText={summaryDepth === 'short' ? data.shortSummary : data.detailedSummary} />
                           )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {activeTab === 'memorizacao' && (
                  <MemoryTechniques topic={data.topic} shortSummary={data.shortSummary} mnemonicos={data.mnemonicos} parodias={data.parodias} audioScript={data.audioScript} podcastScript={data.podcastScript} />
                )}
                {activeTab === 'turbo' && (
                  <TurboStudyMode plan={data.modoTurbo} />
                )}
                {activeTab === 'recall' && (
                  <div className="max-w-4xl mx-auto py-6">
                    <BlankPageRecall topic={data.topic} />
                  </div>
                )}
                {activeTab === 'como-resolver' && (
                  <WorkedExamples topic={data.topic} disciplina={data.disciplina} />
                )}
                {activeTab === 'jornada' && (
                  <StudyPlan7Days plan={data.studyPlan7Days} />
                )}
                {activeTab === 'vespera' && (
                  <ExamEveMode onAction={(act) => setActiveTab(act)} />
                )}
                {activeTab === 'flashcards' && (
                  <FlashcardContainer topic={data.topic} flashcards={data.flashcards} onResult={handleFlashcardResult} />
                )}
                {activeTab === 'quiz' && (
                  <div className="max-w-3xl mx-auto">
                    <QuizContainer topic={data.topic} initialQuestions={data.questions} onIncorrectAnswer={(q, ans) => registerError(q.enunciado, ans, q.correta, q.explicacao)} />
                  </div>
                )}
                {activeTab === 'mapa' && (
                  <div className="w-full">
                     <InteractiveMindMap data={data.mindMap} />
                  </div>
                )}
                {activeTab === 'tutor' && (
                  <ChatTutor initialData={data} mode={tutorMode} onModeChange={setTutorMode} />
                )}
                {activeTab === 'fontes' && (
                  <SourceExplorer sources={data.fontes} />
                )}
                {activeTab === 'erros' && (
                  <ErrorNotebook 
                    errors={errors} 
                    onRemove={(id) => setErrors(e => e.filter(err => err.id !== id))}
                    onClearAll={() => setErrors([])}
                    onExplainError={() => {
                       setActiveTab('tutor');
                       setTutorMode('correcao');
                    }}
                  />
                )}
              </div>
            </div>
          )}

        </div>
      </main>

      {showDiary && (
        <MetacognitiveDiary
          onClose={() => setShowDiary(false)}
          onSave={() => {
            setStats(prev => ({ ...prev, sessions: prev.sessions + 1 }));
            setShowDiary(false);
          }}
        />
      )}

      <MobileDrawer
        open={mobileDrawerOpen}
        activeTab={activeTab}
        onClose={() => setMobileDrawerOpen(false)}
        onNavigate={handleBrandNavigate}
      />
      <MobileBottomNav activeTab={activeTab} onNavigate={handleBrandNavigate} />

      {/* Mini Player de Foco embutido */}
      <FocusPlayer />

      {/* COMPONENTE DE EXPORTAÇÃO PREMIUM */}
      <PrintablePDF data={data} isRequested={printRequest} onReady={handlePDFReady} images={pdfImages} />
    </div>
  );
}
