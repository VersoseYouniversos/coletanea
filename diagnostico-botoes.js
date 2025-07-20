// 🔍 DIAGNÓSTICO COMPLETO - ANÁLISE CAMADA POR CAMADA
// Execute este código no console do navegador

console.log("🔍 INICIANDO DIAGNÓSTICO COMPLETO DOS BOTÕES...\n");

// ===== CAMADA 1: ESTRUTURA HTML =====
function diagnosticarHTML() {
    console.log("📋 CAMADA 1: ESTRUTURA HTML");
    console.log("═".repeat(40));
    
    // Verificar quantidade de elementos
    const indiceLinks = document.querySelectorAll('.indice-horizontal a');
    const letrasMusicais = document.querySelectorAll('.letra-musical');
    const botoesToggle = document.querySelectorAll('.botao-toggle');
    
    console.log(`🔗 Links no índice: ${indiceLinks.length}`);
    console.log(`🎵 Containers de letras: ${letrasMusicais.length}`);
    console.log(`🔘 Botões toggle: ${botoesToggle.length}`);
    
    if (indiceLinks.length > letrasMusicais.length) {
        console.log("❌ PROBLEMA CRÍTICO: Mais links no índice do que letras musicais!");
        console.log(`   Faltam ${indiceLinks.length - letrasMusicais.length} elementos .letra-musical`);
    }
    
    // Verificar data-titulo vs slugs
    console.log("\n📝 Verificando correspondência data-titulo vs slugs:");
    
    const problemasSlug = [];
    indiceLinks.forEach((link, index) => {
        const onclick = link.getAttribute('onclick');
        const slugMatch = onclick.match(/navegarParaLetra\('([^']+)'/);
        
        if (slugMatch) {
            const slug = slugMatch[1];
            const tituloEsperado = slug.replace(/-/g, ' ');
            const elementoCorrespondente = document.querySelector(`.letra-musical[data-titulo="${tituloEsperado}"]`);
            
            if (!elementoCorrespondente) {
                problemasSlug.push({
                    index: index + 1,
                    slug: slug,
                    tituloEsperado: tituloEsperado,
                    link: link.textContent.trim()
                });
            }
        }
    });
    
    if (problemasSlug.length > 0) {
        console.log("❌ PROBLEMAS DE CORRESPONDÊNCIA ENCONTRADOS:");
        problemasSlug.forEach(problema => {
            console.log(`   ${problema.index}. "${problema.link}" → slug: "${problema.slug}" → título esperado: "${problema.tituloEsperado}" → ❌ ELEMENTO NÃO ENCONTRADO`);
        });
    } else {
        console.log("✅ Todas as correspondências slug → data-titulo estão corretas");
    }
    
    // Verificar IDs únicos
    const ids = Array.from(letrasMusicais).map(el => el.id);
    const idsUnicos = [...new Set(ids)];
    
    if (ids.length !== idsUnicos.length) {
        console.log("❌ PROBLEMA: IDs duplicados encontrados!");
    } else {
        console.log("✅ Todos os IDs são únicos");
    }
    
    console.log("\n");
}

