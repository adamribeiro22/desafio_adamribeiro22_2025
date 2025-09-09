class AbrigoAnimais {
  constructor() {
    this.animaisDisponiveis = {
      Rex: { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      Bola: { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      Bebe: { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
    };
    
    this.brinquedosValidos = ['RATO', 'NOVELO', 'BOLA', 'LASER', 'CAIXA', 'SKATE'];
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // Validar entrada
    const pessoa1 = brinquedosPessoa1.split(',');
    const pessoa2 = brinquedosPessoa2.split(',');
    const animais = ordemAnimais.split(',');

    // Validar animais
    for (const animal of animais) {
      if (!this.animaisDisponiveis[animal]) {
        return { erro: 'Animal inválido' };
      }
    }

    // Validar brinquedos
    for (const brinquedo of [...pessoa1, ...pessoa2]) {
      if (!this.brinquedosValidos.includes(brinquedo)) {
        return { erro: 'Brinquedo inválido' };
      }
    }

    let resultado = [];
    const animaisAdotados = {
      pessoa1: 0,
      pessoa2: 0
    };

    for (const animal of animais) {
      const animalInfo = this.animaisDisponiveis[animal];
      
      // Verificar se o animal pode ser adotado
      const podeAdotarPessoa1 = this.verificaAdocao(pessoa1, animalInfo, animaisAdotados.pessoa1, animais);
      const podeAdotarPessoa2 = this.verificaAdocao(pessoa2, animalInfo, animaisAdotados.pessoa2, animais);

      // Regra 4: Se ambas pessoas podem adotar, animal fica no abrigo
      if (podeAdotarPessoa1 && podeAdotarPessoa2) {
        resultado.push(`${animal} - abrigo`);
        continue;
      }

      // Definir com quem o animal ficará
      if (podeAdotarPessoa1) {
        resultado.push(`${animal} - pessoa 1`);
        animaisAdotados.pessoa1++;
      } else if (podeAdotarPessoa2) {
        resultado.push(`${animal} - pessoa 2`);
        animaisAdotados.pessoa2++;
      } else {
        resultado.push(`${animal} - abrigo`);
      }
    }

    return { lista: resultado.sort(), erro: null };
  }

  verificaAdocao(brinquedosPessoa, animalInfo, animaisAdotados, listaAnimais) {
    if (animaisAdotados >= 3) return false;

    if (animalInfo.tipo === 'jabuti') {
      //Verifica se o jabuti tem brinquedos compativeis
        const temBrinquedoCompativel = brinquedosPessoa.some(b => 
            animalInfo.brinquedos.includes(b));
        // e se tem companhia
        const temCompanhia = listaAnimais.length > 1;
        return temBrinquedoCompativel && temCompanhia;
    }

    // Regra 3: Gatos não dividem brinquedos
    if (animalInfo.tipo === 'gato') {
      return animalInfo.brinquedos.every(b => brinquedosPessoa.includes(b));
    }

    // Regra 1 e 2: Verificar brinquedos na ordem
    let brinquedoIndex = 0;
    for (const brinquedo of brinquedosPessoa) {
      if (brinquedo === animalInfo.brinquedos[brinquedoIndex]) {
        brinquedoIndex++;
      }
      if (brinquedoIndex === animalInfo.brinquedos.length) {
        return true;
      }
    }
    return false;
  }
}
export { AbrigoAnimais as AbrigoAnimais };


