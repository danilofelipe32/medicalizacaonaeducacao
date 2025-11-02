import React, { useEffect, useRef, useState } from 'react';
import { encontrosData } from './constants';
import { BookOpenIcon, BeakerIcon, AcademicCapIcon, ShareIcon, CheckIcon } from './components/icons';
import { TimelineItem } from './components/TimelineItem';
import { Encontro } from './types';
import { TimelineModal } from './components/TimelineModal';
import { SectionCard } from './components/SectionCard';

const Header = () => {
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href')?.substring(1);
    if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
  };

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sky-950/50 backdrop-blur-lg border-b border-sky-800/50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" onClick={handleHomeClick} className="font-bold text-lg text-white hover:text-sky-300 transition-colors">
          Medicalização na Educação
        </a>
        <nav>
          <ul className="flex items-center space-x-6 text-sm font-medium">
            <li><a href="#pesquisa" onClick={handleNavClick} className="text-slate-300 hover:text-sky-300 transition-colors">A Pesquisa</a></li>
            <li><a href="#metodologia" onClick={handleNavClick} className="text-slate-300 hover:text-sky-300 transition-colors">Metodologia</a></li>
            <li><a href="#resultados" onClick={handleNavClick} className="text-slate-300 hover:text-sky-300 transition-colors">Resultados</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};


