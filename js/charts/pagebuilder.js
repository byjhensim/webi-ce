"use strict"

const CR = String.fromCharCode(13);

class PageBuilder {
  constructor(){}

  buildHeaderPage(){
    const header ='<!DOCTYPE html>' + CR +
    '<html >' + CR +
    '<head >' + CR +
    '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">' + CR +
    '<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>' + CR +
    '</head>' + CR +
    '<body>' + CR;

    return header;
  }

  buildFooterPage(){
    const footer =
    '</body>' + CR +
    '</html>';

    return footer;
  }
}

module.exports = PageBuilder;
