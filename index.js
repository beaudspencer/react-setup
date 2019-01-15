const inquirer = require('inquirer')
const chalk = require('chalk')
const figlet = require('figlet')
const fs = require('fs')
const shell = require('shelljs')
const util = require('util')

const expressOnly = [114, 101, 113, 117, 105, 114, 101, 40, 39, 100, 111, 116, 101, 110, 118, 47, 99, 111, 110, 102, 105, 103, 39, 41, 10, 99, 111, 110, 115, 116, 32, 101, 120, 112, 114, 101, 115, 115, 32, 61, 32, 114, 101, 113, 117, 105, 114, 101, 40, 39, 101, 120, 112, 114, 101, 115, 115, 39, 41, 10, 10, 99, 111, 110, 115, 116, 32, 97, 112, 112, 32, 61, 32, 101, 120, 112, 114, 101, 115, 115, 40, 41, 10, 10, 97, 112, 112, 46, 117, 115, 101, 40, 101, 120, 112, 114, 101, 115, 115, 46, 115, 116, 97, 116, 105, 99, 40, 39, 112, 117, 98, 108, 105, 99, 39, 41, 41, 10, 10, 97, 112, 112, 46, 108, 105, 115, 116, 101, 110, 40, 112, 114, 111, 99, 101, 115, 115, 46, 101, 110, 118, 46, 80, 79, 82, 84, 44, 32, 40, 41, 32, 61, 62, 32, 123, 10, 32, 32, 99, 111, 110, 115, 111, 108, 101, 46, 108, 111, 103, 40, 39, 76, 105, 115, 116, 101, 110, 101, 105, 110, 103, 32, 111, 110, 32, 112, 111, 114, 116, 39, 44, 32, 112, 114, 111, 99, 101, 115, 115, 46, 101, 110, 118, 46, 80, 79, 82, 84, 41, 10, 125, 41, 10]
const appJS = [105, 109, 112, 111, 114, 116, 32, 82, 101, 97, 99, 116, 32, 102, 114, 111, 109, 32, 39, 114, 101, 97, 99, 116, 39, 10, 10, 101, 120, 112, 111, 114, 116, 32, 100, 101, 102, 97, 117, 108, 116, 32, 99, 108, 97, 115, 115, 32, 65, 112, 112, 32, 101, 120, 116, 101, 110, 100, 115, 32, 82, 101, 97, 99, 116, 46, 67, 111, 109, 112, 111, 110, 101, 110, 116, 32, 123, 10, 32, 32, 114, 101, 110, 100, 101, 114, 40, 41, 32, 123, 10, 32, 32, 32, 32, 114, 101, 116, 117, 114, 110, 32, 40, 10, 32, 32, 32, 32, 32, 32, 60, 104, 49, 62, 10, 32, 32, 32, 32, 32, 32, 32, 32, 82, 101, 97, 99, 116, 32, 80, 114, 111, 106, 101, 99, 116, 10, 32, 32, 32, 32, 32, 32, 60, 47, 104, 49, 62, 10, 32, 32, 32, 32, 41, 10, 32, 32, 125, 10, 125, 10]
const indexHTML = [60, 33, 68, 79, 67, 84, 89, 80, 69, 32, 104, 116, 109, 108, 62, 10, 60, 104, 116, 109, 108, 32, 108, 97, 110, 103, 61, 34, 101, 110, 34, 62, 10, 32, 32, 60, 104, 101, 97, 100, 62, 10, 32, 32, 32, 32, 60, 109, 101, 116, 97, 32, 99, 104, 97, 114, 115, 101, 116, 61, 34, 85, 84, 70, 45, 56, 34, 47, 62, 10, 32, 32, 32, 32, 60, 109, 101, 116, 97, 32, 110, 97, 109, 101, 61, 34, 118, 105, 101, 119, 112, 111, 114, 116, 34, 32, 99, 111, 110, 116, 101, 110, 116, 61, 34, 119, 105, 100, 116, 104, 61, 100, 101, 118, 105, 99, 101, 45, 119, 105, 100, 116, 104, 44, 32, 105, 110, 105, 116, 105, 97, 108, 45, 115, 99, 97, 108, 101, 61, 49, 46, 48, 34, 47, 62, 10, 32, 32, 32, 32, 60, 116, 105, 116, 108, 101, 62, 82, 101, 97, 99, 116, 32, 65, 112, 112, 60, 47, 116, 105, 116, 108, 101, 62, 10, 32, 32, 60, 47, 104, 101, 97, 100, 62, 10, 32, 32, 60, 98, 111, 100, 121, 62, 10, 32, 32, 32, 32, 60, 100, 105, 118, 32, 105, 100, 61, 34, 114, 111, 111, 116, 34, 62, 60, 47, 100, 105, 118, 62, 10, 32, 32, 32, 32, 60, 115, 99, 114, 105, 112, 116, 32, 115, 114, 99, 61, 34, 109, 97, 105, 110, 46, 106, 115, 34, 62, 60, 47, 115, 99, 114, 105, 112, 116, 62, 10, 32, 32, 60, 47, 98, 111, 100, 121, 62, 10, 60, 47, 104, 116, 109, 108, 62]
const indexJS = [105, 109, 112, 111, 114, 116, 32, 82, 101, 97, 99, 116, 32, 102, 114, 111, 109, 32, 39, 114, 101, 97, 99, 116, 39, 10, 105, 109, 112, 111, 114, 116, 32, 82, 101, 97, 99, 116, 68, 79, 77, 32, 102, 114, 111, 109, 32, 39, 114, 101, 97, 99, 116, 45, 100, 111, 109, 39, 10, 105, 109, 112, 111, 114, 116, 32, 65, 112, 112, 32, 102, 114, 111, 109, 32, 39, 46, 47, 97, 112, 112, 39, 10, 10, 82, 101, 97, 99, 116, 68, 79, 77, 46, 114, 101, 110, 100, 101, 114, 40, 60, 65, 112, 112, 47, 62, 44, 32, 100, 111, 99, 117, 109, 101, 110, 116, 46, 113, 117, 101, 114, 121, 83, 101, 108, 101, 99, 116, 111, 114, 40, 39, 35, 114, 111, 111, 116, 39, 41, 41, 10]
const eslint = [123, 10, 32, 32, 34, 112, 97, 114, 115, 101, 114, 34, 58, 32, 34, 98, 97, 98, 101, 108, 45, 101, 115, 108, 105, 110, 116, 34, 44, 10, 32, 32, 34, 101, 110, 118, 34, 58, 32, 123, 10, 32, 32, 32, 32, 34, 98, 114, 111, 119, 115, 101, 114, 34, 58, 32, 116, 114, 117, 101, 44, 10, 32, 32, 32, 32, 34, 110, 111, 100, 101, 34, 58, 32, 116, 114, 117, 101, 44, 10, 32, 32, 32, 32, 34, 101, 115, 54, 34, 58, 32, 116, 114, 117, 101, 10, 32, 32, 125, 44, 10, 32, 32, 34, 101, 120, 116, 101, 110, 100, 115, 34, 58, 32, 91, 34, 115, 116, 97, 110, 100, 97, 114, 100, 34, 44, 32, 34, 112, 108, 117, 103, 105, 110, 58, 114, 101, 97, 99, 116, 47, 114, 101, 99, 111, 109, 109, 101, 110, 100, 101, 100, 34, 93, 44, 10, 32, 32, 34, 114, 117, 108, 101, 115, 34, 58, 32, 123, 10, 32, 32, 32, 32, 34, 112, 97, 100, 100, 101, 100, 45, 98, 108, 111, 99, 107, 115, 34, 58, 32, 48, 44, 10, 32, 32, 32, 32, 34, 99, 117, 114, 108, 121, 34, 58, 32, 91, 34, 101, 114, 114, 111, 114, 34, 44, 32, 34, 109, 117, 108, 116, 105, 45, 108, 105, 110, 101, 34, 93, 44, 10, 32, 32, 32, 32, 34, 98, 114, 97, 99, 101, 45, 115, 116, 121, 108, 101, 34, 58, 32, 91, 34, 101, 114, 114, 111, 114, 34, 44, 32, 34, 115, 116, 114, 111, 117, 115, 116, 114, 117, 112, 34, 93, 44, 10, 32, 32, 32, 32, 34, 114, 101, 97, 99, 116, 47, 112, 114, 111, 112, 45, 116, 121, 112, 101, 115, 34, 58, 32, 48, 44, 10, 32, 32, 32, 32, 34, 115, 112, 97, 99, 101, 45, 98, 101, 102, 111, 114, 101, 45, 102, 117, 110, 99, 116, 105, 111, 110, 45, 112, 97, 114, 101, 110, 34, 58, 32, 91, 34, 101, 114, 114, 111, 114, 34, 44, 32, 123, 10, 32, 32, 32, 32, 32, 32, 34, 97, 110, 111, 110, 121, 109, 111, 117, 115, 34, 58, 32, 34, 97, 108, 119, 97, 121, 115, 34, 44, 10, 32, 32, 32, 32, 32, 32, 34, 110, 97, 109, 101, 100, 34, 58, 32, 34, 110, 101, 118, 101, 114, 34, 44, 10, 32, 32, 32, 32, 32, 32, 34, 97, 115, 121, 110, 99, 65, 114, 114, 111, 119, 34, 58, 32, 34, 97, 108, 119, 97, 121, 115, 34, 10, 32, 32, 32, 32, 125, 93, 10, 32, 32, 125, 10, 125]
const gitignore = [110, 111, 100, 101, 95, 109, 111, 100, 117, 108, 101, 115, 47, 10, 46, 68, 83, 95, 83, 116, 111, 114, 101, 10, 46, 101, 110, 118, 10, 112, 117, 98, 108, 105, 99, 47]
const htmlhintrc = [123, 10, 32, 32, 34, 97, 116, 116, 114, 45, 108, 111, 119, 101, 114, 99, 97, 115, 101, 34, 58, 32, 116, 114, 117, 101, 44, 10, 32, 32, 34, 97, 116, 116, 114, 45, 110, 111, 45, 100, 117, 112, 108, 105, 99, 97, 116, 105, 111, 110, 34, 58, 32, 116, 114, 117, 101, 44, 10, 32, 32, 34, 97, 116, 116, 114, 45, 117, 110, 115, 97, 102, 101, 45, 99, 104, 97, 114, 115, 34, 58, 32, 116, 114, 117, 101, 44, 10, 32, 32, 34, 97, 116, 116, 114, 45, 118, 97, 108, 117, 101, 45, 100, 111, 117, 98, 108, 101, 45, 113, 117, 111, 116, 101, 115, 34, 58, 32, 116, 114, 117, 101, 44, 10, 32, 32, 34, 97, 116, 116, 114, 45, 118, 97, 108, 117, 101, 45, 110, 111, 116, 45, 101, 109, 112, 116, 121, 34, 58, 32, 102, 97, 108, 115, 101, 44, 10, 32, 32, 34, 100, 111, 99, 116, 121, 112, 101, 45, 102, 105, 114, 115, 116, 34, 58, 32, 116, 114, 117, 101, 44, 10, 32, 32, 34, 100, 111, 99, 116, 121, 112, 101, 45, 104, 116, 109, 108, 53, 34, 58, 32, 116, 114, 117, 101, 44, 10, 32, 32, 34, 104, 114, 101, 102, 45, 97, 98, 115, 45, 111, 114, 45, 114, 101, 108, 34, 58, 32, 102, 97, 108, 115, 101, 44, 10, 32, 32, 34, 105, 100, 45, 99, 108, 97, 115, 115, 45, 118, 97, 108, 117, 101, 34, 58, 32, 34, 100, 97, 115, 104, 34, 44, 10, 32, 32, 34, 105, 100, 45, 117, 110, 105, 113, 117, 101, 34, 58, 32, 116, 114, 117, 101, 44, 10, 32, 32, 34, 109, 101, 116, 97, 45, 99, 104, 97, 114, 115, 101, 116, 34, 58, 32, 116, 114, 117, 101, 44, 10, 32, 32, 34, 115, 112, 97, 99, 101, 45, 116, 97, 98, 45, 109, 105, 120, 101, 100, 45, 100, 105, 115, 97, 98, 108, 101, 100, 34, 58, 32, 34, 115, 112, 97, 99, 101, 50, 34, 44, 10, 32, 32, 34, 115, 112, 101, 99, 45, 99, 104, 97, 114, 45, 101, 115, 99, 97, 112, 101, 34, 58, 32, 116, 114, 117, 101, 44, 10, 32, 32, 34, 115, 114, 99, 45, 110, 111, 116, 45, 101, 109, 112, 116, 121, 34, 58, 32, 116, 114, 117, 101, 44, 10, 32, 32, 34, 116, 97, 103, 45, 112, 97, 105, 114, 34, 58, 32, 116, 114, 117, 101, 44, 10, 32, 32, 34, 116, 97, 103, 45, 115, 101, 108, 102, 45, 99, 108, 111, 115, 101, 34, 58, 32, 116, 114, 117, 101, 44, 10, 32, 32, 34, 116, 97, 103, 110, 97, 109, 101, 45, 108, 111, 119, 101, 114, 99, 97, 115, 101, 34, 58, 32, 116, 114, 117, 101, 44, 10, 32, 32, 34, 116, 105, 116, 108, 101, 45, 114, 101, 113, 117, 105, 114, 101, 34, 58, 32, 116, 114, 117, 101, 10, 125]
const npmrc = [112, 97, 99, 107, 97, 103, 101, 45, 108, 111, 99, 107, 61, 102, 97, 108, 115, 101, 10]
const stylelintrc = [123, 10, 32, 32, 34, 105, 103, 110, 111, 114, 101, 70, 105, 108, 101, 115, 34, 58, 32, 91, 34, 42, 42, 47, 110, 111, 100, 101, 95, 109, 111, 100, 117, 108, 101, 115, 47, 42, 42, 47, 42, 46, 42, 34, 93, 44, 10, 32, 32, 34, 101, 120, 116, 101, 110, 100, 115, 34, 58, 32, 34, 115, 116, 121, 108, 101, 108, 105, 110, 116, 45, 99, 111, 110, 102, 105, 103, 45, 115, 116, 97, 110, 100, 97, 114, 100, 34, 10, 125]
const webpack = [114, 101, 113, 117, 105, 114, 101, 40, 39, 100, 111, 116, 101, 110, 118, 47, 99, 111, 110, 102, 105, 103, 39, 41, 10, 99, 111, 110, 115, 116, 32, 112, 97, 116, 104, 32, 61, 32, 114, 101, 113, 117, 105, 114, 101, 40, 39, 112, 97, 116, 104, 39, 41, 10, 99, 111, 110, 115, 116, 32, 67, 111, 112, 121, 87, 101, 98, 112, 97, 99, 107, 80, 108, 117, 103, 105, 110, 32, 61, 32, 114, 101, 113, 117, 105, 114, 101, 40, 39, 99, 111, 112, 121, 45, 119, 101, 98, 112, 97, 99, 107, 45, 112, 108, 117, 103, 105, 110, 39, 41, 10, 109, 111, 100, 117, 108, 101, 46, 101, 120, 112, 111, 114, 116, 115, 32, 61, 32, 123, 10, 32, 32, 100, 101, 118, 116, 111, 111, 108, 58, 32, 39, 115, 111, 117, 114, 99, 101, 45, 109, 97, 112, 39, 44, 10, 32, 32, 109, 111, 100, 101, 58, 32, 112, 114, 111, 99, 101, 115, 115, 46, 101, 110, 118, 46, 78, 79, 68, 69, 95, 69, 78, 86, 32, 124, 124, 32, 39, 100, 101, 118, 101, 108, 111, 112, 109, 101, 110, 116, 39, 44, 10, 32, 32, 111, 117, 116, 112, 117, 116, 58, 32, 123, 10, 32, 32, 32, 32, 102, 105, 108, 101, 110, 97, 109, 101, 58, 32, 39, 109, 97, 105, 110, 46, 106, 115, 39, 44, 10, 32, 32, 32, 32, 112, 97, 116, 104, 58, 32, 112, 97, 116, 104, 46, 106, 111, 105, 110, 40, 95, 95, 100, 105, 114, 110, 97, 109, 101, 44, 32, 39, 112, 117, 98, 108, 105, 99, 47, 39, 41, 10, 32, 32, 125, 44, 10, 32, 32, 110, 111, 100, 101, 58, 32, 123, 10, 32, 32, 32, 32, 102, 115, 58, 32, 39, 101, 109, 112, 116, 121, 39, 10, 32, 32, 125, 44, 10, 32, 32, 109, 111, 100, 117, 108, 101, 58, 32, 123, 10, 32, 32, 32, 32, 114, 117, 108, 101, 115, 58, 32, 91, 10, 32, 32, 32, 32, 32, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 116, 101, 115, 116, 58, 32, 47, 92, 46, 106, 115, 120, 63, 36, 47, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 105, 110, 99, 108, 117, 100, 101, 58, 32, 112, 97, 116, 104, 46, 106, 111, 105, 110, 40, 95, 95, 100, 105, 114, 110, 97, 109, 101, 44, 32, 39, 115, 114, 99, 47, 39, 41, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 108, 111, 97, 100, 101, 114, 58, 32, 39, 98, 97, 98, 101, 108, 45, 108, 111, 97, 100, 101, 114, 39, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 111, 112, 116, 105, 111, 110, 115, 58, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 112, 114, 101, 115, 101, 116, 115, 58, 32, 91, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 39, 64, 98, 97, 98, 101, 108, 47, 112, 114, 101, 115, 101, 116, 45, 114, 101, 97, 99, 116, 39, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 93, 10, 32, 32, 32, 32, 32, 32, 32, 32, 125, 10, 32, 32, 32, 32, 32, 32, 125, 10, 32, 32, 32, 32, 93, 10, 32, 32, 125, 44, 10, 32, 32, 112, 108, 117, 103, 105, 110, 115, 58, 32, 91, 10, 32, 32, 32, 32, 110, 101, 119, 32, 67, 111, 112, 121, 87, 101, 98, 112, 97, 99, 107, 80, 108, 117, 103, 105, 110, 40, 91, 10, 32, 32, 32, 32, 32, 32, 123, 10, 32, 32, 32, 32, 32, 32, 32, 32, 102, 114, 111, 109, 58, 32, 39, 115, 114, 99, 47, 42, 46, 123, 104, 116, 109, 108, 44, 99, 115, 115, 125, 39, 44, 10, 32, 32, 32, 32, 32, 32, 32, 32, 102, 108, 97, 116, 116, 101, 110, 58, 32, 116, 114, 117, 101, 10, 32, 32, 32, 32, 32, 32, 125, 10, 32, 32, 32, 32, 93, 41, 10, 32, 32, 93, 44, 10, 32, 32, 100, 101, 118, 83, 101, 114, 118, 101, 114, 58, 32, 123, 10, 32, 32, 32, 32, 111, 112, 101, 110, 58, 32, 116, 114, 117, 101, 44, 10, 32, 32, 32, 32, 115, 116, 97, 116, 115, 58, 32, 39, 109, 105, 110, 105, 109, 97, 108, 39, 44, 10, 32, 32, 32, 32, 112, 111, 114, 116, 58, 32, 112, 97, 114, 115, 101, 73, 110, 116, 40, 112, 114, 111, 99, 101, 115, 115, 46, 101, 110, 118, 46, 80, 79, 82, 84, 44, 32, 49, 48, 41, 32, 43, 32, 49, 44, 10, 32, 32, 32, 32, 99, 111, 110, 116, 101, 110, 116, 66, 97, 115, 101, 58, 32, 112, 97, 116, 104, 46, 106, 111, 105, 110, 40, 95, 95, 100, 105, 114, 110, 97, 109, 101, 44, 32, 39, 47, 112, 117, 98, 108, 105, 99, 39, 41, 44, 10, 32, 32, 32, 32, 112, 114, 111, 120, 121, 58, 32, 123, 10, 32, 32, 32, 32, 32, 32, 39, 47, 39, 58, 32, 96, 104, 116, 116, 112, 58, 47, 47, 108, 111, 99, 97, 108, 104, 111, 115, 116, 58, 36, 123, 112, 114, 111, 99, 101, 115, 115, 46, 101, 110, 118, 46, 80, 79, 82, 84, 125, 96, 10, 32, 32, 32, 32, 125, 10, 32, 32, 125, 10, 125]
const expressAndMongo = [114, 101, 113, 117, 105, 114, 101, 40, 39, 100, 111, 116, 101, 110, 118, 47, 99, 111, 110, 102, 105, 103, 39, 41, 10, 99, 111, 110, 115, 116, 32, 101, 120, 112, 114, 101, 115, 115, 32, 61, 32, 114, 101, 113, 117, 105, 114, 101, 40, 39, 101, 120, 112, 114, 101, 115, 115, 39, 41, 10, 99, 111, 110, 115, 116, 32, 77, 111, 110, 103, 111, 67, 108, 105, 101, 110, 116, 32, 61, 32, 114, 101, 113, 117, 105, 114, 101, 40, 39, 109, 111, 110, 103, 111, 100, 98, 39, 41, 46, 77, 111, 110, 103, 111, 67, 108, 105, 101, 110, 116, 10, 10, 108, 101, 116, 32, 100, 98, 10, 10, 99, 111, 110, 115, 116, 32, 97, 112, 112, 32, 61, 32, 101, 120, 112, 114, 101, 115, 115, 40, 41, 10, 10, 97, 112, 112, 46, 117, 115, 101, 40, 101, 120, 112, 114, 101, 115, 115, 46, 115, 116, 97, 116, 105, 99, 40, 39, 112, 117, 98, 108, 105, 99, 39, 41, 41, 10, 10, 77, 111, 110, 103, 111, 67, 108, 105, 101, 110, 116, 46, 99, 111, 110, 110, 101, 99, 116, 40, 112, 114, 111, 99, 101, 115, 115, 46, 101, 110, 118, 46, 77, 79, 78, 71, 79, 95, 65, 68, 68, 82, 69, 83, 83, 44, 32, 123, 32, 117, 115, 101, 78, 101, 119, 85, 114, 108, 80, 97, 114, 115, 101, 114, 58, 32, 116, 114, 117, 101, 32, 125, 44, 32, 40, 101, 114, 114, 44, 32, 99, 108, 105, 101, 110, 116, 41, 32, 61, 62, 32, 123, 10, 32, 32, 100, 98, 32, 61, 32, 99, 108, 105, 101, 110, 116, 46, 100, 98, 40, 39, 108, 111, 99, 97, 108, 39, 41, 10, 32, 32, 97, 112, 112, 46, 108, 105, 115, 116, 101, 110, 40, 112, 114, 111, 99, 101, 115, 115, 46, 101, 110, 118, 46, 80, 79, 82, 84, 44, 32, 40, 41, 32, 61, 62, 32, 123, 10, 32, 32, 32, 32, 99, 111, 110, 115, 111, 108, 101, 46, 108, 111, 103, 40, 39, 76, 105, 115, 116, 101, 110, 101, 105, 110, 103, 32, 111, 110, 32, 112, 111, 114, 116, 39, 44, 32, 112, 114, 111, 99, 101, 115, 115, 46, 101, 110, 118, 46, 80, 79, 82, 84, 41, 10, 32, 32, 125, 41, 10, 125, 41]

