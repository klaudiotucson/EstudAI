"use client";
import React, { useState, useEffect } from 'react';
import { Network, Info, X, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

interface MindMapNode {
    title: string;
    description: string;
    children?: MindMapNode[];
}

interface InteractiveMindMapProps {
    data: MindMapNode;
}

const TreeNode = ({ node, level = 0, onSelect, selectedNode }: { node: MindMapNode, level?: number, onSelect: (n: MindMapNode) => void, selectedNode: MindMapNode | null }) => {
    // Cores vibrantes baseadas na profundidade
    const bgColors = [
        'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]', 
        'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]', 
        'bg-emerald-600 shadow-[0_0_15px_rgba(5,150,105,0.4)]', 
        'bg-purple-600 shadow-[0_0_15px_rgba(147,51,234,0.4)]', 
        'bg-pink-600 shadow-[0_0_15px_rgba(219,39,119,0.4)]'
    ];
    const bgColorClass = bgColors[level % bgColors.length];
    
    const isSelected = selectedNode?.title === node.title;

    return (
        <div className="flex items-center gap-6 my-4 relative">
            {/* Linha conectando com o pai (só aparece do nível 1 em diante) */}
            {level > 0 && (
                <div className="absolute -left-6 top-1/2 w-6 h-[2px] bg-white/20"></div>
            )}
            
            {/* O Card do Nó */}
            <div 
                onClick={() => onSelect(node)}
                className={`relative z-10 px-6 py-4 rounded-2xl cursor-pointer transition-all flex flex-col items-center gap-2 min-w-[140px] max-w-[220px] text-center border-2 
                ${bgColorClass} 
                ${isSelected ? 'scale-110 border-white ring-4 ring-white/20 z-20' : 'border-white/10 hover:border-white/50 hover:scale-105'}`}
            >
                <span className="text-sm font-black text-white leading-tight">{node.title}</span>
                <Info size={14} className="text-white/70" />
            </div>

            {/* Filhos (Recursividade) */}
            {node.children && node.children.length > 0 && (
                <div className="flex flex-col relative border-l-2 border-white/20 pl-6 py-2">
                    {/* Linha que sai do nó atual para a barra vertical dos filhos */}
                    <div className="absolute -left-[2px] top-1/2 w-6 h-[2px] bg-white/20"></div>
                    
                    {node.children.map((child, i) => (
                        <TreeNode key={i} node={child} level={level + 1} onSelect={onSelect} selectedNode={selectedNode} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function InteractiveMindMap({ data }: InteractiveMindMapProps) {
    const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);
    const [zoom, setZoom] = useState(1);
    
    // Auto-selecionar o nó raiz na inicialização
    useEffect(() => {
        if (data && !selectedNode) {
            setSelectedNode(data);
        }
    }, [data]);

    if (!data || !data.title) {
        return (
            <div className="bg-[#0a1428]/40 border border-white/5 p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl flex justify-center items-center h-64 text-slate-500 italic">
                Nenhum mapa mental interativo gerado para este tópico ainda. Faça uma nova busca.
            </div>
        );
    }

    return (
        <div className="relative w-full h-[600px] md:h-[700px] bg-[#0a1428] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col">
            
            {/* Toolbar */}
            <div className="absolute top-6 left-6 z-40 flex items-center gap-2 bg-slate-900/80 backdrop-blur border border-white/10 p-2 rounded-2xl shadow-xl">
                <button onClick={() => setZoom(z => Math.min(z + 0.2, 2))} className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-colors" title="Zoom In">
                    <ZoomIn size={18} />
                </button>
                <button onClick={() => setZoom(1)} className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-colors" title="Reset Zoom">
                    <Maximize size={18} />
                </button>
                <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-colors" title="Zoom Out">
                    <ZoomOut size={18} />
                </button>
            </div>

            {/* Canvas de Arrastar/Scroll */}
            <div className="flex-1 overflow-auto p-12 md:p-24 custom-scrollbar relative" style={{ cursor: 'grab' }}>
                <div 
                    className="min-w-max flex items-center justify-start min-h-full transition-transform duration-300 origin-left"
                    style={{ transform: `scale(${zoom})` }}
                >
                    <TreeNode node={data} onSelect={setSelectedNode} selectedNode={selectedNode} />
                </div>
            </div>

            {/* Painel Lateral flutuante estilo Modal para o Nó Selecionado */}
            <div className={`absolute top-6 right-6 bottom-6 w-80 md:w-96 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] transform transition-all duration-500 z-50 flex flex-col ${selectedNode ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0 pointer-events-none'}`}>
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                            <Network className="text-blue-400" size={18} />
                        </div>
                        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Detalhes do Ramo</h4>
                    </div>
                    <button onClick={() => setSelectedNode(null)} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 hover:scale-110 transition-all">
                        <X size={16} />
                    </button>
                </div>
                
                <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
                    {selectedNode && (
                        <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                            <h2 className="text-3xl font-black text-white leading-tight">{selectedNode.title}</h2>
                            <div className="w-12 h-1.5 bg-blue-500 rounded-full"></div>
                            
                            <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5">
                                <p className="text-slate-300 leading-relaxed text-lg font-medium">
                                    {selectedNode.description || "Nenhuma descrição adicional para este ponto."}
                                </p>
                            </div>
                            
                            {selectedNode.children && selectedNode.children.length > 0 && (
                                <div className="mt-8">
                                    <h5 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Tópicos Conectados:</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedNode.children.map((child, idx) => (
                                            <button 
                                                key={idx}
                                                onClick={() => setSelectedNode(child)}
                                                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-colors"
                                            >
                                                {child.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
