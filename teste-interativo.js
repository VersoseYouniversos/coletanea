// Teste Interativo - Simulação de Cliques e Execução
// Execute este código no console do navegador para testar as funcionalidades

console.log("🎵 Iniciando testes da Coletânea de Letras...");

// ===== TESTE 1: SIMULAÇÃO DE CLIQUE EM BOTÃO DE LETRA =====
function testeToggleLetra() {
    console.log("\n📝 TESTE 1: Toggle de Letra");
    
    // Encontrar o primeiro botão de letra
    const primeiroBtn = document.querySelector('.botao-toggle');
    
    if (primeiroBtn) {
        console.log("✅ Botão encontrado:", primeiroBtn.textContent);
        
        // Simular clique
        console.log("🖱️ Simulando clique...");
        primeiroBtn.click();
        
        // Verificar estado após clique
        setTimeout(() => {
            const expanded = primeiroBtn.getAttribute('aria-expanded');
            console.log("📊 Estado aria-expanded:", expanded);
            
            const animacao = primeiroBtn.parentElement.querySelector('.animacao-som');
            console.log("🎨 Animação criada:", !!animacao);
            
            if (animacao) {
                const cor = window.getComputedStyle(animacao.querySelector('span')).backgroundColor;
                console.log("🌈 Cor da animação:", cor);
            }
        }, 100);
    } else {
        console.log("❌ Nenhum botão encontrado");
    }
}

// ===== TESTE 2: NAVEGAÇÃO PELO ÍNDICE =====
function testeNavegacaoIndice() {
    console.log("\n🧭 TESTE 2: Navegação pelo Índice");
    
    const linkIndice = document.querySelector('.indice-horizontal a');
    
    if (linkIndice) {
        console.log("✅ Link do índice encontrado:", linkIndice.textContent);
        
        // Simular clique no índice
        console.log("🖱️ Simulando clique no índice...");
        linkIndice.click();
        
        setTimeout(() => {
            const ativo = document.querySelector('.indice-horizontal a.ativo');
            console.log("📍 Link ativo:", ativo ? ativo.textContent : "Nenhum");
            
            const letraAberta = document.querySelector('.conteudo-letra.ativo');
            console.log("📖 Letra aberta:", !!letraAberta);
        }, 600);
    } else {
        console.log("❌ Nenhum link do índice encontrado");
    }
}

// ===== TESTE 3: SISTEMA DE MODAIS =====
function testeModais() {
    console.log("\n🪟 TESTE 3: Sistema de Modais");
    
    // Teste modal QR
    console.log("💰 Testando modal de doação...");
    abrirModalQR();
    
    setTimeout(() => {
        const modal = document.getElementById('qrModal');
        const visivel = window.getComputedStyle(modal).display !== 'none';
        console.log("✅ Modal QR visível:", visivel);
        
        // Fechar modal
        fecharModalQR();
        
        setTimeout(() => {
            const fechado = window.getComputedStyle(modal).display === 'none';
            console.log("✅ Modal QR fechado:", fechado);
        }, 100);
    }, 100);
}

// ===== TESTE 4: NOTIFICAÇÕES =====
function testeNotificacoes() {
    console.log("\n🔔 TESTE 4: Sistema de Notificações");
    
    mostrarNotificacao("Teste de notificação! 🧪");
    
    setTimeout(() => {
        const notificacao = document.querySelector('.notificacao-copia');
        const visivel = notificacao && notificacao.classList.contains('ativo');
        console.log("✅ Notificação visível:", visivel);
        
        if (notificacao) {
            console.log("📝 Texto da notificação:", notificacao.textContent);
        }
    }, 100);
}

// ===== TESTE 5: CONVERSÃO DE SLUG =====
function testeSlugConversion() {
    console.log("\n🔗 TESTE 5: Conversão de Títulos para Slugs");
    
    const testes = [
        "Bora Até a Vitória",
        "Um Abraço do Tamanho do Mundo",
        "Quem Sabe Um Dia A Gente Aprende A Amar?",
        "Guerra Não É Partida De Futebol"
    ];
    
    testes.forEach(titulo => {
        const slug = tituloParaSlug(titulo);
        console.log(`📌 "${titulo}" → "${slug}"`);
    });
}

// ===== TESTE 6: PERFORMANCE E MEMÓRIA =====
function testePerformance() {
    console.log("\n⚡ TESTE 6: Performance e Uso de Memória");
    
    const inicio = performance.now();
    
    // Abrir e fechar todas as letras rapidamente
    const botoes = document.querySelectorAll('.botao-toggle');
    console.log(`🔢 Total de letras encontradas: ${botoes.length}`);
    
    let contador = 0;
    botoes.forEach((btn, index) => {
        setTimeout(() => {
            btn.click(); // Abrir
            
            setTimeout(() => {
                btn.click(); // Fechar
                contador++;
                
                if (contador === botoes.length) {
                    const fim = performance.now();
                    console.log(`⏱️ Tempo total: ${(fim - inicio).toFixed(2)}ms`);
                    console.log(`📊 Média por operação: ${((fim - inicio) / (botoes.length * 2)).toFixed(2)}ms`);
                }
            }, 100);
        }, index * 200);
    });
}

