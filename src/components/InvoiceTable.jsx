import './InvoiceTable.css';
import InvoiceTableAddButton from './InvoiceTableAddButton';
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';
import generateId from '../utils/idGenerator.js'
import { useState } from 'react';

const InvoiceTable =({initialInvoiceList})=>{
const [invoiceList, setInvoiceList]=useState(initialInvoiceList);

const addInvoiceRow=()=>{
 const newInvoicelist=[...invoiceList]
 newInvoicelist.push({
    id: generateId(),
    description: 'description',
    rate: '',
    hours: '',
    isEditing: true
 })
 setInvoiceList(newInvoicelist)
}

const deleteInvoiceRow=(id)=>{
    const newInvoiceList=invoiceList.filter((invoice)=>invoice.id !==id)
    setInvoiceList(newInvoiceList)
}

    const rows=invoiceList.map((invoiceItem)=>{
        const {id, description, rate, hours,isEditing} = invoiceItem
    return(
        <InvoiceTableRow
        key={id}
        initialInvoiceData={{description, rate, hours}}
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




