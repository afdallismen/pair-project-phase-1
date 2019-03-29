function open (open, close){
    if (Number(open.slice(0,2)) <= Number(new Date().getHours()) && Number(close.slice(0,2)) >= new Date().getHours()) {
        return `${open} s/d ${close} OPEN `
    }else{
        return `${open} s/d ${close} CLOSE `
    }
}

module.exports = open