// ===== TESTE 7: ACESSIBILIDADE =====
function testeAcessibilidade() {
    console.log("\n♿ TESTE 7: Verificação de Acessibilidade");
    
    const botoes = document.querySelectorAll('.botao-toggle');
    let problemas = [];
    
    botoes.forEach((btn, index) => {
        // Verificar aria-expanded
        if (!btn.hasAttribute('aria-expanded')) {
            problemas.push(`Botão ${index + 1}: Falta aria-expanded`);
        }
        
        // Verificar aria-controls
        if (!btn.hasAttribute('aria-controls')) {
            problemas.push(`Botão ${index + 1}: Falta aria-controls`);
        }
        
        // Verificar foco
        if (!btn.tabIndex && btn.tabIndex !== 0) {
            // Ok, botões são focáveis por padrão
        }
    });
    
    console.log(`🔍 Problemas de acessibilidade encontrados: ${problemas.length}`);
    problemas.forEach(problema => console.log(`❌ ${problema}`));
    
    if (problemas.length === 0) {
        console.log("✅ Testes básicos de acessibilidade passaram!");
    }
}

// ===== EXECUÇÃO AUTOMÁTICA DOS TESTES =====
function executarTodosTestes() {
    console.log("🚀 Executando bateria completa de testes...\n");
    
    testeSlugConversion();
    
    setTimeout(() => {
        testeNotificacoes();
    }, 500);
    
    setTimeout(() => {
        testeModais();
    }, 1000);
    
    setTimeout(() => {
        testeToggleLetra();
    }, 2000);
    
    setTimeout(() => {
        testeNavegacaoIndice();
    }, 3000);
    
    setTimeout(() => {
        testeAcessibilidade();
    }, 4000);
    
    setTimeout(() => {
        testePerformance();
    }, 5000);
    
    setTimeout(() => {
        console.log("\n🎉 Todos os testes concluídos!");
        console.log("📋 Verifique os resultados acima para análise detalhada.");
    }, 8000);
}

// ===== FUNÇÕES UTILITÁRIAS PARA DEBUGGING =====
function debugEstadoAtual() {
    console.log("\n🔍 DEBUG: Estado Atual da Aplicação");
    
    const letrasAbertas = document.querySelectorAll('.botao-toggle[aria-expanded="true"]');
    console.log(`📖 Letras abertas: ${letrasAbertas.length}`);
    
    const animacoes = document.querySelectorAll('.animacao-som');
    console.log(`🎨 Animações ativas: ${animacoes.length}`);
    
    const modaisAbertos = Array.from(document.querySelectorAll('[id$="Modal"]'))
        .filter(modal => window.getComputedStyle(modal).display !== 'none');
    console.log(`🪟 Modais abertos: ${modaisAbertos.length}`);
    
    const notificacaoAtiva = document.querySelector('.notificacao-copia.ativo');
    console.log(`🔔 Notificação ativa: ${!!notificacaoAtiva}`);
    
    console.log(`🔗 URL atual: ${window.location.href}`);
}

function limparEstado() {
    console.log("🧹 Limpando estado da aplicação...");
    
    // Fechar todas as letras
    document.querySelectorAll('.botao-toggle[aria-expanded="true"]')
        .forEach(btn => btn.click());
    
    // Fechar todos os modais
    fecharModalQR();
    fecharModalAutor();
    fecharModalDoacao();
    
    // Remover notificações
    const notificacao = document.querySelector('.notificacao-copia');
    if (notificacao) {
        notificacao.classList.remove('ativo');
    }
    
    console.log("✅ Estado limpo!");
}

// ===== INSTRUÇÕES DE USO =====
console.log(`
🎯 INSTRUÇÕES DE USO:

1. executarTodosTestes() - Executa todos os testes automaticamente
2. testeToggleLetra() - Testa abertura/fechamento de letras
3. testeNavegacaoIndice() - Testa navegação pelo índice
4. testeModais() - Testa sistema de modais
5. testeNotificacoes() - Testa notificações
6. testeSlugConversion() - Testa conversão de títulos
7. testePerformance() - Testa performance
8. testeAcessibilidade() - Verifica acessibilidade
9. debugEstadoAtual() - Mostra estado atual
10. limparEstado() - Limpa todos os estados

📝 Execute: executarTodosTestes()
`);

// Auto-executar se em ambiente de teste
if (window.location.search.includes('autotest=true')) {
    executarTodosTestes();
}