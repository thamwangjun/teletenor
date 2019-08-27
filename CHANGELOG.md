# Change log for teletenor

## `0.9.3`

Refactor handling of bot commands, with some fixes

## `0.9.0`

Implementation of receiving events from AWS Simple Queue Service, with handling of batch records per lambda invocation
Up to 10 records, which mean up to 10 inline queries handled by each Lambda invocation

## `0.8.0`

New implementation of handling bot commands, and modified some command responses
Added new `/termsAndPrivacy` command

## `0.7.x`

Initial implementation for support of AWS Lambda Functions

Fix bot having trouble responding to bot commands due to early termination of lambda

## `0.6.0`

Implemented pagination of results, users can now get more tenor results by scrolling the inline suggestions.

## `0.5.0`

Implemented/Refactored, additional structs for clear type information and errors

## `0.4.0`

Implemented simple logging of Queries and Shares to Tenor (Logging only enabled when explicitly set in .env)

## `0.3.0`

Implemented Registering shares with Tenor

## `0.2.0`

Implemented `/help` command, and possible future commands

## `0.1.0`

Refactored Tenor Searching Related Code

## `0.0.0`

Initial Release
