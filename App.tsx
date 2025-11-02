import React, { useEffect, useRef, useState } from 'react';
import { encontrosData } from './constants';
import { BookOpenIcon, BeakerIcon, AcademicCapIcon } from './components/icons';

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" onClick={handleHomeClick} className="font-bold text-lg text-slate-100 hover:text-blue-400 transition-colors">
          Medicalização na Educação
        </a>
        <nav>
          <ul className="flex items-center space-x-6 text-sm font-medium">
            <li><a href="#pesquisa" onClick={handleNavClick} className="text-slate-300 hover:text-blue-400 transition-colors">A Pesquisa</a></li>
            <li><a href="#metodologia" onClick={handleNavClick} className="text-slate-300 hover:text-blue-400 transition-colors">Metodologia</a></li>
            <li><a href="#resultados" onClick={handleNavClick} className="text-slate-300 hover:text-blue-400 transition-colors">Resultados</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};


const Hero = () => {
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxBgRef.current) {
        const offsetY = window.scrollY;
        parallaxBgRef.current.style.transform = `translateY(${offsetY * 0.5}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const imageUrl = "https://i.imgur.com/p9ifsEn.jpg";

  return (
    <section className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-slate-900">
      <div
        ref={parallaxBgRef}
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <div className="relative text-center z-10 animate-fade-in-up">
        <div className="flex justify-center items-center mb-4">
          <img src="https://i.imgur.com/59WJPZF.png" alt="Logos UFRN, PPGEEsp e PPGed" className="h-96 w-auto" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 tracking-tight text-glow">
          Problematizações sobre o Fenômeno da Medicalização da Educação
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
          Um curso de formação continuada em serviço para professores e equipe pedagógica de uma escola estadual de Parnamirim/RN.
        </p>
        <p className="mt-4 text-md text-slate-400">
          Pesquisa de Kessiane Sales Izidim da Silva
        </p>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-slate-400 rounded-full animate-bounce"></div>
        </div>
        <p className="text-slate-500 text-xs mt-2">Role para baixo</p>
      </div>
    </section>
  );
};

const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode, id?: string }> = ({ icon, title, children, id }) => (
    <section id={id} className="container mx-auto px-6 py-16 scroll-mt-20">
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-blue-400 bg-slate-800 rounded-full">
                {icon}
            </div>
            <h2 className="text-4xl font-bold text-slate-100 text-glow">
                {title}
            </h2>
        </div>
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-1">
            {children}
        </div>
    </section>
);

const SectionCard: React.FC<{ title: string; category: string; children: React.ReactNode }> = ({ title, category, children }) => (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-lg transition-all duration-300 hover:bg-slate-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
        <p className="mb-2 text-sm font-medium text-blue-400 uppercase tracking-wider">{category}</p>
        <h3 className="mb-3 font-bold text-slate-100 text-xl">{title}</h3>
        <div className="text-sm leading-relaxed tracking-wide text-slate-300 space-y-2">
            {children}
        </div>
    </div>
);

interface Encontro {
  date: string;
  title: string;
}

const TimelineItem: React.FC<{ encontro: Encontro; index: number }> = ({ encontro, index }) => {
  const ownRef = useRef<HTMLLIElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const currentRef = ownRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  const isLeft = index % 2 === 0;

  const contentCard = (
      <div className={`relative bg-slate-800 p-4 rounded-lg border border-slate-700 shadow-lg motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out transform hover:bg-slate-700 hover:-translate-y-1 hover:shadow-blue-500/20
          ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isLeft ? '-translate-x-4' : 'translate-x-4'}`
        }`}>
          {/* Puntero/Triángulo */}
          <div className={`absolute w-3 h-3 bg-slate-800 border-slate-700 transform rotate-45 top-1/2 -translate-y-1/2 
              ${isLeft ? 'right-[-7px] border-t border-r' : 'left-[-7px] border-b border-l'}`
          }></div>
          <div className="relative">
              <time className="text-sm font-bold text-blue-400 uppercase tracking-wider">{encontro.date}</time>
              <p className="mt-2 text-slate-200 leading-relaxed">{encontro.title}</p>
          </div>
      </div>
  );
  
  const centerDot = (
      <div className="w-2/12 flex justify-center" aria-hidden="true">
            <div className={`w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-800 z-10 motion-safe:transition-transform motion-safe:duration-500 ${isVisible ? 'scale-100' : 'scale-0'} motion-reduce:scale-100`}></div>
      </div>
  );

  return (
    <li ref={ownRef} className="flex justify-between items-center w-full">
      {isLeft ? (
        <>
          <div className="w-5/12">{contentCard}</div>
          {centerDot}
          <div className="w-5/12" aria-hidden="true"></div>
        </>
      ) : (
        <>
          <div className="w-5/12" aria-hidden="true"></div>
          {centerDot}
          <div className="w-5/12">{contentCard}</div>
        </>
      )}
    </li>
  );
};

const Timeline: React.FC<{ encontros: Encontro[] }> = ({ encontros }) => {
  return (
    <div className="relative mt-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-0.5 bg-slate-700" aria-hidden="true"></div>
      <ul className="space-y-12" aria-label="Cronograma dos encontros do curso">
        {encontros.map((encontro, index) => (
          <TimelineItem key={index} encontro={encontro} index={index} />
        ))}
      </ul>
    </div>
  );
};

