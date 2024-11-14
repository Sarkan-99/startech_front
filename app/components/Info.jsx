
export const Info = ({ projet }) => {
  
  return (
    <div className="mt-10 flex justify-center " >
      <div className="w-9/12">
      <table className="w-full">
      <tbody className="info" >
      <tr>
          <th>Intitulé du projet</th>
          <th id="point">:</th>
          <td>{projet.intitule || "No data"}</td>
        </tr>
        <tr>
          <th>Nom et le prénom du porteur du projet</th>
          <th id="point">:</th>
          <td>{projet.projet_porteur || "No data"}</td>
        </tr>
        <tr>
          <th>Nationalité</th>
          <th id="point">:</th>
          <td>{projet.nationalite || "No data"}</td>
        </tr>
      </tbody>
      </table>
      </div>
    </div>
      
  );
};