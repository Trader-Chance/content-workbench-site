(function () {
  const sources = window.trainingSources || [];
  const stages = window.decisionStages || [];
  const grid = document.querySelector("#sourceGrid");
  const stageMap = document.querySelector("#stageMap");
  const filters = document.querySelector("#stageFilters");
  const searchInput = document.querySelector("#searchInput");
  const resultCount = document.querySelector("#resultCount");
  const dialog = document.querySelector("#sourceDialog");
  const dialogContent = document.querySelector("#dialogContent");
  const dialogClose = document.querySelector("#dialogClose");

  let activeStage = "all";
  let query = "";

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function sourceMatches(source) {
    const stageMatch = activeStage === "all" || source.stage === activeStage;
    const text = [
      source.title,
      source.stageLabel,
      source.sourceFile,
      source.summary,
      source.useCase,
      source.tags.join(" ")
    ].join(" ").toLowerCase();
    return stageMatch && text.includes(query.toLowerCase());
  }

  function renderFilters() {
    const buttons = [
      `<button class="filter-button is-active" type="button" data-stage="all">全部</button>`
    ].concat(
      stages.map((stage) => {
        const count = sources.filter((source) => source.stage === stage.id).length;
        return `<button class="filter-button" type="button" data-stage="${stage.id}">${escapeHtml(stage.title)} ${count}</button>`;
      })
    );
    filters.innerHTML = buttons.join("");
  }

  function renderStageMap() {
    stageMap.innerHTML = stages.map((stage, index) => {
      const stageSources = sources.filter((source) => source.stage === stage.id);
      const items = stageSources.length
        ? stageSources.map((source) => `<button class="stage-button" type="button" data-source="${source.id}">${escapeHtml(source.title)}</button>`).join("")
        : `<span class="tag">暂无源图</span>`;
      return `
        <article class="stage-node" data-stage-node="${stage.id}">
          <header>
            <span class="step-label">${String(index + 1).padStart(2, "0")}</span>
            <h3>${escapeHtml(stage.title)}</h3>
            <span class="stage-count">${stageSources.length}</span>
          </header>
          <p>${escapeHtml(stage.brief)}</p>
          <div class="stage-items">${items}</div>
        </article>
      `;
    }).join("");
  }

  function renderGrid() {
    const visible = sources.filter(sourceMatches);
    resultCount.textContent = `当前显示 ${visible.length} / ${sources.length} 张资料`;
    grid.innerHTML = visible.map((source) => {
      const pendingClass = source.status === "待确认" ? " pending" : "";
      const tags = source.tags.slice(0, 5).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
      return `
        <article class="source-card" data-source-card="${source.id}">
          <div class="thumb-wrap">
            <img src="${source.asset}" alt="${escapeHtml(source.title)}" loading="lazy">
          </div>
          <div class="source-body">
            <div class="card-topline">
              <span class="stage-pill">${escapeHtml(source.stageLabel)}</span>
              <span class="status-pill${pendingClass}">${escapeHtml(source.status)}</span>
            </div>
            <h3>${escapeHtml(source.title)}</h3>
            <p class="summary">${escapeHtml(source.summary)}</p>
            <div class="source-file">
              <span>源图</span>
              <strong>${escapeHtml(source.sourceFile)}</strong>
            </div>
            <div class="meta-row">${tags}</div>
            <div class="source-actions">
              <button class="source-open" type="button" data-source="${source.id}">查看说明</button>
              <a class="source-image-link" href="${source.asset}" target="_blank" rel="noopener">打开原图副本</a>
            </div>
          </div>
        </article>
      `;
    }).join("");

    if (!visible.length) {
      grid.innerHTML = `<p class="summary">没有匹配资料。请减少关键词或切换阶段。</p>`;
    }
  }

  function updateActiveButtons() {
    document.querySelectorAll(".filter-button").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.stage === activeStage);
    });
  }

  function showSource(id) {
    const source = sources.find((item) => item.id === id);
    if (!source) return;
    const pendingClass = source.status === "待确认" ? " pending" : "";
    const tags = source.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
    const notes = source.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("");
    dialogContent.innerHTML = `
      <div class="dialog-layout">
        <div class="dialog-image">
          <img src="${source.asset}" alt="${escapeHtml(source.title)}">
        </div>
        <aside class="dialog-info">
          <div class="card-topline">
            <span class="stage-pill">${escapeHtml(source.stageLabel)}</span>
            <span class="status-pill${pendingClass}">${escapeHtml(source.status)}</span>
          </div>
          <h2>${escapeHtml(source.title)}</h2>
          <p class="summary">${escapeHtml(source.summary)}</p>
          <dl>
            <dt>源文件</dt>
            <dd>${escapeHtml(source.sourceFile)}</dd>
            <dt>密度</dt>
            <dd>${escapeHtml(source.density)}</dd>
            <dt>可读性</dt>
            <dd>${escapeHtml(source.readability)}</dd>
            <dt>用途</dt>
            <dd>${escapeHtml(source.useCase)}</dd>
          </dl>
          <div class="meta-row">${tags}</div>
          <ul class="note-list">${notes}</ul>
          <a class="source-image-link" href="${source.asset}" target="_blank" rel="noopener">在新窗口打开图片副本</a>
        </aside>
      </div>
    `;
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }

  function applyFilters(stage) {
    activeStage = stage;
    updateActiveButtons();
    renderGrid();
  }

  filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-stage]");
    if (!button) return;
    applyFilters(button.dataset.stage);
  });

  stageMap.addEventListener("click", (event) => {
    const sourceButton = event.target.closest("[data-source]");
    if (sourceButton) {
      showSource(sourceButton.dataset.source);
    }
  });

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-source]");
    if (!button) return;
    showSource(button.dataset.source);
  });

  searchInput.addEventListener("input", (event) => {
    query = event.target.value.trim();
    renderGrid();
  });

  dialogClose.addEventListener("click", () => {
    dialog.close();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  renderFilters();
  renderStageMap();
  renderGrid();
})();