const Conclusion = () => (
    <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-6 text-center flex flex-col items-center">
            <h2 className="text-4xl font-bold text-slate-100 mb-4 text-glow">Quer conhecer os resultados?</h2>
            <p className="text-slate-300 max-w-3xl mx-auto text-lg mb-8 leading-relaxed">
                A pesquisa completa oferece uma análise aprofundada sobre a aplicação do curso e os resultados obtidos. Explore a dissertação para entender as nuances da medicalização na educação.
            </p>
            <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAGECAYAAAD9extiAAAAAklEQVR4AewaftIAAAXcSURBVO3BQW4kCQwEwSxC/8v94B8QSAgLmNu4dnuAbj6A/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/eEAHqAPeAD94QAeoA94AP3hAB6gD3iA/nAA/e-Q+U/gPqXwP1b+78B4+IAAAAAElFTkSuQmCC" alt="QR Code para a dissertação" className="w-48 h-48" />
            </div>
            <div className="bg-slate-800 p-4 rounded-lg max-w-3xl w-full text-left text-sm text-slate-400">
                <p>
                    <strong className="text-slate-200">SILVA, Kessiane Sales Izidim da.</strong> Medicalização da Educação: Pesquisa Intervenção-Formativa com docentes dos Anos Finais do Ensino Fundamental. Orientadora: Maria da Apresentação Barreto. 2025. 105 f. Dissertação (Mestrado Profissional em Educação Especial) - Centro de Educação, Universidade Federal do Rio Grande do Norte, Natal, 2025.
                </p>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-slate-900 border-t border-slate-800 py-10">
        <div className="container mx-auto px-6 text-center text-slate-500">
            <p className="font-semibold text-slate-300 mb-2">Créditos</p>
            <p className="mb-1"><strong className="font-medium text-slate-400">Autora:</strong> Kessiane Sales Izidim da Silva</p>
            <p className="mb-1"><strong className="font-medium text-slate-400">Orientadora:</strong> Profa. Dra Maria da Apresentação Barreto</p>
            <p><strong className="font-medium text-slate-400">Co-orientadora:</strong> Profª Dra. Jacyene Melo de O. Araújo</p>
            <div className="mt-4 flex justify-center items-center space-x-4">
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
  return (
    <div className="bg-slate-900">
      <Header />
      <main>
        <Hero />
        
        <Section id="pesquisa" icon={<BookOpenIcon className="w-8 h-8" />} title="A Pesquisa">
            <SectionCard title="Contextualização do Fenômeno" category="Conceito Inicial">
                <p>“O fenômeno da medicalização da educação articulou em torno de si a compreensão de que comportamentos e dificuldades de aprendizagem precisam de tratamento medicamentoso, transformando 'questões não médicas, eminentemente de origem social e política, em questões médicas'.” (Collares e Moyses, 2010, p. 25).</p>
            </SectionCard>
            <SectionCard title="Motivação da Pesquisa" category="Origem">
                <p>A pesquisa nasceu da inquietação da pesquisadora com diagnósticos médicos que não correspondiam ao comportamento real dos alunos e o frequente encaminhamento de crianças 'problemáticas' para diagnósticos e tratamento medicamentoso.</p>
            </SectionCard>
            <SectionCard title="Problemática da Pesquisa" category="Questão-chave">
                 <p>Como um processo formativo, baseado na Teoria Histórico-Cultural, poderá problematizar o fenômeno da medicalização com docentes que atuam nos anos finais do Ensino Fundamental?</p>
            </SectionCard>
        </Section>

        <div className="h-px bg-slate-800 max-w-4xl mx-auto"></div>

        <Section id="metodologia" icon={<BeakerIcon className="w-8 h-8" />} title="Metodologia Aplicada">
             <SectionCard title="Objetivos da Pesquisa" category="Metas">
                <p>O estudo buscou avaliar uma intervenção formativa, identificando os conhecimentos prévios dos professores, desenvolvendo uma formação baseada em suas necessidades e, por fim, produzindo e compartilhando um produto educacional sobre o tema.</p>
            </SectionCard>
             <SectionCard title="O Curso de Formação Continuada" category="Estrutura">
                <p>Desenvolvido como um curso de extensão em parceria com a UFRN, o projeto foi o produto educacional de um Mestrado Profissional, com carga horária de 30 horas, realizado na Escola Estadual Professor Arnaldo Arsênio.</p>
            </SectionCard>
             <SectionCard title="Colaboradores do Curso" category="Participantes">
                <p>Foram convidados 30 professores e profissionais da escola para participar do curso de formação continuada. Destes, 13 profissionais anuentes integraram a pesquisa, contribuindo ativamente para a coleta de dados e discussões.</p>
            </SectionCard>
             <SectionCard title="Estrutura dos Encontros" category="Metodologia">
                <p>O curso foi estruturado em 9 momentos (5 presenciais e 4 assíncronos) com carga horária de 30h, entre 17/09 e 12/11.</p>
                <Timeline encontros={encontrosData} />
                <p className="mt-6 text-slate-400">Estudos assíncronos complementaram cada roda com leituras e atividades.</p>
            </SectionCard>
        </Section>
        
        <div className="h-px bg-slate-800 max-w-4xl mx-auto"></div>

        <Section id="resultados" icon={<AcademicCapIcon className="w-8 h-8" />} title="Resultados e Certificação">
            <SectionCard title="Certificação dos Participantes" category="Reconhecimento">
                <p>Ao final do curso, os participantes foram certificados pela Pró-Reitoria de Extensão da UFRN, validando a participação e o aprendizado adquirido durante a formação continuada. A conclusão bem-sucedida do curso reforçou a importância do diálogo e da formação crítica sobre a medicalização no ambiente escolar.</p>
            </SectionCard>
        </Section>

        <Conclusion />
      </main>
      <Footer />
    </div>
  );
};

export default App;