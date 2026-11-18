const players = Array.from(document.querySelectorAll("video.player"));
let requestedPlayer;

for (const player of players) {
  const source = player.src;
  const label = player.getAttribute("aria-label");
  const slot = document.createElement("div");
  slot.className = "media-slot";
  player.before(slot);
  slot.append(player);

  const start = document.createElement("button");
  start.className = "media-start";
  start.type = "button";
  start.setAttribute("aria-label", label + "を再生");
  start.textContent = "▶ 再生";
  slot.append(start);

  const status = document.createElement("span");
  status.className = "media-status";
  status.setAttribute("role", "status");
  slot.append(status);

  const fallback = document.createElement("p");
  fallback.className = "media-error";
  fallback.hidden = true;
  const loadError = "動画を読み込めませんでした。";
  const link = document.createElement("a");
  link.href = source;
  link.download = "";
  link.textContent = "動画ファイルをダウンロード";
  fallback.append(loadError, link);
  slot.append(fallback);

  // A local Blob lets native controls seek even when the host serves full files.
  player.controls = false;
  start.addEventListener("click", async () => {
    if (start.getAttribute("aria-disabled") === "true") return;
    requestedPlayer = player;
    start.setAttribute("aria-disabled", "true");
    start.textContent = "読み込み中…";
    status.textContent = label + "を読み込んでいます";
    fallback.hidden = true;

    try {
      const response = await fetch(source);
      if (!response.ok) throw new Error("Could not load video");
      player.src = URL.createObjectURL(await response.blob());
    } catch {
      start.removeAttribute("aria-disabled");
      start.textContent = "▶ 再生";
      status.textContent = loadError;
      fallback.hidden = false;
      return;
    }

    player.controls = true;
    if (document.activeElement === start) player.focus();
    start.hidden = true;
    status.textContent = "";
    if (requestedPlayer === player) {
      try {
        await player.play();
      } catch (error) {
        if (error.name === "NotAllowedError") {
          status.classList.add("is-visible");
          status.textContent = "読み込みが完了しました。動画の再生ボタンを押してください。";
        }
      }
    }
  });

  player.addEventListener("play", () => {
    status.classList.remove("is-visible");
    status.textContent = "";
    for (const other of players) {
      if (other !== player && !other.paused) other.pause();
    }
  });

  player.addEventListener("error", () => {
    status.classList.remove("is-visible");
    status.textContent = loadError;
    fallback.hidden = false;
  });
}
