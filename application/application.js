const players = Array.from(document.querySelectorAll("video.player"));

for (const player of players) {
  player.addEventListener("play", () => {
    for (const other of players) {
      if (other !== player && !other.paused) other.pause();
    }
  });

  player.addEventListener("error", () => {
    const fallback = document.createElement("p");
    fallback.className = "media-error";
    fallback.setAttribute("role", "status");
    const link = document.createElement("a");
    link.href = player.src;
    link.textContent = "動画ファイルを開く";
    fallback.append("動画を再生できなかった場合は、", link, "からご確認ください。");
    player.after(fallback);
  }, { once: true });
}