// ===== CAMADA 2: CSS =====
function diagnosticarCSS() {
    console.log("🎨 CAMADA 2: ESTILOS CSS");
    console.log("═".repeat(40));
    
    // Verificar estilos críticos
    const botaoTeste = document.querySelector('.botao-toggle');
    
    if (botaoTeste) {
        const estilos = window.getComputedStyle(botaoTeste);
        
        console.log("🔘 Estilos do botão:");
        console.log(`   Display: ${estilos.display}`);
        console.log(`   Visibility: ${estilos.visibility}`);
        console.log(`   Pointer Events: ${estilos.pointerEvents}`);
        console.log(`   Z-Index: ${estilos.zIndex}`);
        console.log(`   Position: ${estilos.position}`);
        
        if (estilos.pointerEvents === 'none') {
            console.log("❌ PROBLEMA: pointer-events está desabilitado!");
        }
        
        if (estilos.display === 'none' || estilos.visibility === 'hidden') {
            console.log("❌ PROBLEMA: Botão está oculto!");
        }
        
        // Verificar se o botão está coberto por outro elemento
        const rect = botaoTeste.getBoundingClientRect();
        const elementoNoTopo = document.elementFromPoint(
            rect.left + rect.width / 2, 
            rect.top + rect.height / 2
        );
        
        if (elementoNoTopo !== botaoTeste && !botaoTeste.contains(elementoNoTopo)) {
            console.log("❌ PROBLEMA: Botão pode estar coberto por outro elemento!");
            console.log(`   Elemento no topo: ${elementoNoTopo.tagName}.${elementoNoTopo.className}`);
        } else {
            console.log("✅ Botão está acessível na interface");
        }
    }
    
    // Verificar animações CSS
    const animacaoTeste = document.querySelector('.animacao-som span');
    if (animacaoTeste) {
        const animationName = window.getComputedStyle(animacaoTeste).animationName;
        console.log(`🎬 Animação CSS: ${animationName !== 'none' ? '✅ Funcionando' : '❌ Não encontrada'}`);
    }
    
    console.log("\n");
}

// ===== CAMADA 3: JAVASCRIPT =====
function diagnosticarJavaScript() {
    console.log("⚡ CAMADA 3: JAVASCRIPT");
    console.log("═".repeat(40));
    
    // Verificar se as funções existem
    const funcoes = [
        'toggleLetra', 
        'navegarParaLetra', 
        'tituloParaSlug', 
        'mostrarNotificacao',
        'adicionarAnimacaoSom',
        'removerAnimacaoSom',
        'destacarNoIndice'
    ];
    
    console.log("🔧 Verificando funções JavaScript:");
    funcoes.forEach(nomeFuncao => {
        if (typeof window[nomeFuncao] === 'function') {
            console.log(`   ✅ ${nomeFuncao}`);
        } else {
            console.log(`   ❌ ${nomeFuncao} - NÃO ENCONTRADA!`);
        }
    });
    
    // Testar função de conversão de slug
    if (typeof tituloParaSlug === 'function') {
        console.log("\n📝 Testando conversão de slugs:");
        const testes = [
            "Bora Até a Vitória",
            "Um Abraço do Tamanho do Mundo", 
            "Quem Sabe Um Dia A Gente Aprende A Amar?"
        ];
        
        testes.forEach(titulo => {
            const slug = tituloParaSlug(titulo);
            console.log(`   "${titulo}" → "${slug}"`);
        });
    }
    
    // Verificar eventos onclick
    const botoesComOnclick = document.querySelectorAll('[onclick]');
    console.log(`\n🖱️ Elementos com onclick: ${botoesComOnclick.length}`);
    
    let errosOnclick = 0;
    botoesComOnclick.forEach((el, index) => {
        const onclick = el.getAttribute('onclick');
        try {
            // Não executar, apenas verificar sintaxe
            new Function(onclick);
        } catch (error) {
            console.log(`   ❌ Erro de sintaxe no onclick ${index + 1}: ${error.message}`);
            errosOnclick++;
        }
    });
    
    if (errosOnclick === 0) {
        console.log("   ✅ Todos os onclicks têm sintaxe válida");
    }
    
    console.log("\n");
}

