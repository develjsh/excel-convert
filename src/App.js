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

        workbook.SheetNames.forEach(function(sheetName) {
          data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        });

        const lib = data.filter(n => n.한국제품명.includes('립'));
        const blush = data.filter(n => n.한국제품명.includes('블러쉬'));
        const nail = data.filter(n => n.한국제품명.includes('네일'));
        const consiler = data.filter(n => n.한국제품명.includes('컨실러'));
        const chick = data.filter(n => n.한국제품명.includes('치크'));
        const cleanger = data.filter(n => n.한국제품명.includes('클렌저'));
        const cream = data.filter(n => n.한국제품명.includes('크림'));
        const mask = data.filter(n => n.한국제품명.includes('마스크'));
        const essense = data.filter(n => n.한국제품명.includes('에센스'));
        console.log(lib)
        console.log(blush)
        console.log(nail)
        console.log(consiler)
        console.log(chick)
        console.log(cleanger)
        console.log(cream)
        console.log(mask)
        console.log(essense)

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
