import { Table, Button, message } from 'antd';
import { useEffect, useState, useReducer } from 'react';
import { GetProductionDetailsDate, InsertUpdateDayWiseProductionDetail } from '../../Services/appServices/ProductionService';
import { CSVLink } from 'react-csv';
import { newTableStyles } from '../../Components/Common/TableStyles';


const ProductionEntryTab = (props) => {
    const { reloadTable } = props;
    // const [isEditing, setisEditing] = useState(false);
    const [ProductList, setProductList] = useState();
    // const [editingProduct, setEditingProduct] = useState();
    useEffect(() => {
        if (reloadTable === true) { getTableData() }
    }, [reloadTable])
    useEffect(() => {
        // const date = new Date().toISOString();
        getTableData()
    }, [])

    function getTableData() {
        const date = {
            fromdate: new Date().toISOString(),
            todate: new Date().toISOString(),
        }
        GetProductionDetailsDate(date, (res) => {


            if (res?.ItemList.length > 0) {



                setProductList(res?.ItemList)
            }

        })
    }
    const dummydata = [
        {
            name: "Dark Forest",
            price: '20',
            id: 1,
        },
        {
            name: "Red velvet",
            price: '110',
            id: 2,
        },
        {
            name: "White Forest",
            price: '200',
            id: 3,
        },
        {
            name: "Butter Scotch Cake",
            price: '2500',
            id: 4,
        },
        {
            name: "Banana Cake",
            price: '2500',
            id: 5,
        }
    ]

    const columns = [
        {
            title: 'PId',
            dataIndex: 'PId',
            key: 'PId',
        },
        {
            title: 'ItemId',
            dataIndex: 'ItemId',
            key: 'ItemId',
            render: (text, record) => {
                const a = dummydata.map(res => {
                    if (res.id === text)
                        return res.name
                    else
                        return ''
                })
                return a

            }
        },
        {
            title: 'Quantity',
            dataIndex: 'Quantity',
            key: 'Quantity',
        },

        {
            title: 'Remarks',
            dataIndex: 'Remarks',
            key: 'Remarks',
        },

    ];
    //CSV
    const headers = [
        { label: 'UserId', key: 'UserId' },
        { label: 'PId', key: 'PId' },
        { label: 'ItemId', key: 'ItemId' },
        { label: 'Quantity', key: 'Quantity' },
        { label: 'EntryDate', key: 'EntryDate' },
        { label: 'Remarks', key: 'Remarks' },
    ]
    // handel print
    const printHandle = () => {
        if (ProductList !== 0) {
            let newWindow = window.open()

            let newStyle = ``

            newStyle = `<style>thead > tr> th:first-child, thead > tr> th:nth-child(2), tbody > tr > td:first-child,tbody > tr > td:nth-child(2){
        display: none;
       }tbody > tr:last-child{
    background-color: #f0f0f2;
    }
    tbody > tr:last-child > td{
        font-size: 12px;
        font-weight: 500;
    }</style>`

            let refName = `
      <div style='text-align:center;'>
          <h1>Baker's Den Pvt.ltd<h1>
          <h3>Naxal, Bhatbhateni, Kathmandu, Phone: 01-4416560<h3>
          <h5>Production Data<h5>
      </div>
    
      `;

            let tableBody = '';
            let tableHeadHtml = '<thead>';
            let columns = [];

            headers.forEach(ele => {
                tableHeadHtml += `<th>${ele?.label}</th>`;
                columns.push(ele.label);
            })
            tableHeadHtml += '</thead>';

            ProductList.forEach(ele => {
                tableBody = tableBody + '<tr>'
                columns.forEach(cell => {
                    tableBody = tableBody + '<td>' + ele[cell] + '</td>'
                })
                tableBody = tableBody + '</tr>'
            })

            let allTable = `<table>${tableHeadHtml}${tableBody}</table>`

            newWindow.document.body.innerHTML = newTableStyles + newStyle + refName + allTable

            setTimeout(function () {
                newWindow.print();
                newWindow.close();
            }, 300);
        }
        else {
            message.info('select some data')
        }


    }


    return (
        <>

            <Button type='primary' style={{ margin: '20px', float: 'right' }} onClick={printHandle}>Print</Button>
            <Button type='primary' style={{ margin: '20px 5px', float: 'right' }}><CSVLink data={ProductList !== undefined ? ProductList : ''} filename={'ProductionData.csv'}>Export to CSV</CSVLink>
            </Button>

            <div >
                <Table columns={columns} dataSource={ProductList !== undefined ? ProductList : ''} scroll={{
                    y: 340,
                }} />

            </div>
        </>
    )
}
export default ProductionEntryTab;









