import styled from "styled-components";
import { Input } from 'antd';


const FooterSignatures = () => {
    return (
        <>
        <signatureDiv>
            
     
        <Input placeholder="Issuded By" style={{
        width: 110,
      }} />
        
      
        <Input placeholder="Approved By"  style={{
        width: 110, display:'inline-block', margin:'0 auto'}} />
       
             <Input placeholder="Received By"  style={{
        width: 110, float:'right'}} />
         
        </signatureDiv>
        </>
    )
}
export default FooterSignatures;

const signatureDiv = styled.div`
width: 80%;
display: flex;

justify-content: space-between;
Input{
   border: 2px solid black;
}

`