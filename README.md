# [![teletenor logo banner image](readme-static/teletenor-banner.png)](https://telegram.me/ttenor_bot)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ftabby-jun%2Fteletenor.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Ftabby-jun%2Fteletenor?ref=badge_shield)

[**teletenor**](https://telegram.me/ttenor_bot) is an inline bot for [Telegram](https://telegram.org/) that provides inline gif suggestions retrieved from [Tenor](https://tenor.com/).

You can use the bot by mentioning [`@ttenor_bot`](https://telegram.me/ttenor_bot) in Telegram.

**teletenor is still currently in alpha status.**

## AWS Lambda Deployment

[teletenor-contralto](https://github.com/tabby-jun/teletenor-contralto) is teletenor's project for deployment onto AWS Cloud using [AWS SAM (Serverless Application Model)](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html).

## Setup

### Prerequisites

* [Node 12.x.x LTS](https://nodejs.org/en/) *Earlier Node versions may work, but not tested*
* [A Telegram bot authorization token](https://core.telegram.org/bots#6-botfather)
* [A Tenor API Key](https://tenor.com/developer/keyregistration)

### *Clone teletenor*

```shell
git clone https://github.com/tabby-jun/teletenor.git
cd teletenor
```

### *Create a `.env` file*

```shell
TELEGRAM_BOT_TOKEN="bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11" # You need to get this from Telegram's BotFather, under Prerequisites
TELEGRAM_INLINE_RESPONSE_CACHE_TIME=300
TENOR_DEVELOPER_KEY="LIVDSRZULELA" # You need to get this from Tenor's API Portal, under Prerequisites
TENOR_SEARCH_RESULT_LIMIT=12
TENOR_CONTENT_FILTER="low"
TENOR_MEDIA_FILTER="minimal"
MP4_MEDIA_FORMAT="mp4"
GIF_MEDIA_FORMAT="tinygif"
LOGGING_ENABLED=false
LOG_LEVEL=error
DISABLE_LAUNCH=false # true when using AWS Lambda
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

2. ~~Register shares with Tenor~~  *done*

3. Automated Tests `!important`

4. Print information during bot operation

5. Logging and performance metrics

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Notes

* (`@teletenor_bot`) bot has been disabled in favor of a shorter username handle (`@ttenor_bot`)


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ftabby-jun%2Fteletenor.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Ftabby-jun%2Fteletenor?ref=badge_large)