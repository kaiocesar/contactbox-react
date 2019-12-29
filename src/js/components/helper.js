'use strict'

export default function datenow() {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let hh = String(today.getHours()).padStart(2, '0')
    let min = String(today.getMinutes()).padStart(2, '0')
    let sec = String(today.getSeconds()).padStart(2, '0')
    let yyyy = today.getFullYear()
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}`
}

