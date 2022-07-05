import styled from "styled-components";
import Header from "../../Components/Common/Header";
import ChalaniClient from "./ChalaniClient";
import ItemList from "./ItemList";

const Chalani = () => {
    return (
        <>
       <>
       <Header title={'Chalani'}></Header>
      <div className="mainContainer">
       <ClientAndUser>
        <ChalaniClient/>
        <ItemList/>
       </ClientAndUser>
       
      </div>

    </>

        </>
    )
}


export default Chalani;




const ClientAndUser = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;



`


// // height: 100%; 
// width: 50%;
// position: relative;
// z-index: 1;
// top: 0;
// left: 0;
// overflow-x: hidden; 
// padding-top: 20px;
// color: red;
// 