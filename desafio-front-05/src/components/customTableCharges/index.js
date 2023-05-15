import "./styles.css";
import arrows from "../../assets/setabaixocima.svg";
import CardCharges from "../customTableCardCharges";

function tableCharge() {
  return (
    <div className="table-charges">
      <div className="titles-charges">
        <strong className="charge-cursor">
          <img src={arrows} alt="arrow" /> Cliente
        </strong>
        <strong className="charge-cursor">
          <img src={arrows} alt="arrow" />
          ID Cob.
        </strong>
        <strong>Valor</strong>
        <strong>Data de Venc.</strong>
        <strong>Status</strong>
        <strong>Descrição</strong>
      </div>
      <div className="charges-client"><CardCharges /></div>
    </div>
  );
}
export default tableCharge;

