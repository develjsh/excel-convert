import './App.css';
import React from 'react';
import * as XLSX from 'xlsx';

function App() {
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        let data = [];
        const bufferArray = e.target.result;

        const workbook = XLSX.read(bufferArray, { type: 'buffer' });
        const nWorkBook = XLSX.utils.book_new();
        workbook.SheetNames.map((unit, idx) => {
          const wsname = workbook.SheetNames[idx];
          data = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
          const lib = data.reduce(function (accumulator, n){
            return n.한국제품명.includes('립')? accumulator + n.수량 : accumulator + 0  
          }, 0);
          const blush = data.reduce(function (accumulator, n){
            return n.한국제품명.includes('블러쉬')? accumulator + n.수량 : accumulator + 0  
          }, 0);
          const nail = data.reduce(function (accumulator, n){
            return n.한국제품명.includes('네일')? accumulator + n.수량 : accumulator + 0  
          }, 0);
          const consiler = data.reduce(function (accumulator, n){
            return n.한국제품명.includes('컨실러')? accumulator + n.수량 : accumulator + 0  
          }, 0);
          const chick = data.reduce(function (accumulator, n){
            return n.한국제품명.includes('치크')? accumulator + n.수량 : accumulator + 0  
          }, 0);
          const cleanger = data.reduce(function (accumulator, n){
            return n.한국제품명.includes('클랜저')? accumulator + n.수량 : accumulator + 0  
          }, 0);
          const cream = data.reduce(function (accumulator, n){
            return n.한국제품명.includes('크림')? accumulator + n.수량 : accumulator + 0  
          }, 0);
          const mask = data.reduce(function (accumulator, n){
            return n.한국제품명.includes('마스크')? accumulator + n.수량 : accumulator + 0  
          }, 0);
          const essense = data.reduce(function (accumulator, n){
            return n.한국제품명.includes('에센스')? accumulator + n.수량 : accumulator + 0  
          }, 0);
          // const sheetData = [
          //   {'립': lib.length}, 
          //   {'블러쉬' : blush.length},
          //   {'네일' : nail.length}, 
          //   {'컨실러' : consiler.length}, 
          //   {'치크' : chick.length}, 
          //   {'클렌저' : cleanger.length}, 
          //   {'크림' : cream.length},
          //   {'마스크' : mask.length}, 
          //   {'에센스' : essense.length}
          // ];
          
          // const sheetData = [];
          const myheader = ['이름', '갯수'];
          // sheetData.push(['립', lib.length]);
          // sheetData.push(['블러쉬', blush.length]);
          // sheetData.push(['컨실러', consiler]);
          // sheetData.push(['치크', chick]);
          // sheetData.push(['클렌저', cleanger]);
          // sheetData.push(['크림', cream]);
          // sheetData.push(['마스크', mask]);
          // sheetData.push(['에센스', essense]);
          const names = ['립', '블러쉬', '네일', '컨실러', '치크', '클렌저', '크림', '마스크', '에센스'];
          const num = [lib, blush, nail, consiler, chick, cleanger, cream, mask, essense];
          const sheetData = [];
          names.map((unit, idx) =>{
            sheetData.push({"이름" : names[idx], "갯수" : num[idx]});
          });

          

          const worksheet = XLSX.utils.json_to_sheet(sheetData);
          XLSX.utils.book_append_sheet(nWorkBook, worksheet, wsname);

        });
        resolve(nWorkBook);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      XLSX.writeFile(d, 'Test.xlsx');

    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
    </div>
  );
}

export default App;