// ===== CAMADA 4: DOM E EVENTOS =====
function diagnosticarDOM() {
    console.log("🌐 CAMADA 4: DOM E EVENTOS");
    console.log("═".repeat(40));
    
    // Verificar se o DOM está completamente carregado
    console.log(`📄 Estado do DOM: ${document.readyState}`);
    
    // Verificar listeners de eventos
    const botaoTeste = document.querySelector('.botao-toggle');
    
    if (botaoTeste) {
        // Tentar simular clique e capturar erros
        console.log("🧪 Testando clique em botão:");
        
        try {
            // Criar evento de clique sintético
            const eventoClique = new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            });
            
            // Capturar console.error temporariamente
            const errosCapturados = [];
            const consoleErrorOriginal = console.error;
            console.error = (...args) => {
                errosCapturados.push(args.join(' '));
                consoleErrorOriginal.apply(console, args);
            };
            
            // Executar clique
            botaoTeste.dispatchEvent(eventoClique);
            
            // Restaurar console.error
            console.error = consoleErrorOriginal;
            
            if (errosCapturados.length > 0) {
                console.log("   ❌ Erros capturados durante clique:");
                errosCapturados.forEach(erro => console.log(`      ${erro}`));
            } else {
                console.log("   ✅ Clique executado sem erros JavaScript");
            }
            
        } catch (error) {
            console.log(`   ❌ Erro durante simulação de clique: ${error.message}`);
        }
    }
    
    // Verificar estado atual dos elementos
    const letrasAbertas = document.querySelectorAll('.botao-toggle[aria-expanded="true"]');
    const animacoesAtivas = document.querySelectorAll('.animacao-som');
    
    console.log(`\n📊 Estado atual:`);
    console.log(`   Letras abertas: ${letrasAbertas.length}`);
    console.log(`   Animações ativas: ${animacoesAtivas.length}`);
    
    console.log("\n");
}

// ===== CAMADA 5: NAVEGAÇÃO E URLs =====
function diagnosticarNavegacao() {
    console.log("🧭 CAMADA 5: NAVEGAÇÃO E URLs");
    console.log("═".repeat(40));
    
    console.log(`🔗 URL atual: ${window.location.href}`);
    console.log(`📍 Hash atual: ${window.location.hash || '(nenhum)'}`);
    
    // Verificar se há hash na URL e elemento correspondente
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const elemento = document.querySelector(`#${hash}`);
        
        if (elemento) {
            console.log(`✅ Elemento encontrado para hash #${hash}`);
        } else {
            console.log(`❌ Nenhum elemento encontrado para hash #${hash}`);
        }
    }
    
    // Testar History API
    try {
        history.pushState({}, '', '#teste-diagnostico');
        history.pushState({}, '', window.location.pathname);
        console.log("✅ History API funcionando");
    } catch (error) {
        console.log(`❌ Problema com History API: ${error.message}`);
    }
    
    console.log("\n");
}

