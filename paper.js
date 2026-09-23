/* ============================================================
   paper.js — renders a PDF into #viewer as a stack of canvases.
   Used by every paper page. The page supplies the file path via
   <div id="viewer" data-pdf="/Sanctions.pdf"></div>
   ============================================================ */

(function () {
  const viewer = document.getElementById('viewer');
  if (!viewer) return;

  const url = viewer.dataset.pdf;
  const status = document.getElementById('viewer-status');
  const pageCountEl = document.getElementById('page-count');

  // Fail visibly rather than silently: if the CDN is blocked or the file
  // moves, the reader still gets a working download link.
  function fail() {
    // The status line is detached once the first page renders, so a later
    // failure (e.g. mid-resize) would otherwise write into nothing. Put it back.
    if (status) {
      status.innerHTML =
        'The inline viewer could not load. <a href="' + url + '">Download the PDF instead.</a>';
      if (!status.isConnected) { viewer.innerHTML = ''; viewer.appendChild(status); }
    }
  }

  if (typeof pdfjsLib === 'undefined') { fail(); return; }

  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  let pdfDoc = null;
  // Each render() call takes a ticket. A resize can start a new render while
  // the previous one is still awaiting pages; the stale loop sees its ticket
  // is out of date and stops, so pages are never appended twice.
  let ticket = 0;

  async function render() {
    const mine = ++ticket;
    // Cap at 2x so retina screens stay sharp without rendering enormous
    // canvases on high-DPR phones.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = viewer.clientWidth;

    viewer.innerHTML = '';

    for (let n = 1; n <= pdfDoc.numPages; n++) {
      const page = await pdfDoc.getPage(n);
      if (mine !== ticket) return;
      const unscaled = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: (width / unscaled.width) * dpr });

      const wrap = document.createElement('div');
      wrap.className = 'pdf-page';

      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', 'Page ' + n + ' of ' + pdfDoc.numPages);

      wrap.appendChild(canvas);
      viewer.appendChild(wrap);

      await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
    }
  }

  pdfjsLib.getDocument(url).promise
    .then(function (doc) {
      pdfDoc = doc;
      if (status) status.remove();
      if (pageCountEl) pageCountEl.textContent = doc.numPages + ' pages';
      return render();
    })
    .catch(fail);

  // Re-render on resize so the canvases stay crisp instead of being
  // stretched by the browser. Debounced, since resize fires constantly.
  let timer = null;
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', function () {
    if (!pdfDoc || window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    clearTimeout(timer);
    timer = setTimeout(function () { render().catch(fail); }, 250);
  });
})();
