"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "Por que usar o dnnr.dev?",
    a: "Criado por devs para devs: sem anúncios intrusivos, sem coleta de dados, sem cadastro obrigatório. Todas as ferramentas funcionam direto no browser, então você tem resultados instantâneos sem depender de uma conexão ou de um servidor externo.",
  },
  {
    q: "Meus dados são enviados para algum servidor?",
    a: "Não. Todo o processamento acontece localmente no seu navegador. Segredos de API, senhas, JSONs confidenciais e quaisquer outros dados que você inserir nunca saem da sua máquina — exceto nas ferramentas de armazenamento intencional (To-Do e Bookmarks), que sincronizam apenas com sua conta caso você esteja logado.",
  },
  {
    q: "Preciso criar uma conta para usar as ferramentas?",
    a: "Não. A grande maioria das ferramentas funciona sem nenhum cadastro. Criar uma conta é opcional e serve apenas para sincronizar dados entre dispositivos em ferramentas como To-Do e Bookmarks.",
  },
  {
    q: "As ferramentas funcionam offline?",
    a: "Sim! Uma vez carregada a página, ferramentas como Base64, URI Encoder, JSON Validator, Diff Checker e outras funcionam completamente offline. Apenas funcionalidades com sincronização em nuvem exigem conexão.",
  },
  {
    q: "Com que frequência novas ferramentas são adicionadas?",
    a: "O dnnr.dev é desenvolvido ativamente. Novas ferramentas são adicionadas conforme a necessidade dos usuários e da comunidade. Se você tem uma sugestão, pode entrar em contato!",
  },
  {
    q: "As ferramentas são gratuitas?",
    a: "Sim, completamente gratuitas. O objetivo do dnnr.dev é ser um recurso acessível para todos os desenvolvedores, sem planos pagos ou funcionalidades ocultas.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="flex flex-col gap-3 mt-12">
      <div className="flex items-center gap-4">
        <h2 className="whitespace-nowrap text-xl font-semibold text-zinc-100">
          Perguntas Frequentes
        </h2>
        <div className="h-px w-full bg-gradient-to-r from-zinc-800 to-transparent" />
      </div>
      <span className="text-sm text-zinc-500 mb-4">
        Respostas rápidas para as dúvidas mais comuns sobre o tools.dnnr.dev. 
        Nosso objetivo é tornar o uso das ferramentas simples e direto, 
        então reunimos aqui tudo o que você precisa saber — Se ainda restar alguma dúvida, 
        você pode explorar as ferramentas livremente ou entrar em contato para saber mais.
      </span>
      <div className="flex flex-col divide-y divide-zinc-800/60 overflow-hidden">
        {FAQ_ITEMS.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-0 py-3 text-left transition-colors hover:bg-zinc-900/40"
            >
              <span className="text-sm font-medium text-zinc-200">{item.q}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 ${
                  open === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {open === i && (
              <p className="px-4 pb-4 pt-1 text-xs leading-relaxed text-zinc-500">
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
