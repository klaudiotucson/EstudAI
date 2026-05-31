"use client";
import React from 'react';

interface IllustratedPdfProps {
  plano: any;
}

export default function IllustratedPdf({ plano }: IllustratedPdfProps) {
  if (!plano) return <p className="text-slate-400">Plano de PDF ilustrado ainda não disponível.</p>;

  return (
    <div className="space-y-6">
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-violet-400 font-bold mb-2">PDF ilustrado</p>
        <h3 className="text-2xl font-black text-slate-100">{plano.title}</h3>
        <p className="text-slate-400 mt-2">Arquivo sugerido: {plano.suggestedFileName}</p>
        <p className="text-emerald-300 text-sm mt-3">Inclui imagens educativas, legendas, texto alternativo, exercícios, gabarito, fontes e vídeos.</p>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        {(plano.images || []).map((image: any) => (
          <figure key={image.id} className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
            {image.imageUrl && (
              <img src={image.imageUrl} alt={image.altText} className="w-full h-56 object-cover bg-slate-800" />
            )}
            <figcaption className="p-4">
              <p className="font-bold text-slate-100">{image.title}</p>
              <p className="text-sm text-slate-400 mt-1">{image.caption}</p>
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h4 className="font-bold text-slate-100 mb-4">Estrutura do PDF</h4>
        <div className="grid md:grid-cols-2 gap-3">
          {(plano.sections || []).map((section: any) => (
            <div key={section.id} className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 text-sm text-slate-300">
              {section.title}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
