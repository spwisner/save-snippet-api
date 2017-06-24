#!/bin/bash

API="${API_ORIGIN:-http://localhost:4741}"
URL_PATH="/api/snippets"
curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "snippet": {
      "title": "test-title",
      "library": "library field",
      "description": "description field",
      "code": "<code>",
      "notes": "notes here"
    }
  }'

echo
