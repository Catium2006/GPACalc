// ==UserScript==
// @name         GPACalc
// @namespace    http://catium.top/
// @version      2025-01-29
// @description  正方教务平均学分绩点计算器
// @author       Catium2006
// @match        https://*/jwglxt/cjcx/cjcx_cxDgXscj.html*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==


var total_xfjd = 0
var total_xf = 0
var gpa = 0;

function handleTr(tr) {
    tds = tr.childNodes
    if (tds.length < 6) return
    xf = Number(tds[6].innerText)
    total_xf += xf;
    xfjd = Number(tds[24].innerText)
    total_xfjd += xfjd;
}


function calc() {
    // 获取每科学分绩点
    console.log("calculating GPA...")
    var table = document.getElementById('tabGrid')
    var tbody = table.childNodes[0]
    var trs = tbody.childNodes
    trs.forEach(handleTr);

    // 计算GPA
    gpa = total_xfjd / total_xf
    console.log('GPA = ' + gpa)

    // 显示
    div_data = document.getElementById('div-data')
    div_result = document.createElement('div')
    div_result.style = 'text-align: center; font-size: 20px; border-width: 2px; border-style: solid;'
    div_result.innerHTML = '<p>当前总学分: ' + total_xf + '</p><br><p>当前总学分绩点: ' + total_xfjd + '</p><br><p>当前平均学分绩点: ' + gpa + '</p>'
    div_result.id = 'div_result'
    div_data.appendChild(div_result)
}

function clearResult() {
    total_xfjd = 0
    total_xf = 0
    gpa = 0
    document.getElementById('div_result').remove();
}

function onButtonClick() {
    clearResult()
    setTimeout(calc, 1000)
}

(function () {
    'use strict';
    console.log("GPACalc")
    console.log("author: Catium2006")

    document.getElementById('search_go').click()
    setTimeout(calc, 1000)

    document.getElementById('search_go').onclick = onButtonClick;

    // setTimeout(queryScore, 500)
    // setTimeout(calc, 1000)

})();
