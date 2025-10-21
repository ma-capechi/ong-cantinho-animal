document.addEventListener('DOMContentLoaded', () => {
  console.log('Scripts carregados!');

  // ======= FORMULÁRIO (Máscaras) =======
  const maskInputs = () => {
    const cpf = document.querySelector('input[data-mask="cpf"]');
    const phone = document.querySelector('input[data-mask="phone"]');
    const cep = document.querySelector('input[data-mask="cep"]');

    if (cpf) cpf.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      e.target.value = v;
    });

    if (phone) phone.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      v = v.replace(/^(\d{2})(\d)/, '($1) $2');
      v = v.replace(/(\d{5})(\d)/, '$1-$2');
      e.target.value = v;
    });

    if (cep) cep.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 8);
      v = v.replace(/(\d{5})(\d)/, '$1-$2');
      e.target.value = v;
    });
  };
  maskInputs();

  // ======= FORMULÁRIO (Validação) =======
  const form = document.querySelector('form');

  if (form) {

    // ======= FORMULÁRIO (Validação: Idade mínima de 18 anos) =======
    const nascimento = document.getElementById('nascimento');
    if (nascimento) {
      nascimento.addEventListener('input', e => {
        const valor = e.target.value;
        if (!valor) return;

        const dataNasc = new Date(valor);
        const hoje = new Date();

        let idade = hoje.getFullYear() - dataNasc.getFullYear();
        const mes = hoje.getMonth() - dataNasc.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) idade--;

        if (idade < 18) {
          mostrarErro(nascimento, 'Você precisa ter pelo menos 18 anos para se cadastrar.');
        } else {
          limparErro(nascimento);
        }
      });
    }

    // ======= Funções auxiliares de erro =======
    function mostrarErro(campo, mensagem) {
      limparErro(campo); // evita duplicar mensagens de erro
      campo.classList.add('erro');

      const box = document.createElement('div');
      box.className = 'msg-erro';
      box.textContent = mensagem;
      campo.insertAdjacentElement('afterend', box);
    }

    function limparErro(campo) {
      campo.classList.remove('erro');
      const proximo = campo.nextElementSibling;
      if (proximo && proximo.classList.contains('msg-erro')) {
        proximo.remove();
      }
    }

    // ======= FORMULÁRIO (Validação de envio) =======
form.addEventListener('submit', e => {
  e.preventDefault(); // impede envio até validar

  let valido = true;
  const camposObrigatorios = form.querySelectorAll('[required]');
  let primeiroErro = null;

  camposObrigatorios.forEach(campo => {
    // limpa erros antigos
    limparErro(campo);

    // verifica se o campo está vazio
    if (!campo.value.trim()) {
      mostrarErro(campo, 'Este campo é obrigatório');

      // remove erro assim que o usuário começar a digitar ou mudar o campo
      const handler = () => limparErro(campo);
      campo.addEventListener('input', handler, { once: true });
      campo.addEventListener('change', handler, { once: true });

      if (!primeiroErro) primeiroErro = campo;
      valido = false;
    }
  }); //fecha o forEach aqui

  if (!valido && primeiroErro) {
    primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
    primeiroErro.focus();
    return;
  }

  console.log('Formulário válido!');

  // simula envio 
  setTimeout(() => {
    const modal = document.getElementById('modal-sucesso');
    const fechar = document.getElementById('fechar-modal');

    modal.style.display = 'flex'; // exibe o modal

    // fecha ao clicar no botão
    fechar.addEventListener('click', () => {
      modal.style.display = 'none';
      form.reset(); // limpa os campos após fechar
    });

    // fecha ao clicar fora da caixa do modal
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.style.display = 'none';
        form.reset();
      }
    });
  }, 500);
}); // fechamento do listener de submit

} // fechamento do if(form)
}); // fechamento do DOMContentLoaded
