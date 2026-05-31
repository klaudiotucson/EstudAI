import React, { useState, useEffect } from 'react';
import { markdownToSafeHtml } from '@/lib/safeMarkdown';

interface PrintablePDFProps {
    data: any;
    isRequested: boolean;
    onReady: () => void;
    images?: {
        cover: string;
        summary: string;
        mnemonics: string;
        examples: string;
    } | null;
}

export default function PrintablePDF({ data, isRequested, onReady, images }: PrintablePDFProps) {
    const [loadedImages, setLoadedImages] = useState(0);

    const hasMnemonicos = data?.mnemonicos && data.mnemonicos.length > 0;
    const hasExamples = data?.workedExamples && data.workedExamples.length > 0;
    
    // Total de imagens: capa + resumo + (mnemonicos se houver) + (exemplos se houver)
    const totalImages = 2 + (hasMnemonicos ? 1 : 0) + (hasExamples ? 1 : 0);

    useEffect(() => {
        if (!isRequested) setLoadedImages(0);
    }, [isRequested]);

    // Se temos imagens base64 prontas, acionamos o print imediatamente após a montagem
    useEffect(() => {
        if (isRequested && images && images.cover) {
            const timer = setTimeout(() => {
                onReady();
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isRequested, images, onReady]);

    useEffect(() => {
        if (isRequested && !images && loadedImages >= totalImages) {
            onReady();
        }
    }, [loadedImages, isRequested, totalImages, onReady, images]);

    if (!data || !isRequested) return null;

    const handleImageLoad = () => setLoadedImages(prev => prev + 1);
    const handleImageError = () => setLoadedImages(prev => prev + 1);

    const renderMarkdown = (text: string) => {
        const html = markdownToSafeHtml(text || '');
        return <div className="prose prose-lg max-w-none prose-h1:text-3xl prose-h2:text-2xl prose-h2:border-b-2 prose-h2:border-slate-200 prose-h2:pb-2 prose-h3:text-xl text-slate-800" dangerouslySetInnerHTML={{ __html: html }} />;
    };

    const temaUrlSafe = encodeURIComponent(data.tema || "estudos");
    const coverUrl = `https://image.pollinations.ai/prompt/${temaUrlSafe}%20educational%20realistic%20diagram%20illustration?width=1200&height=600&nologo=true`;
    const summaryUrl = `https://image.pollinations.ai/prompt/${temaUrlSafe}%20concept%20art%20modern%20flat%20design?width=800&height=300&nologo=true`;
    const mnemonicsUrl = `https://image.pollinations.ai/prompt/memory%20techniques%20mind%20map%20for%20${temaUrlSafe}?width=800&height=300&nologo=true`;
    const examplesUrl = `https://image.pollinations.ai/prompt/problem%20solving%20practical%20application%20${temaUrlSafe}?width=800&height=300&nologo=true`;

    const coverImg = images?.cover || coverUrl;
    const summaryImg = images?.summary || summaryUrl;
    const mnemonicsImg = images?.mnemonics || mnemonicsUrl;
    const examplesImg = images?.examples || examplesUrl;

    return (
        <div className="hidden print:block bg-white text-black min-h-screen font-serif absolute top-0 left-0 w-full z-[9999] p-8">
            
            {/* CAPA */}
            <div className="flex flex-col items-center justify-center min-h-[900px] border-8 border-slate-900 p-12 text-center relative break-after-page">
                <img src="/brand/logo.png" alt="Logo estudAI" className="mb-8 h-32 w-32 object-contain" />
                <h1 className="text-6xl font-black mb-6 uppercase tracking-tighter text-slate-900 leading-tight">
                    {data.tema}
                </h1>
                <div className="w-24 h-2 bg-blue-600 mb-12"></div>
                <p className="text-2xl font-medium text-slate-600 mb-16 uppercase tracking-widest">{data.disciplina}</p>
                
                <div className="w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-900">
                    <img onLoad={handleImageLoad} onError={handleImageError} src={coverImg} alt={`Capa ilustrativa de ${data.tema}`} className="w-full h-[400px] object-cover grayscale-[20%] contrast-125" />
                </div>
                
                <div className="absolute bottom-12 left-0 w-full text-center">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Material de Estudo Gerado por Inteligência Artificial</p>
                </div>
            </div>

            {/* CABEÇALHO PADRÃO NAS DEMAIS PÁGINAS */}
            <style dangerouslySetInnerHTML={{__html: `
                @page { margin: 20mm; }
                @media print {
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white; }
                    #app-root { display: none !important; } /* Ocultar app normal */
                }
            `}} />

            {/* CONTEÚDO: Resumo */}
            <div className="max-w-4xl mx-auto py-10">
                <header className="border-b-4 border-slate-900 pb-6 mb-12 flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">{data.tema}</h2>
                        <p className="text-lg font-bold text-blue-600 mt-2 uppercase tracking-widest">Resumo Completo</p>
                    </div>
                    <img src="/brand/logo.png" alt="Logo estudAI" className="h-16 w-16 object-contain" />
                </header>

                <div className="mb-10">
                    <img onLoad={handleImageLoad} onError={handleImageError} src={summaryImg} alt={`Ilustração do Resumo de ${data.tema}`} className="w-full h-64 object-cover rounded-3xl shadow-xl border-2 border-slate-200 mb-10" />
                    {renderMarkdown(data.detailedSummary || data.shortSummary)}
                </div>

                {/* Mnemônicos se houver */}
                {data.mnemonicos && data.mnemonicos.length > 0 && (
                    <div className="mt-16 break-before-page">
                        <header className="border-b-4 border-slate-900 pb-6 mb-12 flex justify-between items-end">
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Mnemônicos e Dicas</h2>
                        </header>
                        
                        <img onLoad={handleImageLoad} onError={handleImageError} src={mnemonicsImg} alt="Dicas Visuais" className="w-full h-48 object-cover rounded-3xl shadow-md border-2 border-slate-200 mb-10" />
                        
                        <div className="grid grid-cols-2 gap-8">
                            {data.mnemonicos.map((m: any, i: number) => (
                                <div key={i} className="border-2 border-slate-300 rounded-3xl p-6 bg-slate-50">
                                    <h3 className="text-3xl font-black text-slate-900 mb-2">{m.sigla}</h3>
                                    {m.frase && <p className="text-xl font-bold italic text-slate-700 mb-4">"{m.frase}"</p>}
                                    <p className="text-sm text-slate-600 font-medium">{m.significado}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Exercícios Resolvidos se houver */}
                {data.workedExamples && data.workedExamples.length > 0 && (
                    <div className="mt-16 break-before-page">
                        <header className="border-b-4 border-slate-900 pb-6 mb-12 flex justify-between items-end">
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Problemas Práticos Resolvidos</h2>
                        </header>
                        
                        <img onLoad={handleImageLoad} onError={handleImageError} src={examplesImg} alt="Resolução de Problemas" className="w-full h-48 object-cover rounded-3xl shadow-md border-2 border-slate-200 mb-10" />
                        
                        <div className="space-y-12">
                            {data.workedExamples.map((ex: any, i: number) => (
                                <div key={i} className="border-l-4 border-blue-600 pl-8 py-2">
                                    <h4 className="text-2xl font-bold text-slate-900 mb-6">{ex.problema}</h4>
                                    <div className="space-y-4">
                                        {ex.passos.map((p: any, j: number) => (
                                            <div key={j} className="flex gap-4">
                                                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0">{j + 1}</div>
                                                <div>
                                                    <p className="text-lg font-bold text-slate-800">{p.passo}</p>
                                                    <p className="text-sm text-slate-600 mt-1 italic">{p.explicacao}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            {/* RODAPÉ */}
            <div className="fixed bottom-0 left-0 w-full text-center py-4 border-t border-slate-200 text-xs text-slate-400 font-bold tracking-widest bg-white">
                DOCUMENTO GERADO VIA ESTUDIA PREMIUM • {new Date().toLocaleDateString('pt-BR')}
            </div>
        </div>
    );
}
