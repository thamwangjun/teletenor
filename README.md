# ![teletenor logo banner image](readme-static/teletenor-banner.png)

**teletenor** is an inline bot for [Telgram](https://telegram.org/) that provides inline gif suggestions retrieved from [Tenor](https://tenor.com/).

You can use the bot by mentioning `@teletenor_bot` in Telegram.

**teletenor is still currently in alpha status.**

### *Clone teletenor*

```shell
git clone https://github.com/tabby-jun/teletenor.git
cd teletenor
```

### *Create a `.env` file*

```shell
TELEGRAM_BOT_TOKEN="bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
TELEGRAM_INLINE_RESPONSE_CACHE_TIME=300
TENOR_DEVELOPER_KEY="LIVDSRZULELA"
TENOR_SEARCH_RESULT_LIMIT=12
TENOR_CONTENT_FILTER="low"
MP4_MEDIA_FORMAT="mp4"
GIF_MEDIA_FORMAT="nanogif"
```

### *Install deps and start*

```shell
npm install
# Or if you are using yarn
yarn install

npm start
# or
yarn start
```

## *Tentative Roadmap*

1. ~~Locale-related Tenor searches~~ *done*

2. Register shares with Tenor

3. Automated Tests `!important`

4. Print information during bot operation

5. Logging and performance metrics

---

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
