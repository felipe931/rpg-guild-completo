// Definindo opções de customização
const cores = ['Vermelho', 'Azul', 'Verde', 'Preto', 'vermelho', 'azul', 'verde', 'preto'];
const simbolos = ['Dragão', 'Fênix', 'Lobo', 'Coração', 'dragão', 'fênix', 'lobo', 'coração'];

// Função para criar o menu de seleção
function customizarPersonagem() {
    let cor = prompt('Escolha uma cor (Vermelho, Azul, Verde, Preto):');
    let simbolo = prompt('Escolha um símbolo (Dragão, Fênix, Lobo, Coração):');
    
    if (cores.includes(cor) && simbolos.includes(simbolo)) {
        alert(`Seu personagem foi customizado com a cor ${cor} e o símbolo ${simbolo}!`);
        // Aqui você pode salvar as escolhas ou atualizar o personagem no DOM ou no sistema
    } else {
        alert('Opção inválida. Tente novamente.');
    }
}

// Chama a função quando o usuário clicar em um botão ou ao carregar a página
export default customizarPersonagem;