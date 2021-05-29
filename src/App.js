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
          const lib = data.filter(n => n.한국제품명.includes('립'));
          const blush = data.filter(n => n.한국제품명.includes('블러쉬'));
          const nail = data.filter(n => n.한국제품명.includes('네일'));
          const consiler = data.filter(n => n.한국제품명.includes('컨실러'));
          const chick = data.filter(n => n.한국제품명.includes('치크'));
          const cleanger = data.filter(n => n.한국제품명.includes('클렌저'));
          const cream = data.filter(n => n.한국제품명.includes('크림'));
          const mask = data.filter(n => n.한국제품명.includes('마스크'));
          const essense = data.filter(n => n.한국제품명.includes('에센스'));
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
          // sheetData.push(['네일', nail.length]);
          // sheetData.push(['컨실러', consiler.length]);
          // sheetData.push(['치크', chick.length]);
          // sheetData.push(['클렌저', cleanger.length]);
          // sheetData.push(['크림', cream.length]);
          // sheetData.push(['마스크', mask.length]);
          // sheetData.push(['에센스', essense.length]);
          const names = ['립', '블러쉬', '네일', '컨실러', '치크', '클렌저', '크림', '마스크', '에센스'];
          const num = [lib.length, blush.length, nail.length, consiler.length, chick.length, cleanger.length, cream.length, mask.length, essense.length];
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