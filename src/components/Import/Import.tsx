// @ts-nocheck
import ReactExport from "react-data-export";
import { SymbolDisplayPartKind } from "typescript";
import myProject from "./exampleProject";
import { useAppSelector } from "../../store/hooks";
import { getProjectSelector } from "../../store/selectors/selectors";
import * as XLSX from "xlsx";
import { resolveCname } from "dns";
import { error } from "console";


// const Export: FC<Props> = ({ projectId, project }) => {

//   const projectToExport = useAppSelector(
//     getProjectSelector("75fc9f66-d4f6-4304-b98c-46841b301d44")
//   ); //=> PUSH PROJECT ID!

//   console.log(projectToExport);

//   return (
//     <div className="App">
      
//     </div>
//   );
// };

function Import() {

  const readExcel=(file)=>{

    const promise = new Promise((resolve, reject)=>{
      
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload=(e)=>{
        const bufferArray=e.target.result;

        const wb = XLSX.read(bufferArray,{type:'buffer'});

        const wsname=wb.SheetNames[0];

        const ws=wb.Sheets[wsname];

        const data=XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error)=>{
        reject(error);
      };
    });

    promise.then((d)=>{
      console.log(d);
    })

  };


  return (
    <div>
      <p>import</p>
      <input type="file" onChange={(e) => {
          const file = e.target.files[0];

          readExcel(file);
        }
      } />
    </div>
  );
};

export default Import;