const writeFile = util.promisify(fs.writeFile)

function figletStart() {
  console.log(chalk.green(
    figlet.textSync('React Setup', {
      font: 'Big',
      horizontalLayout: 'default',
      verticalLayout: 'default'
    })
  ))
}

function projectSetup() {
  const prompts = [
    {
      name: 'github',
      type: 'list',
      message: 'Is this project going to be using github source control? Setup will create and configure linters for you if you are',
      choices: ['yes', 'no']
    },
    {
      name: 'express',
      type: 'list',
      message: 'Are you setting up an Express server for this project',
      choices: ['yes', 'no']
    },
    {
      name: 'mongodb',
      type: 'list',
      message: 'Are you setting up a MongoDB database with this project?',
      choices: ['yes', 'no']
    },
    {
      name: 'material',
      type: 'list',
      message: 'Are you using Material-UI on the front end?',
      choices: ['yes', 'no']
    },
    {
      name: 'icons',
      type: 'list',
      message: 'Material Icons?',
      choices: ['yes', 'no']
    }
  ]
  return inquirer.prompt(prompts)
}

function review(answers) {
  for (const key in answers) {
    console.log(`${key}: ${answers[key]}`)
  }
  const confirm = [{
    name: 'correct',
    type: 'list',
    message: 'Does this look right?',
    choices: ['yes', 'no']
  }]
  return inquirer.prompt(confirm)
}

