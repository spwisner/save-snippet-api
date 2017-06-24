#!/bin/bash

API="${API_ORIGIN:-http://localhost:4741}"
URL_PATH="/api/snippets/${ID}"
curl "${API}${URL_PATH}" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "snippet": {
      "title": "test-title-updated",
      "library": "library field - Update",
      "description": "description - updated",
      "code": "<code> - updated",
      "notes": "notes updated"
    }
  }'

echo
