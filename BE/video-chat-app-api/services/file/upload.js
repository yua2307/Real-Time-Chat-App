const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fileURLToPath = require('url');
const azureStorage = require('azure-storage');
const intoStream = require('into-stream');

const __filename = fileURLToPath(import.meta.url);
