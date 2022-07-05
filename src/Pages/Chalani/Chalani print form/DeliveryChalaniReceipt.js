
import styled from "styled-components"
import ChalaniReceiptTable from "./ChalaniReceiptTable";
import FooterSignatures from "./FooterSignatures";

const DeliveryChalaniReceipt = () => {
    return (
        <>
        <Header>
           <h1> Baker's Den Pvt.Ltd</h1>
           <p>Naxal, Bhatbhateni, Kathmandu, Phone no: 01-4416560</p>
           <span style={{float:'right', marginRight:'20px'}}>Date: <input type="date"/></span>
           <span style={{float:'left', marginLeft:'20px'}}>No: <input type="number"/></span>


           <h3>DELIVERY CHALAN</h3>
        </Header>
        <ChalaniReceiptTable/>
        <FooterSignatures/>
        


        
        </>
    )
}
export default DeliveryChalaniReceipt;


const Header = styled.div`
text-align: center;
margin-bottom: 50px;
margin-top: 50px
`