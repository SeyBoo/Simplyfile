#!/bin/sh
rm -f .env
file=".env"
react="REACT_APP_"
echo $react'DOCUMENTS_API_BACKEND_MODULE=dummy' >> $file
echo $react'DIRECTORIES_API_BACKEND_MODULE=dummy' >> $file
echo $react'AUTH_API_BACKEND_MODULE=dummy' >> $file
cat $file
npm install --force
cd ios/ && pod install
echo Successfully setup
