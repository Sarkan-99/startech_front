"use client";
import React, { useState , useEffect} from "react";
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";

export const Note = ({ onValuesChange, notes }) => {
    const [value1, setValue1] = useState(notes.qualite_note);
    const [value2, setValue2] = useState(notes.inovation_note);
    const [value3, setValue3] = useState(notes.pertinence_note);
    const [value4, setValue4] = useState(notes.effort_note);
    const [value5, setValue5] = useState(notes.env_note);
    const [value6, setValue6] = useState(notes.comentaire);

    useEffect(() => {
        onValuesChange([value1, value2, value3, value4, value5, value6]);
    }, [value1, value2, value3, value4, value5,value6, onValuesChange]);


  return (
    <div className="mt-10  flex justify-center " >
      <div className="card shadow-md w-10/12">
      <table className="table">
      <tbody>
        
        <tr>
          <th>Qualité de présentation du dossier</th>
          <th>:</th>
          <td><InputNumber value={value1} onValueChange={(e) => setValue1(e.value)} mode="decimal"  min={0} max={10} maxFractionDigits={2}/></td>
          <td>/10</td>
        </tr>
        <tr>
          <th>Caractère innovant</th>
          <th>:</th>
          <td><InputNumber value={value2} onValueChange={(e) => setValue2(e.value)} mode="decimal"  min={0} max={10} maxFractionDigits={2}/></td>
          <td>/10</td>
        </tr>
        <tr>
          <th>Pertinence</th>
          <th>:</th>
          <td><InputNumber  value={value3} onValueChange={(e) => setValue3(e.value)} mode="decimal"  min={0} max={10} maxFractionDigits={2}/></td>
          <td>/10</td>
        </tr>
        <tr>
          <th>Effort de développement engagé, faisabilité et viabilité</th>
          <th>:</th>
          <td><InputNumber  value={value4} onValueChange={(e) => setValue4(e.value)} mode="decimal"  min={0} max={10} maxFractionDigits={2}/></td>
          <td>/10</td>
        </tr>
        <tr>
          <th>Intérêt environnemental, économique et social</th>
          <th>:</th>
          <td><InputNumber value={value5} onValueChange={(e) => setValue5(e.value)} mode="decimal"  min={0} max={10} maxFractionDigits={2}/></td>
          <td>/10</td>
        </tr>
        <tr>
          <th>Commentaire :</th>
          <th></th>
          <td></td>
          <td></td>
        </tr>
      </tbody>
      </table>
      <div className="flex justify-center w-11/12 mt-2">
    <InputTextarea id="Commentaire" value={value6} onChange={(e) => setValue6(e.target.value)} rows={5} cols={100} />
        </div>
      </div>
    </div>
      
  );
};
