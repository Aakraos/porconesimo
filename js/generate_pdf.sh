#!/bin/bash

# Supponendo che il tuo script custom.js produca il file certificate.pdf
# Chiamare il tuo script JavaScript per generare o aggiornare il PDF
node ./js/custom.js

# Spostare il nuovo PDF nella stessa directory di custom.js
mv js/certificate.pdf js/new_certificate.pdf