import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve retornar erro para brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'PATINS,RATO', 'RATO,BOLA', 'Rex');
    expect(resultado).toEqual({ erro: 'Brinquedo inválido' });
  });

  test('Deve retornar erro para animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado).toEqual({ erro: 'Animal inválido' });
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve verificar regra especial do Loco (jabuti)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO',
      'RATO,NOVELO', 
      'Loco,Rex'
    );
    
    expect(resultado.lista).toContain('Loco - abrigo');
    expect(resultado.erro).toBeFalsy();
    expect(resultado.lista.length).toBe(2);
});

test('Deve verificar que Loco precisa de companhia e brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO', 
      'NOVELO,BOLA', 
      'Loco'
    );
    
    expect(resultado.lista).toContain('Loco - abrigo');
    expect(resultado.erro).toBeFalsy();
    expect(resultado.lista.length).toBe(1);
  });
});
