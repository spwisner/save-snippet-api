#!/bin/bash

API="${API_ORIGIN:-http://localhost:4741}"
URL_PATH="/snippets/${ID}"
curl "${API}${URL_PATH}" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "snippet": {
      "title": "update-title",
      "library": "update-library",
      "description": "update-description",
      "code": "update-code",
      "notes": "update-notes"
      }
    }'

echo
