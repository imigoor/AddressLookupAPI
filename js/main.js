document.addEventListener('DOMContentLoaded', () => {
  const cepInput = document.getElementById('cep');
  const errorDisplay = document.getElementById('cepError');
  const fields = {
    street: document.getElementById('street'),
    number: document.getElementById('number'),
    neighborhood: document.getElementById('neighborhood'),
    city: document.getElementById('city'),
    state: document.getElementById('state')
  };

  const resetFields = () => {
    Object.values(fields).forEach(field => field.value = '');
  };

  const showError = () => {
    cepInput.classList.add('input-cep-error');
    errorDisplay.classList.remove('hidden');
    resetFields();
  };

  const hideError = () => {
    cepInput.classList.remove('input-cep-error');
    errorDisplay.classList.add('hidden');
  };

  const fetchCepInfo = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        showError();
      } else {
        fields.street.value = data.logradouro || '';
        fields.neighborhood.value = data.bairro || '';
        fields.city.value = data.localidade || '';
        fields.state.value = data.uf || '';
        hideError();
        fields.number.focus();
      }
    } catch (error) {
      showError();
    }
  };

  cepInput.addEventListener('focus', hideError);

  cepInput.addEventListener('blur', () => {
    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length === 8) {
      fetchCepInfo(cep);
    } else {
      showError();
    }
  });
});
