import './App.css';
import React from 'react';
import * as XLSX from 'xlsx';

function App() {
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: 'buffer' });
        // console.log(wb.SheetNames.length);

        const list = ['립','블러쉬','네일','컨실러','치크','클렌저','크림','마스크','에센스']

        const workbook = XLSX.utils.book_new();
        const aloop = wb.SheetNames.map((unit, idx) => {
          const wsname = wb.SheetNames[idx];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);

          // 1개의 시트 전체 다 indexOf 해서 숫자 계산하기
          const map =  {};
          map['립'] = 0;
          map['블러쉬'] = 0;
          map['네일'] = 0;
          map['컨실러'] = 0;
          map['치크'] = 0;
          map['클렌터'] = 0;
          map['크림'] = 0;
          map['마스크'] = 0;
          map['에센스'] = 0;

          // for(var i=0; i<data.length; i++){
          //   for(var j=0; j<list.length; j++){
          //     if(data[0]["한국제품명"].indexOf(list[j]) > 0){
          //       map[list[j]] =  map[list[j]] + 1;
          //       console.log("들어옴");
          //     }

          //   }
          // }

          for(var i=0; i<data.length; i++){
            if(data[0]["한국제품명"].indexOf(list[j]) > 0){
              map[list[j]] =  map[list[j]] + 1;
              console.log("들어옴");
            }

          }

          const worksheet = XLSX.utils.json_to_sheet(data);
          XLSX.utils.book_append_sheet(workbook, worksheet, wsname);

          return unit;
        });
        XLSX.writeFile(wb, 'Test.xlsx');

      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      // const ws = XLSX.utils.json_to_sheet(d);

      // const wb = XLSX.utils.book_new();

      // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      // XLSX.writeFile(wb, 'Test.xlsx');

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
