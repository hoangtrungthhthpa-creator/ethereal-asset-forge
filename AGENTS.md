<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep canonical game data and saved logs in Vietnamese; localize at display time through the shared i18n helpers so language switching also updates existing saves.
- Scope donation-window phone styling and page scroll locking to widths below 640px; preserve the tablet and desktop layout.
- Resolve Lovable CDN asset pointers against the game's published host, never a host inferred from the pointer's project ID; copied assets can belong to a different project and relative paths fail in local or draft previews.
- Select BGM through backgroundTrack from realm and ascended state only, keeping transient notifications and level changes out of audio dependencies to preserve playback position.
- The itch.io build (vite.itch.config.ts, itch/index.html, src/itch-main.tsx) renders the index route component directly with base "./"; keep the game client-only and reference public files via import.meta.env.BASE_URL so it runs in itch's iframe without a server.