function gitSetup() {
  console.log('Installing linter packages for github...')
  shell.exec('npm install -D eslint babel-eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-react eslint-plugin-standard')
  shell.exec('npm install -D htmlhint husky lint-staged stylelint stylelint-config-standard')
  console.log('Setting up linters for GitHub...')
  writeFile('.eslintrc', Buffer.from(eslint))
    .then(writeFile('.gitignore', Buffer.from(gitignore)))
    .then(writeFile('.htmlhintrc', Buffer.from(htmlhintrc)))
    .then(writeFile('.stylelintrc', Buffer.from(stylelintrc)))
    .then(console.log('GitHub and linter files created!'))
    .catch(err => {
      console.error(err)
    })
  console.log('Setting up linter hooks...')
  const pj = fs.readFileSync('package.json', 'utf8')
  const config = JSON.parse(pj)
  config['husky'] = {
    'hooks': {
      'pre-commit': 'lint-staged'
    }
  }
  config['lint-staged'] = {
    '*.html': [
      'htmlhint'
    ],
    '*.css': [
      'stylelint --fix',
      'git add'
    ],
    '*.{js,jsx}': [
      'eslint --fix',
      'git add'
    ]
  }
  config['scripts'] = {
    'start': 'nodemon index.js',
    'build': 'webpack',
    'dev': 'webpack-dev-server',
    'watch': 'npm-run-all --parallel start dev'
  }
  fs.writeFileSync('package.json', JSON.stringify(config, null, 2))
}

