function generatePDF() {
    // Create a jsPDF document
    var doc = new jsPDF();
  
    // Get the HTML table element
    var table = document.getElementById('Daily-Report');
  
    // Convert the table to PDF using jsPDF-AutoTable
    doc.autoTable({ html: table });
  
    // Customize PDF appearance (optional)
    // ...
  
    // Save the PDF
    doc.save('myTable.pdf');
}

