#!/bin/bash

# Test endpoints and check responses
echo "Testing API Gateway endpoints..."

# Array of endpoints to test
endpoints=(
  "/"
  "/test"
  "/direct-features"
  "/direct-api-features"
  "/direct-locations"
  "/direct-root"
  "/api/locations/123/features"
  "/api/locations/features"
  "/api/locations"
  "/health"
)

# Expected response
expected_response='{"message":"I am nginx"}'

# Test each endpoint
for endpoint in "${endpoints[@]}"; do
  echo -n "Testing $endpoint... "
  response=$(curl -s "http://localhost$endpoint")
  
  if [ "$response" == "$expected_response" ]; then
    echo "✅ OK"
  else
    echo "❌ FAILED"
    echo "Expected: $expected_response"
    echo "Got: $response"
  fi
done

echo "All tests completed."