function serverSetup(mongo) {
  console.log('Installing express')
  shell.exec('npm install --save express dotenv')
  console.log('writing express server')
  writeFile('index.js', Buffer.from(mongo ? expressAndMongo : expressOnly))
    .then(console.log('Express server created'))
    .catch(err => {
      console.error(err)
    })
  console.log('Creating environment file')
  writeFile('.env', 'PORT=3000')
    .then(console.log('.env file created'))
    .catch(err => {
      console.error(err)
    })
}

function createReactFiles() {
  console.log('Creating src directory and files...')
  fs.mkdir('src', (err) => {
    if (err) console.error(err)
    else {
      writeFile('./src/index.html', Buffer.from(indexHTML))
        .then(writeFile('./src/index.js', Buffer.from(indexJS)))
        .then(writeFile('./src/app.js', Buffer.from(appJS)))
        .then(console.log('source files created!'))
        .catch(err => {
          console.error(err)
        })
    }
  })
}

function initializePackageJson() {
  console.log('Creating package.json file')
  shell.exec('npm init -y')
  console.log('Writing npm config file...')
  writeFile('.npmrc', Buffer.from(npmrc))
    .then(console.log('npmrc setup!'))
  console.log('Installing react dependencies...')
  shell.exec('npm install --save react react-dom')
  console.log('Installing necessary dev dependencies...')
  shell.exec(
    'npm install -D @babel/core @babel/preset-react babel-loader copy-webpack-plugin npm-run-all webpack webpack-cli webpack-dev-server nodemon'
  )
}

