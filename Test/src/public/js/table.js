
document.addEventListener('DOMContentLoaded', () => {
// 1. Searching for specific data of HTML table
const search = document.querySelector('.input-group input'),
    table_rows = document.querySelectorAll('tbody tr'),
    table_headings = document.querySelectorAll('thead th');

if (search)
search.addEventListener('input', searchTable);

function searchTable() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();

        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
    })

    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}

// 2. Sorting | Ordering data of HTML table

table_headings.forEach((head, i) => {
    let sort_asc = true;
    head.onclick = () => {
        table_headings.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        table_rows.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        })

        head.classList.toggle('asc', sort_asc);
        sort_asc = head.classList.contains('asc') ? false : true;

        sortTable(i, sort_asc);
    }
})


function sortTable(column, sort_asc) {
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}

// 3. Converting HTML table to PDF

const pdf_btn = document.querySelector('#print-daily');
const customers_table = document.querySelector('#Daily-Report');


const toPDF = function (customers_table) {
    const new_table = document.createElement("table");
  
    // Loop through rows and cells
    for (const row of customers_table.rows) {
      const new_row = new_table.insertRow();
      for (const cell of row.cells) {
        const new_cell = new_row.insertCell();
        
        // Check if cell contains text (no icons)
        if (cell.textContent.trim() !== "") {
          new_cell.textContent = cell.textContent;
        }
      }
    }
  
    const html_code = `
      <!DOCTYPE html>
    <!DOCTYPE html>
    <link rel="stylesheet" href="/css/table_report.css">

    <center>
        <img src="/images/Report-Header.png">
        <div class="header"> Báo cáo doanh số hoạt động ngày </div>
        Ngày : 
        <main class="table">${new_table.outerHTML}</main>
        <img src="/images/Report-Footer.png">
    </center>
    `;

    const new_window = window.open();
     new_window.document.write(html_code);

    setTimeout(() => {
        new_window.print();
        new_window.close();
    }, 400);
}

    
pdf_btn.onclick = () => {
    toPDF(customers_table);
}

// 6. Converting HTML table to EXCEL File

const excel_btn = document.querySelector('#download-daily');

const toExcel = function (table,title) {
    // Code For SIMPLE TABLE
    // const t_rows = table.querySelectorAll('tr');
    // return [...t_rows].map(row => {
    //     const cells = row.querySelectorAll('th, td');
    //     return [...cells].map(cell => cell.textContent.trim()).join('\t');
    // }).join('\n');

    const t_heads = table.querySelectorAll('th'),
        tbody_rows = table.querySelectorAll('tbody tr');

    const headings = [...t_heads].map(head => {
        let actual_head = head.textContent.trim().split(' ');
        return actual_head.splice(0, actual_head.length - 1).join(' ');
    }).join('\t');

    const table_data = [...tbody_rows].map(row => {
        const cells = row.querySelectorAll('td'),
            data_without_img = [...cells].map(cell => cell.textContent.trim()).join('\t');

        return data_without_img;
    }).join('\n');

    return title + '\n' + "Ngày:" + '\n' + headings + '\n' + table_data;
}

excel_btn.onclick = () => {
    const excel = toExcel(customers_table,"Báo cáo doanh số hoạt động ngày");
  downloadFile(excel, 'excel');

  // Inform the user about the download
}

const downloadFile = function (data, fileType, fileName = '') {
    const a = document.createElement('a');
    a.download = fileName;
    const mime_types = {
        'json': 'application/json',
        'csv': 'text/csv',
        'excel': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }
    a.href = `
        data:${mime_types[fileType]};charset=utf-8,${encodeURIComponent(data)}
    `;
    document.body.appendChild(a);
    a.click();
    a.remove();
}
});