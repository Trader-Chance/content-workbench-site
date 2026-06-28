(function () {
  const sources = window.trainingSources || [];
  const stages = window.decisionStages || [];
  const grid = document.querySelector("#sourceGrid");
  const stageMap = document.querySelector("#stageMap");
  const filters = document.querySelector("#stageFilters");
  const searchInput = document.querySelector("#searchInput");
  const resultCount = document.querySelector("#resultCount");
  const activeContext = document.querySelector("#activeContext");
  const pendingToggle = document.querySelector("#pendingToggle");
  const clearSearch = document.querySelector("#clearSearch");
  const jumpResults = document.querySelector("#jumpResults");
  const quickTerms = document.querySelector(".quick-terms");
  const flowStrip = document.querySelector(".flow-strip");
  const sourceTotalMetric = document.querySelector("#sourceTotalMetric");
  const stageTotalMetric = document.querySelector("#stageTotalMetric");
  const pendingTotalMetric = document.querySelector("#pendingTotalMetric");
  const summaryTotalMetric = document.querySelector("#summaryTotalMetric");
  const dialog = document.querySelector("#sourceDialog");
  const dialogContent = document.querySelector("#dialogContent");
  const dialogClose = document.querySelector("#dialogClose");

  let activeStage = "all";
  let query = "";
  let pendingOnly = false;

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
    const statusMatch = !pendingOnly || source.status === "待确认";
    const text = [
      source.title,
      source.stageLabel,
      source.sourceFile,
      source.summary,
      source.useCase,
      source.density,
      source.readability,
      source.tags.join(" "),
      source.notes.join(" ")
    ].join(" ").toLowerCase();
    return stageMatch && statusMatch && text.includes(query.toLowerCase());
  }

  function getStageTitle(id) {
    if (id === "all") return "全部阶段";
    const stage = stages.find((item) => item.id === id);
    return stage ? stage.title : "全部阶段";
  }

  function renderFilters() {
    const buttons = [
      `<button class="filter-button is-active" type="button" data-stage="all" aria-pressed="true">全部 ${sources.length}</button>`
    ].concat(
      stages.map((stage) => {
        const count = sources.filter((source) => source.stage === stage.id).length;
        return `<button class="filter-button" type="button" data-stage="${stage.id}" aria-pressed="false">${escapeHtml(stage.title)} ${count}</button>`;
      })
    );
    filters.innerHTML = buttons.join("");
  }

  function renderMetrics() {
    const pendingCount = sources.filter((source) => source.status === "待确认").length;
    sourceTotalMetric.textContent = sources.length;
    stageTotalMetric.textContent = stages.length;
    pendingTotalMetric.textContent = pendingCount;
    summaryTotalMetric.textContent = sources.length;
  }

  function renderStageMap() {
    stageMap.innerHTML = stages.map((stage, index) => {
      const stageSources = sources.filter((source) => source.stage === stage.id);
      const pendingCount = stageSources.filter((source) => source.status === "待确认").length;
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
          ${pendingCount ? `<span class="tag">${pendingCount} 项待确认</span>` : ""}
          <div class="stage-actions">
            <button class="stage-filter-link" type="button" data-stage-jump="${stage.id}">只看本阶段</button>
            <div class="stage-items">${items}</div>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderGrid() {
    const visible = sources.filter(sourceMatches);
    const pendingCount = visible.filter((source) => source.status === "待确认").length;
    resultCount.textContent = `当前显示 ${visible.length} / ${sources.length} 张资料${pendingCount ? `，其中 ${pendingCount} 张待确认` : ""}`;
    grid.innerHTML = visible.map((source) => {
      const pendingClass = source.status === "待确认" ? " pending" : "";
      const hiddenTagCount = Math.max(0, source.tags.length - 5);
      const tags = source.tags.slice(0, 5).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("") +
        (hiddenTagCount ? `<span class="tag">+${hiddenTagCount}</span>` : "");
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
              <button class="source-open" type="button" data-source="${source.id}">查看来源说明</button>
              <a class="source-image-link" href="${source.asset}" target="_blank" rel="noopener">打开原图副本</a>
            </div>
          </div>
        </article>
      `;
    }).join("");

    if (!visible.length) {
      grid.innerHTML = `
        <div class="empty-state">
          <strong>没有匹配资料</strong>
          <p>请减少关键词、切换阶段，或清空筛选后重新浏览。</p>
          <button class="utility-button" type="button" data-reset="true">清空筛选</button>
        </div>
      `;
    }
  }

  function updateActiveButtons() {
    document.querySelectorAll(".filter-button").forEach((button) => {
      const isActive = button.dataset.stage === activeStage;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    document.querySelectorAll(".flow-step").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.stage === activeStage);
    });
    document.querySelectorAll(".stage-node").forEach((node) => {
      node.classList.toggle("is-active", node.dataset.stageNode === activeStage);
    });
    if (pendingToggle) {
      pendingToggle.classList.toggle("is-active", pendingOnly);
      pendingToggle.setAttribute("aria-pressed", String(pendingOnly));
    }
    if (quickTerms) {
      quickTerms.querySelectorAll("[data-term]").forEach((button) => {
        button.classList.toggle("is-active", button.dataset.term.toLowerCase() === query.toLowerCase());
      });
    }
  }

  function updateContext() {
    const parts = [`阶段：${getStageTitle(activeStage)}`];
    if (query) parts.push(`关键词：${query}`);
    if (pendingOnly) parts.push("只看待确认");
    activeContext.textContent = parts.join(" / ");
  }

  function refresh() {
    updateActiveButtons();
    renderGrid();
    updateContext();
  }

  function setStage(stage, shouldScroll) {
    activeStage = stage;
    refresh();
    if (shouldScroll) {
      scrollToResults();
    }
  }

  function setQuery(value) {
    query = value.trim();
    searchInput.value = query;
    refresh();
  }

  function resetFilters() {
    activeStage = "all";
    query = "";
    pendingOnly = false;
    searchInput.value = "";
    refresh();
  }

  function scrollToResults() {
    document.querySelector("#libraryTitle").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function closeDialog() {
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  }

  function openDialog() {
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }

  function renderNotes(source) {
    if (!source.notes.length) return "";
    return `<ul class="note-list">${source.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>`;
  }

  function renderDialogMeta(source) {
    const rows = [
      ["源文件", source.sourceFile],
      ["链路位置", source.stageLabel],
      ["密度", source.density],
      ["可读性", source.readability],
      ["用途", source.useCase]
    ];
    return rows.map(([term, value]) => `<dt>${term}</dt><dd>${escapeHtml(value)}</dd>`).join("");
  }

  function renderDialogRisk(source) {
    const isPending = source.status === "待确认";
    const text = isPending
      ? "这张图仍有手写、小字、参数或阈值需要回看原图确认，不能直接当作交易规则。"
      : "这张图用于学习、复盘和流程理解，不构成投资建议，也不应被理解为确定性交易信号。";
    return `<p class="dialog-risk">${escapeHtml(text)}</p>`;
  }

  function showSource(id) {
    const source = sources.find((item) => item.id === id);
    if (!source) return;
    const pendingClass = source.status === "待确认" ? " pending" : "";
    const tags = source.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
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
          ${renderDialogRisk(source)}
          <dl>${renderDialogMeta(source)}</dl>
          <div class="meta-row">${tags}</div>
          ${renderNotes(source)}
          <a class="source-image-link" href="${source.asset}" target="_blank" rel="noopener">在新窗口打开图片副本</a>
        </aside>
      </div>
    `;
    openDialog();
  }

  filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-stage]");
    if (!button) return;
    setStage(button.dataset.stage, false);
  });

  flowStrip.addEventListener("click", (event) => {
    const button = event.target.closest("[data-stage]");
    if (!button) return;
    setStage(button.dataset.stage, true);
  });

  quickTerms.addEventListener("click", (event) => {
    const button = event.target.closest("[data-term]");
    if (!button) return;
    setQuery(button.dataset.term);
  });

  pendingToggle.addEventListener("click", () => {
    pendingOnly = !pendingOnly;
    refresh();
  });

  clearSearch.addEventListener("click", resetFilters);
  jumpResults.addEventListener("click", scrollToResults);

  stageMap.addEventListener("click", (event) => {
    const stageJump = event.target.closest("[data-stage-jump]");
    if (stageJump) {
      setStage(stageJump.dataset.stageJump, true);
      return;
    }
    const sourceButton = event.target.closest("[data-source]");
    if (sourceButton) {
      showSource(sourceButton.dataset.source);
    }
  });

  grid.addEventListener("click", (event) => {
    const resetButton = event.target.closest("[data-reset]");
    if (resetButton) {
      resetFilters();
      return;
    }
    const button = event.target.closest("[data-source]");
    if (!button) return;
    showSource(button.dataset.source);
  });

  searchInput.addEventListener("input", (event) => {
    query = event.target.value.trim();
    refresh();
  });

  dialogClose.addEventListener("click", closeDialog);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog.hasAttribute("open")) {
      closeDialog();
    }
  });

  renderFilters();
  renderMetrics();
  renderStageMap();
  refresh();
})();
