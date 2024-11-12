
export const Info = ({ projet }) => {
  
  return (
    <div className="mt-10  flex justify-center " >
      <div className="card shadow-md w-7/12">
      <table className="table">
      <tbody>
        <tr>
          <th>Nom</th>
          <th>:</th>
          <td>{projet.intitule || "No data"}</td>
        </tr>
        <tr>
          <th>Prenom</th>
          <th>:</th>
          <td>{projet.projet_porteur || "No data"}</td>
        </tr>
        <tr>
          <th>nationalite</th>
          <th>:</th>
          <td>{projet.nationalite || "No data"}</td>
        </tr>
      </tbody>
      </table>
      </div>
    </div>
      
  );
};