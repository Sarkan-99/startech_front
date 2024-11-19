"use client";
import React, { useState , useEffect} from "react";
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";

export const Note = ({ onValuesChange1, notes,  onValuesChange2}) => {
    const [value1, setValue1] = useState(notes.qualite_note);
    const [value2, setValue2] = useState(notes.inovation_note);
    const [value3, setValue3] = useState(notes.pertinence_note);
    const [value4, setValue4] = useState(notes.effort_note);
    const [value5, setValue5] = useState(notes.env_note);
    const [value6, setValue6] = useState(notes.comentaire);
    const [value7, setValue7] = useState(0);


    useEffect(() => {
      setValue7(value1*2+value2*2+value3+value4*2+value5);
        onValuesChange1([value1, value2, value3, value4, value5, value6]);
        onValuesChange2([value1, value2, value3, value4, value5]);
    }, [value1, value2, value3, value4, value5,value6, onValuesChange1], [value1, value2, value3, value4, value5, onValuesChange2]);


  return (
    <div className="mt-10 flex justify-center " >
      <div className="flex flex-col justify-center w-10/12">
      <table className="table">
      <tbody className="note">
        <tr>
          <th>Qualité de présentation du dossier</th>
          <th>(coef:2)</th>
          <td><InputNumber value={value1} onValueChange={(e) => setValue1(e.value)} mode="decimal"  min={0} max={10} maxFractionDigits={2}/></td>
          <td>/10</td>
        </tr>
        <tr>
          <th>Caractère innovant</th>
          <th>(coef:2)</th>
          <td><InputNumber value={value2} onValueChange={(e) => setValue2(e.value)} mode="decimal"  min={0} max={10} maxFractionDigits={2}/></td>
          <td>/10</td>
        </tr>
        <tr>
          <th>Pertinence</th>
          <th>(coef:1)</th>
          <td><InputNumber  value={value3} onValueChange={(e) => setValue3(e.value)} mode="decimal"  min={0} max={10} maxFractionDigits={2}/></td>
          <td>/10</td>
        </tr>
        <tr>
          <th>Effort de développement engagé, faisabilité et viabilité</th>
          <th>(coef:2)</th>
          <td><InputNumber  value={value4} onValueChange={(e) => setValue4(e.value)} mode="decimal"  min={0} max={10} maxFractionDigits={2}/></td>
          <td>/10</td>
        </tr>
        <tr>
          <th>Intérêt environnemental, économique et social</th>
          <th>(coef:1)</th>
          <td><InputNumber value={value5} onValueChange={(e) => setValue5(e.value)} mode="decimal"  min={0} max={10} maxFractionDigits={2}/></td>
          <td>/10</td>
        </tr>
        <tr>
          <th></th>
          <th></th>
          <td className="py-5 pl-4 text-center">{value7}</td>
          <td>/80</td>
        </tr>
        <tr className="">
          <th>Commentaire :</th>
          <th></th>
          <td></td>
          <td></td>
        </tr>
      </tbody>
      </table>
      <div className="flex justify-center w-11/12 mt-2">
    <InputTextarea id="Commentaire" value={value6} onChange={(e) => setValue6(e.target.value)} rows={5} className="w-10/12"/>
        </div>
      </div>
    </div>
      
  );
};
