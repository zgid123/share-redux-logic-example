#!/bin/bash

yarn install

yarn build-redux-common

cp packages/mobile/.env.example packages/mobile/.env

cp packages/web/.env.example packages/web/.env.development.local