// ===== FUNÇÃO DE REPARO AUTOMÁTICO =====
function tentarReparoAutomatico() {
    console.log("🔧 TENTANDO REPARO AUTOMÁTICO");
    console.log("═".repeat(40));
    
    let reparosFeitos = 0;
    
    // 1. Adicionar elementos letra-musical faltantes
    const indiceLinks = document.querySelectorAll('.indice-horizontal a');
    const letrasMusicais = document.querySelectorAll('.letra-musical');
    
    if (indiceLinks.length > letrasMusicais.length) {
        console.log("🏗️ Criando elementos letra-musical faltantes...");
        
        const container = document.querySelector('main');
        const proximoId = letrasMusicais.length + 1;
        
        indiceLinks.forEach((link, index) => {
            if (index >= letrasMusicais.length) {
                const onclick = link.getAttribute('onclick');
                const slugMatch = onclick.match(/navegarParaLetra\('([^']+)'/);
                
                if (slugMatch) {
                    const slug = slugMatch[1];
                    const titulo = slug.replace(/-/g, ' ');
                    const textoLink = link.textContent.trim();
                    
                    const novoElemento = document.createElement('div');
                    novoElemento.id = `letra${index + 1}`;
                    novoElemento.className = 'letra-musical';
                    novoElemento.setAttribute('data-titulo', titulo);
                    
                    novoElemento.innerHTML = `
                        <div class="flex-botoes">
                            <button class="botao-toggle" onclick="toggleLetra(this)" aria-expanded="false" aria-controls="conteudo${index + 1}">🎵 ${titulo}</button>
                        </div>
                        
                        <div class="conteudo-letra" id="conteudo${index + 1}">
                            <p><em>Conteúdo da letra será adicionado em breve...</em></p>
                        </div>
                    `;
                    
                    // Inserir antes da seção de músicas
                    const secaoMusicas = document.getElementById('musicas');
                    if (secaoMusicas) {
                        secaoMusicas.parentNode.insertBefore(novoElemento, secaoMusicas);
                    } else {
                        container.appendChild(novoElemento);
                    }
                    
                    reparosFeitos++;
                    console.log(`   ✅ Criado: ${textoLink}`);
                }
            }
        });
    }
    
    // 2. Corrigir atributos aria-controls faltantes
    const botoesToggle = document.querySelectorAll('.botao-toggle');
    botoesToggle.forEach((botao, index) => {
        if (!botao.hasAttribute('aria-controls')) {
            const conteudo = botao.closest('.letra-musical').querySelector('.conteudo-letra');
            if (conteudo && conteudo.id) {
                botao.setAttribute('aria-controls', conteudo.id);
                reparosFeitos++;
            }
        }
    });
    
    console.log(`\n🎯 Total de reparos feitos: ${reparosFeitos}`);
    
    if (reparosFeitos > 0) {
        console.log("✅ Alguns problemas foram corrigidos automaticamente!");
        console.log("🔄 Execute o diagnóstico novamente para verificar o resultado.");
    } else {
        console.log("ℹ️ Nenhum reparo automático foi necessário.");
    }
    
    console.log("\n");
}

// ===== EXECUÇÃO COMPLETA DO DIAGNÓSTICO =====
function executarDiagnosticoCompleto() {
    console.clear();
    console.log("🔍 DIAGNÓSTICO COMPLETO DOS BOTÕES");
    console.log("═".repeat(50));
    console.log("📅 " + new Date().toLocaleString());
    console.log("═".repeat(50));
    console.log("\n");
    
    diagnosticarHTML();
    diagnosticarCSS();
    diagnosticarJavaScript();
    diagnosticarDOM();
    diagnosticarNavegacao();
    
    console.log("🎯 RESUMO DE PROBLEMAS CRÍTICOS:");
    console.log("═".repeat(40));
    
    const indiceLinks = document.querySelectorAll('.indice-horizontal a');
    const letrasMusicais = document.querySelectorAll('.letra-musical');
    
    if (indiceLinks.length > letrasMusicais.length) {
        console.log(`❌ CRÍTICO: Faltam ${indiceLinks.length - letrasMusicais.length} elementos .letra-musical`);
        console.log("   → Muitos links do índice não têm elementos correspondentes");
    }
    
    const funcoesCriticas = ['toggleLetra', 'navegarParaLetra'];
    const funcoesAusentes = funcoesCriticas.filter(f => typeof window[f] !== 'function');
    
    if (funcoesAusentes.length > 0) {
        console.log(`❌ CRÍTICO: Funções ausentes: ${funcoesAusentes.join(', ')}`);
    }
    
    console.log("\n🔧 EXECUTAR REPARO AUTOMÁTICO:");
    console.log("   Execute: tentarReparoAutomatico()");
    console.log("\n");
}

// Auto-executar diagnóstico
executarDiagnosticoCompleto();

// Exportar funções para uso manual
window.diagnosticarHTML = diagnosticarHTML;
window.diagnosticarCSS = diagnosticarCSS;
window.diagnosticarJavaScript = diagnosticarJavaScript;
window.diagnosticarDOM = diagnosticarDOM;
window.diagnosticarNavegacao = diagnosticarNavegacao;
window.tentarReparoAutomatico = tentarReparoAutomatico;
window.executarDiagnosticoCompleto = executarDiagnosticoCompleto;