# Playerok API SDK

TypeScript-библиотека для работы с [Playerok REST API](https://playerok.com/).

Библиотека предоставляет удобный клиент для взаимодействия с пользовательскими REST-эндпоинтами Playerok. Большинство доступных на данный момент эндпоинтов реализовано.

## Установка

Установить библиотеку можно командой `pnpm add github:th1ks/playerok-sdk`

## Использование

```typescript
import { PlayerokClient } from "playerok-api";

const client = new PlayerokClient({
  token: process.env.PLAYEROK_TOKEN,
});

const viewer = await client.viewer.get();
console.log(viewer);
```

## Доступные методы

- client.auth 
- client.viewer
- client.file  
- client.users 
- client.banners
- client.http
- client.items

## Авторизация

Поместите в `.env` файл свой Playerok токен, например `PLAYEROK_TOKEN=токен`. После вы сможете создать объект client:

```typescript
const client = new PlayerokClient({
  token: process.env.PLAYEROK_TOKEN,
});
```

## Документация на GitHub Pages

Документация генерируется TypeDoc и автоматически публикуется workflow
`.github/workflows/docs.yml` при каждом push в ветку `main`.

Чтобы включить публикацию:

1. Закоммитьте и отправьте изменения в GitHub:

   ```bash
   git add .github/workflows/docs.yml typedoc.json package.json pnpm-lock.yaml
   git commit -m "docs: deploy TypeDoc to GitHub Pages"
   git push origin main
   ```

2. Откройте в репозитории **Settings → Pages**.
3. В поле **Source** выберите **GitHub Actions**.
4. Дождитесь успешного выполнения workflow **Deploy documentation to GitHub Pages**
   на вкладке **Actions**.

После публикации документация будет доступна по адресу:
https://th1ks.github.io/playerok-sdk/

Workflow также можно запустить вручную через **Actions → Deploy documentation to
GitHub Pages → Run workflow**.