function installMaterialCore() {
  console.log('Installing Material-UI')
  shell.exec('npm install --save @material-ui/core')
}

function installMaterialIcons() {
  console.log('Installing Material icons')
  shell.exec('npm install @material-ui/icons')
}

function writePackageScripts() {
  console.log('Writing run scripts to package.json')
  fs.readFile('package.json', 'utf8', (err, data) => {
    if (err) console.error(err)
    const config = JSON.parse(data)
    config['scripts'] = {
      'start': 'nodemon index.js',
      'build': 'webpack',
      'dev': 'webpack-dev-server',
      'watch': 'npm-run-all --parallel start dev'
    }
    writeFile('package.json', JSON.stringify(config, null, 2))
      .then((err) => {
        if (err) console.error(err)
        else console.log('Scripts written to package.json')
      })
      .catch(err => {
        console.error(err)
      })
  })
}

function writeWebpackConfig() {
  console.log('Writing webpack config file...')
  writeFile('webpack.config.js', Buffer.from(webpack))
    .then((err) => {
      if (err) console.error(err)
      else console.log('Config file written!')
    })
    .catch(err => {
      console.error(err)
    })
}

function createProject(answers) {
  initializePackageJson()
  createReactFiles()
  writeWebpackConfig()
  answers.github === 'yes' ? gitSetup() : writePackageScripts()
  if (answers.express === 'yes') serverSetup(answers.mongo === 'yes')
  if (answers.material === 'yes') installMaterialCore()
  if (answers.icons === 'yes') installMaterialIcons()
}

module.exports = async function runApp() {
  figletStart()
  let config
  let correct = 'no'
  do {
    config = await projectSetup()
    const confirm = await review(config)
    correct = confirm.correct
  } while (correct === 'no')
  await createProject(config)
  console.log(chalk.green(
    figlet.textSync('Happy Coding!', {
      font: 'Big',
      horizontalLayout: 'default',
      verticalLayout: 'default'
    })
  ))
}
