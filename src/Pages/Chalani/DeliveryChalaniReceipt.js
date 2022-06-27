
import styled from "styled-components"

const DeliveryChalaniReceipt = () => {
    return (
        <>
        <Header>
           <h2> Baker's Den Pvt.Ltd</h2>
           <p>No:</p>
           <p>Naxal, Bhatbhateni, Kathmandu, Phone no: 01-4416560</p>
           <h3>DELIVERY CHALAN</h3>
           <p>Date: <input type="date"></input></p>
        </Header>

        
        </>
    )
}
export default DeliveryChalaniReceipt;


const Header = styled.div`
width: 80%,
text-align: center,
margin-left: auto,
margin-right: auto

`