const Hero = () => {
  const parallaxBgRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isBgLoaded, setIsBgLoaded] = useState(false);
  const [isTitleAnimated, setIsTitleAnimated] = useState(false);

  const imageUrl = "https://i.imgur.com/p9ifsEn.jpg";

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxBgRef.current) {
        const offsetY = window.scrollY;
        parallaxBgRef.current.style.transform = `translateY(${offsetY * 0.5}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setTimeout(() => setIsBgLoaded(true), 200);
    };

    const timer = setTimeout(() => setIsTitleAnimated(true), 100);


    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [imageUrl]);

  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: 'Confira esta pesquisa sobre o Fenômeno da Medicalização da Educação.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Erro ao compartilhar:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-slate-900">
      <div
        ref={parallaxBgRef}
        className={`absolute top-0 left-0 w-full h-full bg-cover bg-center z-0 transition-all duration-1000 ease-in-out ${isBgLoaded ? 'blur-none scale-100' : 'blur-md scale-110'}`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent z-0"></div>
      
      <button
        onClick={handleShare}
        className="absolute top-24 right-6 z-20 p-3 rounded-full bg-sky-900/40 text-sky-200 backdrop-blur-sm border border-sky-800/50 hover:bg-sky-800/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 transition-all duration-300 transform hover:scale-110"
        aria-label={isCopied ? 'Link copiado!' : 'Compartilhar página'}
      >
        {isCopied ? (
          <CheckIcon className="w-6 h-6" />
        ) : (
          <ShareIcon className="w-6 h-6" />
        )}
      </button>

      <div className="relative text-center z-10 animate-fade-in-up">
        <div className="flex justify-center items-center mb-1">
          <img src="https://i.imgur.com/Qyy3QUT.png" alt="Logos UFRN, PPGEEsp e PPGed" className="h-24 w-auto relative top-7" />
        </div>
        <h1 className={`mt-10 text-3xl md:text-5xl font-extrabold text-white tracking-tight text-glow transition-transform duration-1000 ease-out ${isTitleAnimated ? 'scale-100' : 'scale-95'}`}>
          Problematizações sobre o Fenômeno da Medicalização da Educação
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
          Um curso de formação continuada em serviço para professores e equipe pedagógica de uma escola estadual de Parnamirim/RN.
        </p>
        <p className="mt-4 text-md text-slate-400">
          Pesquisa de Kessiane Sales Izidim da Silva
        </p>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-6 h-10 border-2 border-sky-300 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-sky-300 rounded-full animate-bounce"></div>
        </div>
        <p className="text-sky-300 text-xs tracking-wider">Role para baixo</p>
      </div>
    </section>
  );
};

const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode, id?: string }> = ({ icon, title, children, id }) => (
    <section id={id} className="container mx-auto px-6 py-16 scroll-mt-20">
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-sky-300 bg-sky-900/30 rounded-full border border-sky-700/50">
                {icon}
            </div>
            <h2 className="text-4xl font-bold text-white text-glow">
                {title}
            </h2>
        </div>
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-1">
            {children}
        </div>
    </section>
);

const Timeline: React.FC<{ encontros: Encontro[]; onItemClick: (encontro: Encontro) => void }> = ({ encontros, onItemClick }) => {
  return (
    <div className="relative mt-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-0.5 bg-sky-800/50" aria-hidden="true"></div>
      <ul className="space-y-12" aria-label="Cronograma dos encontros do curso">
        {encontros.map((encontro, index) => (
          <TimelineItem key={index} encontro={encontro} index={index} onClick={() => onItemClick(encontro)} />
        ))}
      </ul>
    </div>
  );
};

const Conclusion = () => (
    <section className="py-20 bg-sky-950/20">
        <div className="container mx-auto px-6 text-center flex flex-col items-center">
            <h2 className="text-4xl font-bold text-white mb-4 text-glow">Quer conhecer os resultados?</h2>
            <p className="text-slate-300 max-w-3xl mx-auto text-lg mb-8 leading-relaxed">
                A pesquisa completa oferece uma análise aprofundada sobre a aplicação do curso e os resultados obtidos. Explore a dissertação para entender as nuances da medicalização na educação.
            </p>
            <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
                <img src="https://i.imgur.com/CWpCnLB.png" alt="QR Code direcionando para a dissertação completa" className="w-48 h-48" loading="lazy" decoding="async" />
            </div>
            <div className="bg-sky-900/30 backdrop-blur-lg border border-sky-700/50 p-4 rounded-lg max-w-3xl w-full text-sm text-slate-400">
                <p className="text-justify">
                    <strong className="text-slate-200">SILVA, Kessiane Sales Izidim da.</strong> Medicalização da Educação: Pesquisa Intervenção-Formativa com docentes dos Anos Finais do Ensino Fundamental. Orientadora: Maria da Apresentação Barreto. 2025. 105 f. Dissertação (Mestrado Profissional em Educação Especial) - Centro de Educação, Universidade Federal do Rio Grande do Norte, Natal, 2025.
                </p>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-slate-900/50 border-t border-sky-800/50 py-10">
        <div className="container mx-auto px-6 text-center text-slate-500">
            <p className="font-semibold text-white mb-2">Créditos</p>
            <p className="mb-1"><strong className="font-medium text-slate-300">Autora:</strong> Kessiane Sales Izidim da Silva</p>
            <p className="mb-1"><strong className="font-medium text-slate-300">Orientadora:</strong> Profa. Dra Maria da Apresentação Barreto</p>
            <p><strong className="font-medium text-slate-300">Co-orientadora:</strong> Profª Dra. Jacyene Melo de O. Araújo</p>
            <div className="mt-4 flex justify-center items-center space-x-4 text-sky-400">
                <p>UFRN</p>
                <span>+</span>
                <p>PPGEEsp</p>
                 <span>+</span>
                <p>PPGed</p>
            </div>
        </div>
    </footer>
);


const App: React.FC = () => {
  const [selectedEncontro, setSelectedEncontro] = useState<Encontro | null>(null);

  return (
    <div>
      <Header />
      <main>
        <Hero />
        
        <Section id="pesquisa" icon={<BookOpenIcon className="w-8 h-8" />} title="A Pesquisa">
            <SectionCard title="Contextualização do Fenômeno" category="Conceito Inicial">
                <blockquote className="pl-8 text-xs italic text-slate-400 border-l-4 border-sky-800 leading-relaxed text-justify">
                  O fenômeno da medicalização da educação articulou em torno de si a compreensão de que comportamentos e dificuldades de aprendizagem precisam de tratamento medicamentoso, transformando 'questões não médicas, eminentemente de origem social e política, em questões médicas'.
                  <footer className="mt-2 text-right not-italic text-slate-500">(Collares e Moyses, 2010, p. 25)</footer>
                </blockquote>
            </SectionCard>
            <SectionCard title="Motivação da Pesquisa" category="Origem">
                <p>A motivação para a escolha da temática foi baseada na experiência profissional da pesquisadora como professora de Sala de Recursos Multifuncionais (SRM) e supervisora da Educação Especial na 2ª DIREC/RN, a partir da inquietação com diagnósticos médicos que não correspondiam ao comportamento real dos alunos e o frequente encaminhamento de crianças "problemáticas" para diagnósticos médicos e tratamento medicamentoso.</p>
            </SectionCard>
            <SectionCard title="Problemática da Pesquisa" category="Questão-chave">
                 <p>Como um processo formativo, baseado na Teoria Histórico-Cultural, poderá problematizar o fenômeno da medicalização com docentes que atuam nos anos finais do Ensino Fundamental?</p>
            </SectionCard>
        </Section>

        <div className="h-px bg-sky-800/50 max-w-4xl mx-auto"></div>

        <Section id="metodologia" icon={<BeakerIcon className="w-8 h-8" />} title="Metodologia Aplicada">
             <SectionCard title="Objetivos da Pesquisa" category="Metas">
                <p className="font-semibold text-slate-100">Geral:</p>
                <p>Avaliar uma intervenção formativa baseada na Teoria Histórico-Cultural.</p>
                <p className="font-semibold text-slate-100 mt-4">Específicos:</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Identificar o que os professores conhecem sobre a medicalização da educação;</li>
                    <li>Desenvolver uma formação relacionada à medicalização da educação, levando em conta as necessidades identificadas;</li>
                    <li>Avaliar os dados gerados a partir do desenvolvimento da intervenção;</li>
                    <li>Produzir e compartilhar com a comunidade educativa o produto da pesquisa em forma de proposta de intervenção sobre o fenômeno da medicalização da educação.</li>
                </ul>
            </SectionCard>
             <SectionCard title="O Curso de Formação Continuada" category="Produto Educacional">
                <p>Considerando que a pesquisa foi realizada no âmbito de um Mestrado Profissional, cuja proposta central é a realização de investigações aplicadas e a criação de produtos e processos educacionais voltados para a implementação em contextos reais de ensino, o produto educacional resultante consistiu em um CURSO DE FORMAÇÃO CONTINUADA. Esse curso foi desenvolvido com os professores de uma escola estadual do município de Parnamirim/RN com viés temático que entrelaça a medicalização da educação, a Teoria Histórico-Cultural e a prática docente.</p>
            </SectionCard>
             <SectionCard title="Resumo do Projeto" category="Parceria e Extensão">
                <p>O fenômeno da medicalização envolve a transformação de questões complexas e multifatoriais em distúrbios ou transtornos que podem ser medicalizados, inserindo no campo das patologias situações que são parte do cotidiano das pessoas. Esse processo reforça a ideia de que comportamentos e dificuldades de aprendizagem exigem tratamento medicamentoso, convertendo "questões não médicas, eminentemente de origem social e política, em questões médicas" (Collares e Moysés, 2010, p. 25). Com isso, acaba por afastar os professores de suas funções como mediadores do aprendizado escolar, ao mesmo tempo em que fortalece uma cultura de exclusão baseada em uma visão biológica e organicista (Barreto e Guimarães 2021). Nesse contexto, a medicalização da educação contribui para a estigmatização dos estudantes, responsabilizando-os pelo fracasso escolar. Isso acontece porque:</p>
                <blockquote className="pl-8 text-xs italic text-slate-400 border-l-4 border-sky-800 leading-relaxed text-justify">
                    [...] estes sujeitos são tomados abstratamente, de forma descontextualizada de sua história escolar, social, familiar, desconsiderando as relações dialéticas que constituem o ensinar e o aprender.
                    <footer className="mt-2 text-right not-italic text-slate-500">(Leonardo, Silva e Leal, 2020, p. 6)</footer>
                </blockquote>
                <p>Além disso, por não se enquadrarem em padrões estabelecidos, esses alunos são vistos como incapazes de progredir em sua jornada escolar. O curso integra a pesquisa da mestranda Kessiane Sales Izidim da Silva, vinculada ao Programa de Pós-graduação em Educação Especial - PPGEEsp/CE/UFRN, e visa oportunizar um espaço de diálogo em que a prática pedagógica dos docentes sirva como fundamento para reflexão e análise das influências que a concepção organicista exerce sobre a prática e a organização pedagógica escolar.</p>
            </SectionCard>
             <SectionCard title="Colaboradores do Curso" category="Participantes">
                <p>A iniciativa contou com a participação de 13 profissionais anuentes à pesquisa, de um total de 30 professores e profissionais da escola convidados para o curso de formação continuada.</p>
            </SectionCard>
             <SectionCard title="Estrutura dos Encontros" category="Metodologia">
                <p>A estrutura do curso foi organizada em nove momentos, sendo cinco presenciais, denominados “Rodas de Conversa com Professores", e quatro assíncronos, disponibilizados para atividades de leitura de textos científicos, produção de material individual e coletivo. O curso totalizará uma carga horária de 30 horas/atividade. Clique nos itens da linha do tempo para ver os detalhes de cada encontro.</p>
                <Timeline encontros={encontrosData} onItemClick={setSelectedEncontro} />
                <p className="mt-6 text-slate-400">Estudos assíncronos complementaram cada roda com leituras e atividades.</p>
            </SectionCard>
        </Section>
        
        <div className="h-px bg-sky-800/50 max-w-4xl mx-auto"></div>

        <Section id="resultados" icon={<AcademicCapIcon className="w-8 h-8" />} title="Resultados e Certificação">
            <SectionCard title="Certificação dos Participantes" category="Reconhecimento">
                <p>Ao final do curso, os participantes foram certificados pela Pró-Reitoria de Extensão da UFRN, validando a participação e o aprendizado adquirido durante a formação continuada. A conclusão bem-sucedida do curso reforçou a importância do diálogo e da formação crítica sobre a medicalização no ambiente escolar.</p>
            </SectionCard>
        </Section>

        <Conclusion />
      </main>
      <Footer />
      {selectedEncontro && <TimelineModal encontro={selectedEncontro} onClose={() => setSelectedEncontro(null)} />}
    </div>
  );
};

export default App;