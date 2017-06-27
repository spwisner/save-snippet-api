#!/bin/bash

API="http://localhost:4741"
URL_PATH="/snippets"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
      "snippet": {
        "title": "create-title",
        "library": "create-library",
        "description": "create-description",
        "code": "create-code",
        "notes": "create-notes"
      }
    }'

echo
