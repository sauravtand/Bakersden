import styled from "styled-components";
import Header from "../../Components/Common/Header";
import ItemList from "./ItemList";

const Chalani = () => {
    return (
        <>
            <Header title={'Chalani'}></Header>
            {/* <div className="mainContainer"> */}
            <ClientAndUser>
                <ItemList />
            </ClientAndUser>

            {/* </div> */}

        </>
    )
}


export default Chalani;




const ClientAndUser = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
background-color: white;



`
