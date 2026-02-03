#!/bin/bash

echo "=== Generating Secure Tokens ==="
echo ""
echo "TEST Token:"
echo "dev_$(openssl rand -hex 32)"
echo ""
echo "PRODUCTION Token:"
echo "prod_$(openssl rand -hex 32)"
echo ""
echo "Copy these tokens to your .env files and Google Apps Script!"
