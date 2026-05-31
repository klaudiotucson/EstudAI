"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Bell, BookOpen, Calendar, CheckCircle2, Flame, Pause, Play, RotateCcw, Target, Zap } from "lucide-react";
import { criarPlanoEstudosInterativo } from "@/lib/funcoes-planejamento-interativo";

const defaultSubjects = [
  { nome: "Matematica", conteudos: "porcentagem, equacoes, geometria", dificuldade: 4, prioridade: 5, dominio: 0.45 },
  { nome: "Portugues", conteudos: "interpretacao, gramatica, redacao", dificuldade: 3, prioridade: 4, dominio: 0.6 },
  { nome: "Ciencias", conteudos: "materia, energia, ambiente", dificuldade: 3, prioridade: 4, dominio: 0.55 },
  { nome: "Fisica", conteudos: "cinematica, dinamica, eletricidade", dificuldade: 4, prioridade: 4, dominio: 0.4 },
  { nome: "Quimica", conteudos: "estequiometria, solucoes, organica", dificuldade: 4, prioridade: 4, dominio: 0.42 },
  { nome: "Biologia", conteudos: "citologia, genetica, ecologia", dificuldade: 3, prioridade: 4, dominio: 0.5 }
];

export default function InteractiveStudyPlanner() {
  const [anoEscolar, setAnoEscolar] = useState("6o ano ao Ensino Medio, ENEM e preparatorios");
  const [periodo, setPeriodo] = useState("bimestre");
  const [semanas, setSemanas] = useState(8);
  const [horasSemana, setHorasSemana] = useState(8);
  const [perfilFoco, setPerfilFoco] = useState("normal");
  const [intensidade, setIntensidade] = useState("equilibrado");
  const [subjects, setSubjects] = useState(defaultSubjects);
  const [examSubject, setExamSubject] = useState("Matematica");
  const [examDate, setExamDate] = useState("");
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [completedBlocks, setCompletedBlocks] = useState<Record<string, boolean>>({});
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);

  const plan = useMemo(() => criarPlanoEstudosInterativo({
    nome: "Plano premium de estudos",
    anoEscolar,
    periodo,
    semanas,
    horasSemana,
    perfilFoco,
    intensidade,
    disciplinas: subjects.map((subject) => ({
      ...subject,
      conteudos: subject.conteudos.split(",").map((item) => item.trim()).filter(Boolean)
    })),
    provas: examDate ? [{ disciplina: examSubject, data: examDate, peso: 1 }] : []
  } as any), [anoEscolar, periodo, semanas, horasSemana, perfilFoco, intensidade, subjects, examDate, examSubject]);

  useEffect(() => {
    setTimerSeconds((plan.cronometro.focus || 25) * 60);
  }, [plan.cronometro.focus]);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = window.setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          if (remindersEnabled && "Notification" in window && Notification.permission === "granted") {
            new Notification("Bloco concluido", { body: "Hora de registrar o que aprendeu e fazer uma pausa." });
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [timerRunning, remindersEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem("estuda_ai_study_plan", JSON.stringify({ anoEscolar, periodo, semanas, horasSemana, perfilFoco, intensidade, subjects, examSubject, examDate, completedBlocks }));
    } catch (error) {
      console.error("Falha ao salvar plano", error);
    }
  }, [anoEscolar, periodo, semanas, horasSemana, perfilFoco, intensidade, subjects, examSubject, examDate, completedBlocks]);

  const completedCount = Object.values(completedBlocks).filter(Boolean).length;
  const totalBlocks = plan.resumo.totalBlocos || 1;
  const completionRate = Math.round((completedCount / totalBlocks) * 100);
  const minutes = Math.floor(timerSeconds / 60).toString().padStart(2, "0");
  const seconds = (timerSeconds % 60).toString().padStart(2, "0");

  const requestNotifications = async () => {
    if (!("Notification" in window)) {
      setRemindersEnabled(true);
      return;
    }
    const permission = await Notification.requestPermission();
    setRemindersEnabled(permission === "granted");
  };

  const updateSubject = (index: number, field: string, value: string | number) => {
    setSubjects((prev) => prev.map((subject, subjectIndex) => (
      subjectIndex === index ? { ...subject, [field]: value } : subject
    )));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <section className="rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-slate-900 to-slate-950 p-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-blue-300 font-black">Planner premium</p>
            <h2 className="text-3xl font-black text-white mt-2">Plano de estudos interativo</h2>
            <p className="text-slate-400 mt-3 max-w-3xl">
              Divide tempo por disciplina, prova, dificuldade e dominio. O plano usa foco intervalado, revisao espacada,
              caderno de erros, simulados curtos e lembretes para manter constancia.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 min-w-48">
            <p className="text-slate-500 text-xs">Conclusao</p>
            <p className="text-3xl font-black text-emerald-300">{completionRate}%</p>
            <div className="h-2 bg-slate-800 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-emerald-400" style={{ width: `${completionRate}%` }} />
            </div>
          </div>
        </div>
      </section>

      <section className="grid xl:grid-cols-[360px_1fr] gap-5">
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <h3 className="font-black text-white flex items-center gap-2"><Calendar size={18} /> Configurar plano</h3>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <label className="space-y-1">
                <span className="text-xs text-slate-500 font-bold">Ano</span>
                <select value={anoEscolar} onChange={(e) => setAnoEscolar(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm">
                  <option>6o ano</option>
                  <option>7o ano</option>
                  <option>8o ano</option>
                  <option>9o ano</option>
                  <option>1o ano EM</option>
                  <option>2o ano EM</option>
                  <option>3o ano EM</option>
                  <option>ENEM</option>
                  <option>Pre-militar fundamental</option>
                  <option>Pre-militar medio</option>
                  <option>ITA/IME</option>
                  <option>Concursos nivel fundamental</option>
                  <option>Concursos nivel medio</option>
                  <option>6o ano ao Ensino Medio, ENEM e preparatorios</option>
                </select>
              </label>
              <label className="space-y-1">
                <span className="text-xs text-slate-500 font-bold">Periodo</span>
                <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm">
                  <option value="semana">semana</option>
                  <option value="bimestre">bimestre</option>
                  <option value="trimestre">trimestre</option>
                  <option value="prova">prova</option>
                </select>
              </label>
              <label className="space-y-1">
                <span className="text-xs text-slate-500 font-bold">Semanas</span>
                <input type="number" min={1} max={20} value={semanas} onChange={(e) => setSemanas(Number(e.target.value))} className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm" />
              </label>
              <label className="space-y-1">
                <span className="text-xs text-slate-500 font-bold">Horas/semana</span>
                <input type="number" min={1} max={40} value={horasSemana} onChange={(e) => setHorasSemana(Number(e.target.value))} className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm" />
              </label>
              <label className="space-y-1">
                <span className="text-xs text-slate-500 font-bold">Foco</span>
                <select value={perfilFoco} onChange={(e) => setPerfilFoco(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm">
                  <option value="normal">normal</option>
                  <option value="disperso">disperso</option>
                  <option value="leitura">leitura</option>
                  <option value="prova">prova</option>
                </select>
              </label>
              <label className="space-y-1">
                <span className="text-xs text-slate-500 font-bold">Intensidade</span>
                <select value={intensidade} onChange={(e) => setIntensidade(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm">
                  <option value="leve">leve</option>
                  <option value="equilibrado">equilibrado</option>
                  <option value="turbo">turbo</option>
                  <option value="prova">prova</option>
                </select>
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <h3 className="font-black text-white flex items-center gap-2"><Target size={18} /> Prova ou teste</h3>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <input value={examSubject} onChange={(e) => setExamSubject(e.target.value)} className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm" placeholder="Disciplina" />
              <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm" />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <h3 className="font-black text-white flex items-center gap-2"><Flame size={18} /> Cronometro configuravel</h3>
            <div className="text-center my-5">
              <p className="text-xs text-slate-500 font-bold">{plan.cronometro.label}</p>
              <p className="text-6xl font-black text-white tracking-tight">{minutes}:{seconds}</p>
              <p className="text-xs text-slate-500 mt-2">{plan.cronometro.focus} min foco / {plan.cronometro.shortBreak} min pausa</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => setTimerRunning(true)} className="rounded-xl bg-emerald-500 text-white py-3 font-black flex items-center justify-center gap-2"><Play size={16} /> Start</button>
              <button onClick={() => setTimerRunning(false)} className="rounded-xl bg-slate-800 text-slate-200 py-3 font-black flex items-center justify-center gap-2"><Pause size={16} /> Pausa</button>
              <button onClick={() => { setTimerRunning(false); setTimerSeconds(plan.cronometro.focus * 60); }} className="rounded-xl bg-slate-800 text-slate-200 py-3 font-black flex items-center justify-center gap-2"><RotateCcw size={16} /> Reset</button>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid md:grid-cols-4 gap-3">
            {[
              ["Horas", plan.resumo.totalHoras],
              ["Blocos", plan.resumo.totalBlocos],
              ["Disciplinas", plan.resumo.disciplinas],
              ["Provas", plan.resumo.provas]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                <p className="text-slate-500 text-xs font-bold">{label}</p>
                <p className="text-2xl font-black text-white mt-1">{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <h3 className="font-black text-white flex items-center gap-2"><BookOpen size={18} /> Disciplinas e conteudos</h3>
            <div className="space-y-3 mt-4">
              {subjects.map((subject, index) => (
                <div key={index} className="grid md:grid-cols-[1fr_2fr_80px_80px] gap-2">
                  <input value={subject.nome} onChange={(e) => updateSubject(index, "nome", e.target.value)} className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm" />
                  <input value={subject.conteudos} onChange={(e) => updateSubject(index, "conteudos", e.target.value)} className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm" />
                  <input type="number" min={1} max={5} value={subject.dificuldade} onChange={(e) => updateSubject(index, "dificuldade", Number(e.target.value))} className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm" title="Dificuldade" />
                  <input type="number" min={1} max={5} value={subject.prioridade} onChange={(e) => updateSubject(index, "prioridade", Number(e.target.value))} className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm" title="Prioridade" />
                </div>
              ))}
              <button onClick={() => setSubjects((prev) => [...prev, { nome: "Nova disciplina", conteudos: "conteudo 1, conteudo 2", dificuldade: 3, prioridade: 3, dominio: 0.5 }])} className="rounded-xl border border-blue-500/30 text-blue-300 px-4 py-2 text-sm font-bold">
                Adicionar disciplina
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-black text-white flex items-center gap-2"><Calendar size={18} /> Linha do tempo</h3>
              <button onClick={requestNotifications} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-black text-white flex items-center gap-2">
                <Bell size={16} /> {remindersEnabled ? "Lembretes ativos" : "Ativar lembretes"}
              </button>
            </div>
            <div className="space-y-4 mt-5">
              {plan.planoSemanal.map((week: any) => (
                <div key={week.semana} className="rounded-2xl bg-slate-950/70 border border-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-blue-300 text-sm font-black">Semana {week.semana}</p>
                      <p className="text-slate-500 text-xs">{week.foco} - {week.minutos} min</p>
                    </div>
                    <span className="text-[11px] text-emerald-300 font-bold">{week.fechamento}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3 mt-3">
                    {week.blocos.slice(0, 6).map((block: any) => (
                      <button
                        key={block.id}
                        onClick={() => setCompletedBlocks((prev) => ({ ...prev, [block.id]: !prev[block.id] }))}
                        className={`text-left rounded-xl border p-3 transition-all ${completedBlocks[block.id] ? "bg-emerald-500/10 border-emerald-400/40" : "bg-slate-900 border-white/5 hover:border-blue-400/40"}`}
                      >
                        <div className="flex items-start gap-2">
                          <CheckCircle2 size={16} className={completedBlocks[block.id] ? "text-emerald-300" : "text-slate-600"} />
                          <div>
                            <p className="text-sm font-black text-white">{block.disciplina}: {block.conteudo}</p>
                            <p className="text-xs text-slate-400 mt-1">{block.tecnica}</p>
                            <p className="text-[11px] text-slate-500 mt-2">{block.tarefa}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
              <h3 className="font-black text-white flex items-center gap-2"><Zap size={18} /> Tecnicas aplicadas</h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {plan.tecnicas.map((tecnica: string) => (
                  <span key={tecnica} className="rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs text-blue-200 font-bold">{tecnica}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
              <h3 className="font-black text-white flex items-center gap-2"><Bell size={18} /> Proximos lembretes</h3>
              <div className="space-y-2 mt-4">
                {plan.lembretes.slice(0, 5).map((reminder: any) => (
                  <div key={reminder.id} className="rounded-xl bg-slate-950/70 border border-white/5 p-3">
                    <p className="text-sm text-white font-bold">{reminder.titulo}</p>
                    <p className="text-xs text-slate-500">{reminder.quando} - {reminder.antecedencia}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
