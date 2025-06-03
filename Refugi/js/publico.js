document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("gridAbrig");
    const form = document.getElementById("formAbrigo");
    let abrigos = [];
  
    function render() {
      grid.innerHTML = "";
      abrigos.forEach((abrigo, index) => {
        const card = document.createElement("div");
        card.className = "col";
  
        const ocupacao = (abrigo.ocupado / abrigo.capacidade) * 100;
        let cor = "bg-success";
        if (ocupacao > 90) cor = "bg-danger";
        else if (ocupacao > 70) cor = "bg-warning";
  
        card.innerHTML = `
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${abrigo.nome}</h5>
              <div class="mb-2">
                <div class="d-flex justify-content-between">
                  <small><strong>${abrigo.ocupado}</strong> / ${abrigo.capacidade}</small>
                  <small>${ocupacao.toFixed(0)}%</small>
                </div>
                <div class="progress" style="height: 8px;">
                  <div class="progress-bar ${cor}" style="width: ${ocupacao}%;"></div>
                </div>
              </div>
              <p class="mb-1"><strong>Suprimentos Críticos:</strong><br><span class="critical-supply-item">${abrigo.suprimentos}</span></p>
              <p><strong>Mensagem:</strong> ${abrigo.mensagem}</p>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <button class="btn btn-sm btn-outline-primary w-50 me-1 editar" data-index="${index}">✏️ Editar</button>
              <button class="btn btn-sm btn-outline-danger w-50 ms-1 remover" data-index="${index}">🗑️ Remover</button>
            </div>
          </div>`;
        grid.appendChild(card);
      });
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      const index = f.index.value;
      const abrigo = {
        nome: f.nome.value,
        capacidade: parseInt(f.capacidade.value),
        ocupado: parseInt(f.ocupado.value),
        suprimentos: f.suprimentos.value,
        mensagem: f.mensagem.value,
      };
  
      if (index !== "") {
        abrigos[parseInt(index)] = abrigo;
      } else {
        abrigos.push(abrigo);
      }
  
      form.reset();
      f.index.value = "";
      bootstrap.Modal.getInstance(document.getElementById("modalAbrigo")).hide();
      render();
    });
  
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("editar")) {
        const i = parseInt(e.target.dataset.index);
        const abrigo = abrigos[i];
        form.nome.value = abrigo.nome;
        form.capacidade.value = abrigo.capacidade;
        form.ocupado.value = abrigo.ocupado;
        form.suprimentos.value = abrigo.suprimentos;
        form.mensagem.value = abrigo.mensagem;
        form.index.value = i;
        bootstrap.Modal.getOrCreateInstance(document.getElementById("modalAbrigo")).show();
      }
  
      if (e.target.classList.contains("remover")) {
        const i = parseInt(e.target.dataset.index);
        if (confirm("Deseja remover este abrigo?")) {
          abrigos.splice(i, 1);
          render();
        }
      }
    });
  
    // Exemplo inicial
    abrigos.push({
      nome: "Abrigo Esperança",
      capacidade: 120,
      ocupado: 85,
      suprimentos: "Água, Fraldas",
      mensagem: "Falta de água prevista para amanhã.",
    });
    render();
  });
  