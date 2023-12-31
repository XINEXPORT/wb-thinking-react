import './InvoiceTable.css';
import InvoiceTableAddButton from './InvoiceTableAddButton';
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';
import generateId from '../../server/utils/idGenerator.js'
import axios from 'axios';
import { useState } from 'react';

const InvoiceTable =({initialInvoiceList})=>{
const [invoiceList, setInvoiceList]=useState(initialInvoiceList);

const addInvoiceRow= async()=>{
    const {data}=await axios.post('/api/invoice',{
        description: 'description',
        rate: 0,
        hours: 0
    })

    let newInvoice={...data, isEditing: true}
 setInvoiceList([...invoiceList, newInvoice])
}

const deleteInvoiceRow=async(id)=>{
    const {data}=await axios.delete(`/api/invoice/${id}`)
    setInvoiceList(data)
}

    const rows=invoiceList.map((invoiceItem)=>{
        const {id, description, rate, hours,isEditing} = invoiceItem
    return(
        <InvoiceTableRow
        key={id}
        initialInvoiceData={{id, description, rate, hours}}
        initialIsEditing={isEditing}
        onDeleteRow={()=> deleteInvoiceRow(id)}
        />
    )
}
)

    return(
        <table>
            <thead>
                <InvoiceTableHeader/>
            </thead>
            <tbody>
               {rows}
            </tbody>
            <tfoot>
                <InvoiceTableAddButton addRow={addInvoiceRow}/>
            </tfoot>
        </table>
    )
}

export default InvoiceTable




