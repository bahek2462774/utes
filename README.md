# Отель Атлантик — сайт

Пересборка сайта отеля [utesatlantic.ru](https://utesatlantic.ru/) (п. Утес,
г. Алушта) на Next.js + Tailwind: тот же контент, номера, цены и форма
бронирования, что и на оригинале, но статическая сборка и современная вёрстка
вместо старого Joomla-шаблона.

Продакшен: **http://utes2.duckdns.org/**

## Стек

- Next.js 16 (App Router) + TypeScript + React 19
- Tailwind CSS v4
- Полностью статический экспорт (`output: "export"`) — без Node-сервера в
  проде, только собранные HTML/CSS/JS/картинки в `out/`

## Разработка

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # прод-сборка -> out/
npm run lint
```

Контент (тексты номеров, цены, контакты) хранится в `src/lib/rooms.ts` и
`src/lib/site.ts` — правки контента вносятся прямо там.

## Деплой

Ручной, по FTP: `npm run build`, затем `python3 deploy/ftp_deploy.py`.
Подробности и доступы — в [`deploy/README.md`](deploy/README.md).

## Как ведём проект

Планирование нетривиальных изменений — через [OpenSpec](https://github.com/Fission-AI/OpenSpec)
(`openspec/`). Инструкции для агентов и людей — в [`AGENTS.md`](AGENTS.md).
