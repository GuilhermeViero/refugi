document.addEventListener("DOMContentLoaded", () => {
    const statusClassMap = {
      "Estável": "estável",
      "Em risco": "em-risco",
      "Crítico": "crítico"
    };
  
    const formSuprimento = document.getElementById("formSuprimento");
    const tabela = document.querySelector("#tabelaSuprimentos tbody");
    let linhaEditando = null;
  
    // === SUPRIMENTOS ===
    formSuprimento?.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = formSuprimento.nome.value.trim();
      const atual = formSuprimento.atual.value.trim();
      const minimo = formSuprimento.minimo.value.trim();
      const status = formSuprimento.status.value;
  
      const badge = `<span class="status-badge status-${statusClassMap[status]}">${status}</span>`;
      const html = `
        <td>${nome}</td>
        <td>${atual}</td>
        <td>${minimo}</td>
        <td>${badge}</td>
        <td>
          <button class="btn btn-sm btn-outline-secondary editar">✏️</button>
          <button class="btn btn-sm btn-outline-danger remover">🗑️</button>
        </td>
      `;
  
      if (linhaEditando) {
        linhaEditando.innerHTML = html;
        linhaEditando = null;
      } else {
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = html;
        if (status === "Crítico") {
          tabela.prepend(novaLinha);
        } else {
          tabela.appendChild(novaLinha);
        }
      }
  
      formSuprimento.reset();
      bootstrap.Modal.getInstance(document.getElementById("modalSuprimento")).hide();
      atualizarCardsCriticos();
    });
  
    tabela?.addEventListener("click", (e) => {
      const btn = e.target;
      if (btn.classList.contains("editar")) {
        linhaEditando = btn.closest("tr");
        const cels = linhaEditando.querySelectorAll("td");
        formSuprimento.nome.value = cels[0].textContent;
        formSuprimento.atual.value = cels[1].textContent;
        formSuprimento.minimo.value = cels[2].textContent;
        formSuprimento.status.value = cels[3].textContent.trim();
        bootstrap.Modal.getOrCreateInstance(document.getElementById("modalSuprimento")).show();
      }
  
      if (btn.classList.contains("remover")) {
        if (confirm("Deseja remover este item?")) {
          btn.closest("tr").remove();
          atualizarCardsCriticos();
        }
      }
    });
  
    // === ABRIGADOS ===
    document.getElementById("formAbrigado")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      const nome = f.nome.value.trim();
      const genero = f.genero.value;
      const idade = f.idade.value.trim();
      const celular = f.celular.value.trim();
  
      const novaLinha = `
        <tr>
          <td>${nome}</td>
          <td>${genero}</td>
          <td>${idade}</td>
          <td>${celular}</td>
          <td><button class="btn btn-sm btn-outline-danger remover-abrigado">🗑️</button></td>
        </tr>`;
  
      document.querySelector("#tabelaAbrigados tbody").insertAdjacentHTML("beforeend", novaLinha);
      f.reset();
      bootstrap.Modal.getInstance(document.getElementById("modalAbrigado")).hide();
    });
  
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("remover-abrigado")) {
        if (confirm("Deseja remover esta pessoa?")) {
          e.target.closest("tr").remove();
        }
      }
    });
  
    // === MENSAGENS ===
    document.getElementById("formMensagem")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      const texto = f.texto.value.trim();
      const autor = f.autor.value.trim();
      const tipo = f.tipo.value;
  
      const cores = {
        "Informação": "#0d6efd",
        "Urgente": "#dc3545",
        "Atenção": "#ffc107"
      };
  
      const novaMensagem = `
        <div class="alert-message" style="border-left: 5px solid ${cores[tipo]}; background-color: #f8f9fa;">
          <p class="mb-1"><strong>${tipo}:</strong> ${texto}</p>
          <small>por ${autor} — agora</small>
        </div>`;
  
      document.getElementById("painelMensagens").insertAdjacentHTML("afterbegin", novaMensagem);
      f.reset();
      bootstrap.Modal.getInstance(document.getElementById("modalMensagem")).hide();
    });
  
    // === SAIR ===
    document.querySelectorAll(".sair").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Tem certeza que deseja sair?")) {
          window.location.href = "index.html";
        }
      });
    });
  
    // === CARDS CRÍTICOS ===
    function atualizarCardsCriticos() {
      const cardsContainer = document.getElementById("cardsCriticos");
      if (!cardsContainer) return;
  
      cardsContainer.innerHTML = "";
      const linhas = document.querySelectorAll("#tabelaSuprimentos tbody tr");
  
      linhas.forEach(linha => {
        const statusEl = linha.querySelector("td:nth-child(4)");
        const statusText = statusEl?.textContent?.trim();
        if (statusText === "Crítico") {
          const nome = linha.children[0].textContent;
          const atual = linha.children[1].textContent;
          const minimo = linha.children[2].textContent;
  
          const card = document.createElement("div");
          card.className = "col-12 col-md-6";
          card.innerHTML = `
            <div class="card border-danger h-100">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h6 class="text-danger fw-bold mb-0">Suprimento Crítico</h6>
                  <span class="badge bg-danger">ALERTA</span>
                </div>
                <p class="mb-1 fw-semibold">${nome}</p>
                <p class="mb-0"><strong>Atual:</strong> ${atual}</p>
                <p class="mb-0"><strong>Mínimo:</strong> ${minimo}</p>
              </div>
            </div>`;
          cardsContainer.appendChild(card);
        }
      });
    }
  
    // Inicializar na primeira carga
    atualizarCardsCriticos();
  });
  
  
  // === FUNCIONALIDADE COLABORADORES ===
let linhaColaboradorEditando = null;

document.getElementById("formColaborador")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  const novoHTML = `
    <td>${f.nome.value}</td>
    <td>${f.especialidade.value}</td>
    <td>${f.contrato.value}</td>
    <td>${f.disponibilidade.value}</td>
    <td>${f.genero.value}</td>
    <td>${f.celular.value}</td>
    <td>
      <button class="btn btn-sm btn-outline-secondary editar-colab">✏️</button>
      <button class="btn btn-sm btn-outline-danger remover-colab">🗑️</button>
    </td>`;

  if (linhaColaboradorEditando) {
    linhaColaboradorEditando.innerHTML = novoHTML;
    linhaColaboradorEditando = null;
  } else {
    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = novoHTML;
    document.querySelector("#tabelaColaboradores tbody").append(novaLinha);
  }

  f.reset();
  bootstrap.Modal.getInstance(document.getElementById("modalColaborador")).hide();
});

// Detecta clique nos botões de ação
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("editar-colab")) {
    linhaColaboradorEditando = e.target.closest("tr");
    const cels = linhaColaboradorEditando.children;
    const f = document.getElementById("formColaborador");

    f.nome.value = cels[0].innerText;
    f.especialidade.value = cels[1].innerText;
    f.contrato.value = cels[2].innerText;
    f.disponibilidade.value = cels[3].innerText;
    f.genero.value = cels[4].innerText;
    f.celular.value = cels[5].innerText;

    new bootstrap.Modal(document.getElementById("modalColaborador")).show();
  }

  if (e.target.classList.contains("remover-colab")) {
    if (confirm("Deseja remover este colaborador?")) {
      e.target.closest("tr").remove();
    }
  }
});
